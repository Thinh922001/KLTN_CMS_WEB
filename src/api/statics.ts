import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';
export enum Mode {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
  DAY = 'DAY',
}

export const get_all_top_selling_static = async (
  mode: Mode,
  year: number,
  month: number,
  day: number,
  limit: number,
) => {
  return await apiRequestRefeshToken(
    `/stats/top_selling?mode=${mode}&year=${year}&month=${month}&day=${day}&limit=${limit}`,
    Method.GET,
  );
};

export const get_all_lower_selling_static = async (
  take: number = 5,
  skip: number = 0,
) => {
  return await apiRequestRefeshToken(
    `/stats/low_selling?take=${take}&skip=${skip}`,
    Method.GET,
  );
};

export const get_revenue_static = async (
  mode: Mode,
  year: number,
  month: number,
) => {
  return await apiRequestRefeshToken(
    `/stats/revenue?mode=${mode}&year=${year}&month=${month}`,
    Method.GET,
  );
};
