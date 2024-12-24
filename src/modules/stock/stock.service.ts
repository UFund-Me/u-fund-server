import { Injectable } from "@nestjs/common";
import { StockQuotesService } from "./core/stock-quotes";

@Injectable()
export class StockService {
  constructor(private readonly stockQuotesService: StockQuotesService) {}
}
