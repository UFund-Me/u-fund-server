import { Injectable } from "@nestjs/common";
import { StockQuotesService } from "./core/stock-quotes";

@Injectable()
export class StockService {
  private readonly isDev = process.env.NODE_ENV === "development";

  constructor(private readonly stockQuotesService: StockQuotesService) {
    this.init();
  }

  init() {
    if (!this.isDev) return;

    this.stockQuotesService.initStockQuotes();
  }

  clear() {
    this.stockQuotesService.clearStockQuotes();
  }
}
