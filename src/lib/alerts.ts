import nodemailer from 'nodemailer';
import { Telegraf } from 'telegraf';
import type { AISignal } from './signals';

export async function sendTelegramSignal(signal: AISignal) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return { skipped: true };
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, formatSignal(signal), { parse_mode: 'Markdown' });
  return { skipped: false, ok: true };
}

export async function sendEmailSignal(signal: AISignal, to: string) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return { skipped: true };
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const info = await transporter.sendMail({
    from: process.env.ALERT_FROM_EMAIL ?? 'alerts@quantumtrade.ai',
    to,
    subject: `Quantum Trade AI ${signal.side} ${signal.symbol}`,
    text: formatSignal(signal).replaceAll('*', ''),
  });
  return { skipped: false, messageId: info.messageId };
}

function formatSignal(signal: AISignal) {
  return `*${signal.symbol} ${signal.side}*\nEntry: ${signal.entry}\nSL: ${signal.stopLoss}\nTP1: ${signal.takeProfit1}\nTP2: ${signal.takeProfit2}\nTP3: ${signal.takeProfit3}\nRR: ${signal.riskReward}\nConfidence: ${signal.confidence}%`;
}
