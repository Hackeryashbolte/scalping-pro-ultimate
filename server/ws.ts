import { WebSocketServer } from 'ws';
import { getMarketSnapshot } from '../src/lib/market';
import { scanMarkets } from '../src/lib/signals';

const port = Number(process.env.WS_PORT ?? 3001);
const wss = new WebSocketServer({ port });

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'welcome', message: 'Quantum Trade AI real-time bus connected' }));
});

setInterval(() => {
  const payload = JSON.stringify({
    type: 'market:update',
    ticks: getMarketSnapshot(),
    signals: scanMarkets().slice(0, 3),
    timestamp: new Date().toISOString(),
  });
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) client.send(payload);
  }
}, 1500);

console.log(`Quantum Trade AI WebSocket server running on ws://localhost:${port}`);
