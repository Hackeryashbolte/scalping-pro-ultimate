import { getMarketSnapshot, type MarketTick } from '@/lib/market';

export interface MarketDataProvider {
  getSnapshot(): Promise<MarketTick[]>;
}

export class SimulatedMarketDataProvider implements MarketDataProvider {
  async getSnapshot() {
    return getMarketSnapshot();
  }
}

export class HttpMarketDataProvider implements MarketDataProvider {
  constructor(private readonly endpoint: string, private readonly apiKey: string) {}

  async getSnapshot() {
    const response = await fetch(this.endpoint, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
      next: { revalidate: 1 },
    });
    if (!response.ok) throw new Error(`Market data provider failed with ${response.status}`);
    return (await response.json()) as MarketTick[];
  }
}

export function createMarketDataProvider(): MarketDataProvider {
  if (process.env.MARKET_DATA_ENDPOINT && process.env.MARKET_DATA_API_KEY) {
    return new HttpMarketDataProvider(process.env.MARKET_DATA_ENDPOINT, process.env.MARKET_DATA_API_KEY);
  }
  return new SimulatedMarketDataProvider();
}
