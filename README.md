# Quantum Trade AI

**Quantum Trade AI** is a production-oriented institutional trading terminal built with **Next.js 15**, TypeScript, Tailwind CSS, Framer Motion, TradingView Advanced Charts, WebSockets, PostgreSQL/Prisma, NextAuth, Stripe subscriptions, Telegram/email/browser alert hooks, AI scanner logic, and prop-firm analytics.

## Feature Map

- Premium dark luxury UI: black, gold, neon blue, glassmorphism cards, responsive mobile/desktop layouts, and motion-ready interactions.
- Market dashboard for XAUUSD, EURUSD, GBPUSD, USDJPY, AUDUSD, GBPJPY, USDCHF, USDCAD, BTCUSD, and ETHUSD.
- Real-time-ready architecture: REST API snapshots plus a standalone WebSocket broadcaster.
- Market heatmap and economic calendar.
- TradingView Advanced Chart embed with symbols, timeframes, drawing tools, details, hotlist, calendar, and EMA/RSI/MACD studies.
- AI Signal Engine: EMA 20/50/200, RSI, MACD, volume score, support/resistance, trend detection, breakout detection, BUY/SELL/WAIT, entries, SL, TP1/TP2/TP3, R:R, confidence.
- AI Scanner ranking opportunities across forex, gold, and crypto.
- Streaming AI Trading Assistant UX and endpoint.
- FTMO/FundedNext-style prop firm dashboard with balance, equity, daily P/L, drawdown, win rate, profit target tracking, and trade history.
- Signal Center with feed cards, confidence, entry/SL/TP ladder, and history-oriented structure.
- Alerts through Telegram, email, and browser notification integration points.
- Auth, user accounts, premium subscriptions, admin APIs, and PostgreSQL schema.

## Project Structure

```txt
src/app                         Next.js App Router pages and route handlers
src/app/api/auth/[...nextauth]  NextAuth route handler
src/app/api/billing             Stripe checkout endpoint
src/app/api/webhooks            Stripe webhook endpoint
src/components                  Terminal UI modules
src/lib                         Market data, signals, auth, alerts, billing, DB utilities
src/lib/providers               Swappable market data provider contracts
src/lib/risk                    Risk and prop-firm compliance logic
prisma/schema.prisma            PostgreSQL schema
server/ws.ts                    WebSocket market/signal broadcaster
.env.example                    Required environment variables
```

## Merge Conflict Resolution

This branch intentionally keeps the latest dependency and auth stack after PR conflict resolution:

- `nodemailer` stays on `^7.0.12`.
- `@types/nodemailer` stays on `^7.0.3`.
- Auth remains on the Auth.js / NextAuth v5 `handlers` route pattern.
- Prisma keeps Auth.js `Account`, `Session`, and `VerificationToken` models plus Quantum Trade AI `TradingAccount` records.

## Installation

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

Run real-time broadcasting separately:

```bash
npm run ws
```

## Environment Variables

See `.env.example` for the complete list. Required production groups:

- `DATABASE_URL` for PostgreSQL.
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL` for auth.
- `MARKET_DATA_ENDPOINT` and `MARKET_DATA_API_KEY` when replacing the simulator.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and SMTP values for alerts.
- Stripe keys for premium subscriptions.

## Database

The Prisma schema includes users, subscription tiers, prop accounts, signals, trades, and alert preferences. Run migrations with:

```bash
npm run db:migrate
```

Deploy migrations with:

```bash
npm run db:deploy
```

## Production Market Data

The bundled simulator is deterministic and intended for demos/development. For production, connect a licensed market-data vendor or broker feed by implementing `MarketDataProvider` in `src/lib/providers/market-data-provider.ts` while keeping the `MarketTick` shape stable.

## Deployment Guide

1. Provision PostgreSQL (Neon, Supabase, RDS, Cloud SQL, etc.).
2. Configure all variables from `.env.example` in your hosting environment.
3. Run `npm run db:generate && npm run db:deploy`.
4. Build and deploy the Next.js app with `npm run build && npm run start` or a managed Next.js host.
5. Deploy `npm run ws` as a separate long-running Node service with WSS enabled.
6. Configure Stripe webhooks to `/api/webhooks/stripe`.
7. Configure Telegram/SMTP alert credentials.
8. Replace simulator data with a licensed provider before live trading.
9. Add broker execution only after compliance, risk, audit logging, and jurisdiction-specific legal review.

## Compliance Notice

Quantum Trade AI is software infrastructure and demo/educational tooling. It is not financial advice. Live trading requires regulated brokerage connectivity, licensed data, risk disclosures, audit trails, and compliance review.
