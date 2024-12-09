import { get_revenue_static, Mode } from '@/api/statics';
import useFetch from '@/hooks/useFetch';
import { formatMoney } from '@/utils/formatMoney';
import { CircleDollarSign, Loader } from 'lucide-react';
import React from 'react';

const CardRevenue = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [revenue, setRevenue] = React.useState<number>(0);
  const [mode, setMode] = React.useState<Mode>(Mode.YEAR);
  const [year, setYear] = React.useState<number>(2024);
  const [month, setMonth] = React.useState<number>(new Date().getMonth());
  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const res = await get_revenue_static(mode, year, month);
        if (res.statusCode === 200) {
          setRevenue(res.data.revenue);
        }
      });
    };
    fetch();
  }, [mode, year, month]);
  return (
    <div className="p-2 border border-black rounded-md flex flex-col gap-2">
      <span className="h-13 w-13 rounded-full bg-slate-100 flex items-center justify-center">
        <CircleDollarSign className="t" />
      </span>
      <span className="py-1 text-xl font-bold">
        {stateApi.loading ? (
          <Loader className="animate-spin" />
        ) : (
          formatMoney(revenue.toString())
        )}
      </span>
      <span className="font-bold text-2xl">Tổng tiền doanh thu</span>
      <div className="flex items-center gap-5">
        <label className="flex items-center gap-1">
          Chức năng:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="p-1 border border-black rounded-md"
          >
            <option value={Mode.YEAR}>Năm</option>
            <option value={Mode.MONTH}>Tháng</option>
            <option value={Mode.WEEK}>Tuần</option>
            <option value={Mode.DAY}>Ngày</option>
            <option value={Mode.QUARTER}>Quý</option>
            <option value={Mode.TODAY}>Ngày hôm nay</option>
          </select>
        </label>
        <label className="flex items-center gap-1">
          Năm:
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            className="p-1 border border-black rounded-md"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={2024 - i}>
                {2024 - i}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1">
          Tháng:
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value, 10))}
            className="p-1 border border-black rounded-md"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
export default CardRevenue;
