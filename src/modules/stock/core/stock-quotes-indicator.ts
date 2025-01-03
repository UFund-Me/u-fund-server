export type IndicatorType = "date" | "string" | "number" | "boolean" | "array";

export type IndicatorMapping = Record<
  string,
  { type: IndicatorType; cn: string; map?: string }
>;

// 交易指标
export const quotesIndicatorMapping: IndicatorMapping = {
  // 基本信息
  code: {
    type: "string",
    cn: "代码",
    map: "f12",
  },
  name: {
    type: "string",
    cn: "名称",
    map: "f14",
  },

  // 价格相关
  newPrice: {
    type: "number",
    cn: "最新价",
    map: "f2",
  },
  changeRate: {
    type: "number",
    cn: "涨跌幅",
    map: "f3",
  },
  upsDowns: {
    type: "number",
    cn: "涨跌额",
    map: "f4",
  },

  // 交易指标
  volume: {
    type: "number",
    cn: "成交量",
    map: "f5",
  },
  dealAmount: {
    type: "number",
    cn: "成交额",
    map: "f6",
  },
  amplitude: {
    type: "number",
    cn: "振幅",
    map: "f7",
  },
  turnoverRate: {
    type: "number",
    cn: "换手率",
    map: "f8",
  },
  volumeRatio: {
    type: "number",
    cn: "量比",
    map: "f10",
  },
  openPrice: {
    type: "number",
    cn: "今开",
    map: "f17",
  },
  highPrice: {
    type: "number",
    cn: "最高",
    map: "f15",
  },
  lowPrice: {
    type: "number",
    cn: "最低",
    map: "f16",
  },
  preClosePrice: {
    type: "number",
    cn: "昨收",
    map: "f18",
  },

  // 涨跌速度指标
  speedIncrease: {
    type: "number",
    cn: "涨速",
    map: "f22",
  },
  speedIncrease5: {
    type: "number",
    cn: "5分钟涨跌",
    map: "f11",
  },
  speedIncrease60: {
    type: "number",
    cn: "60日涨跌幅",
    map: "f24",
  },
  speedIncreaseAll: {
    type: "number",
    cn: "年初至今涨跌幅",
    map: "f25",
  },

  // 估值指标
  dtsyl: {
    type: "number",
    cn: "市盈率动",
    map: "f9",
  },
  pe9: {
    type: "number",
    cn: "市盈率TTM",
    map: "f115",
  },
  pe: {
    type: "number",
    cn: "市盈率静",
    map: "f114",
  },
  pbnewmrq: {
    type: "number",
    cn: "市净率",
    map: "f23",
  },
  basicEps: {
    type: "number",
    cn: "每股收益",
    map: "f112",
  },
  bvps: {
    type: "number",
    cn: "每股净资产",
    map: "f113",
  },
  perCapitalReserve: {
    type: "number",
    cn: "每股公积金",
    map: "f61",
  },
  perUnassignProfit: {
    type: "number",
    cn: "每股未分配利润",
    map: "f48",
  },

  // 财务指标
  roeWeight: {
    type: "number",
    cn: "加权净资产收益率",
    map: "f37",
  },
  saleGpr: {
    type: "number",
    cn: "毛利率",
    map: "f49",
  },
  debtAssetRatio: {
    type: "number",
    cn: "资产负债率",
    map: "f57",
  },
  totalOperateIncome: {
    type: "number",
    cn: "营业收入",
    map: "f40",
  },
  toiYoyRatio: {
    type: "number",
    cn: "营业收入同比增长",
    map: "f41",
  },
  parentNetprofit: {
    type: "number",
    cn: "归属净利润",
    map: "f45",
  },
  netprofitYoyRatio: {
    type: "number",
    cn: "归属净利润同比增长",
    map: "f46",
  },

  // 股本及市值
  totalShares: {
    type: "number",
    cn: "总股本",
    map: "f38",
  },
  freeShares: {
    type: "number",
    cn: "已流通股份",
    map: "f39",
  },
  totalMarketCap: {
    type: "number",
    cn: "总市值",
    map: "f20",
  },
  freeCap: {
    type: "number",
    cn: "流通市值",
    map: "f21",
  },

  // 其他
  industry: {
    type: "string",
    cn: "所处行业",
    map: "f100",
  },
  listingDate: {
    type: "date",
    cn: "上市时间",
    map: "f26",
  },
  reportDate: {
    type: "date",
    cn: "报告期",
    map: "f221",
  },
};
