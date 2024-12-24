import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { firstValueFrom } from "rxjs";

@Injectable()
export class StockQuotesService {
  private readonly logger = new Logger(StockQuotesService.name);
  private readonly httpService = new HttpService();

  /**
   * 沪深京 A 股-实时行情
   *
   * 东方财富网-沪深京 A 股-实时行情
   * https://quote.eastmoney.com/center/gridlist.html#hs_a_board
   */
  private readonly getRealtimeStockQuotes = async () => {
    try {
      const url = `http://82.push2.eastmoney.com/api/qt/clist/get`;

      const stockQuotesResponse = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            pn: "1",
            pz: "50000",
            po: "1",
            np: "1",
            ut: "bd1d9ddb04089700cf9c27f6f7426281",
            fltt: "2",
            invt: "2",
            fid: "f3",
            fs: "m:0 t:6,m:0 t:80,m:1 t:2,m:1 t:23,m:0 t:81 s:2048",
            fields:
              "f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f14,f15,f16,f17,f18,f20,f21,f22,f23,f24,f25,f26,f37,f38,f39,f40,f41,f45,f46,f48,f49,f57,f61,f100,f112,f113,f114,f115,f221",
          },
        }),
      );

      const response = stockQuotesResponse.data;

      if (response && response.diff) {
        return response.diff;
      }

      throw new Error(
        `get realtime stock quotes error, response: ${response.message || "unknown error"}`,
      );
    } catch (error) {
      this.logger.error(`get realtime stock quotes error: ${error}`);
      return [];
    }
  };

  private readonly getStockQuotes = async () => {};
}
