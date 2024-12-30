import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import dayjs from "dayjs";
import {
  quotesIndicatorMapping,
  IndicatorMapping,
} from "./stock-quotes-indicator";
import { StockQuotesRealTime } from "@prisma/client";
import { PrismaService } from "@/core/database/prisma.service";

@Injectable()
export class StockQuotesService {
  private readonly logger = new Logger(StockQuotesService.name);
  private readonly httpService = new HttpService();

  constructor(private readonly prismaService: PrismaService) {}

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

  private readonly normalizeValue = (type: string, value: string) => {
    if (type === "number") {
      return Number(value);
    }

    return value;
  };

  private readonly arrayToObject = (array: any[]) => {
    return array.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  };

  private readonly transformStockQuotes = (
    stockQuotes: any,
    indicatorMapping: IndicatorMapping,
  ) => {
    const keys = Object.keys(indicatorMapping);

    return stockQuotes.map((item: any) =>
      this.arrayToObject(
        keys.map(key => {
          const { type, map } = indicatorMapping[key];

          return {
            [key]: this.normalizeValue(type, item[map as string]),
          };
        }),
      ),
    );
  };

  // 清除超过7天的数据
  public clearStockQuotes = async () => {
    // 获取最近的股票数据记录，按日期降序排列并去重
    const tradingDays = await this.prismaService.stockQuotesRealTime.findMany({
      select: { date: true },
      distinct: ["date"],
      orderBy: { date: "desc" },
    });

    // 如果有超过7个交易日的数据
    if (tradingDays.length > 7) {
      // 获取第7个交易日的日期作为截止日期
      const cutoffDate = tradingDays[6].date;

      // 删除这个日期之前的所有数据
      await this.prismaService.stockQuotesRealTime.deleteMany({
        where: { date: { lt: cutoffDate } },
      });
    }
  };

  public seedStockQuotes = async (date?: string) => {
    const currentDate = dayjs(date).format("YYYY-MM-DD");

    try {
      this.logger.log(`seed stock quotes start, date: ${currentDate}`);

      const stockQuotes = await this.getRealtimeStockQuotes();

      if (stockQuotes.length === 0) {
        this.logger.log(`seed stock quotes end, date: ${currentDate}`);
        return;
      }

      this.logger.log(`transform stock quotes start, date: ${currentDate}`);

      let stocks = this.transformStockQuotes(
        stockQuotes,
        quotesIndicatorMapping,
      ) as StockQuotesRealTime[];
      // newPrice > 0, 过滤掉停牌的股票
      stocks = stocks.filter(item => Number(item.newPrice) > 0);
      // 添加日期
      stocks = stocks.map(item => ({ ...item, date: currentDate }));

      this.logger.log(`transform stock quotes end, stocks: ${stocks.length}`);

      await this.prismaService.stockQuotesRealTime.createMany({
        data: stocks,
        skipDuplicates: true,
      });

      this.logger.log(`seed stock quotes end, date: ${currentDate}`);
    } catch (error) {
      this.logger.error(`seed stock quotes error: ${error}`);
    }
  };

  public checkStockQuotes = async (date?: string) => {
    const quotes = await this.prismaService.stockQuotesRealTime.findMany({
      where: { date: dayjs(date).format("YYYY-MM-DD") },
    });
    return quotes.length > 0;
  };

  public initStockQuotes = async (date?: string) => {
    const hasQuotes = await this.checkStockQuotes(date);

    if (hasQuotes) {
      this.logger.log(`has quotes, date: ${date}, skip seeding`);
      return;
    }

    await this.seedStockQuotes(date);
  };
}
