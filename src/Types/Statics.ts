export interface IGetTopProductStatics {
  productName?: string;
  productDetailId?: number;
  variationDetail?: Record<string, string | number>;
  productId?: number;
  quantity?: string;
}

export interface IGetLowerProductStatics {
  productId?: number;
  productName?: string;
  productDetailId: number;
  quantity?: number;
  variationDetail?: {
    size?: string;
    color?: string;
  };
}

export interface RevenueData {
  date?: string;
  year?: number;
  month?: number;
  quarter?: number;
  totalRevenue: number;
}

export interface RevenueChartProps {
  data: RevenueData[];
  mode: 'date' | 'month' | 'quarter';
}
