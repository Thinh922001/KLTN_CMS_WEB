import { get_revenue_static_v2 } from '@/api/statics';
import RevenueChart from '@/components/RevenueChart';
import useFetch from '@/hooks/useFetch';
import { RevenueData } from '@/Types/Statics';
import { toastMessage } from '@/utils/toastHelper';
import { Loader } from 'lucide-react';
import React from 'react';

const ECommerce = () => {
  const [stateApi, handleStateApi] = useFetch();
  const [statsData, seStatsData] = React.useState<RevenueData[]>([]);
  const [mode, setMode] = React.useState<string>('day');
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [month, setMonth] = React.useState<number>(new Date().getMonth() + 1);

  React.useEffect(() => {
    handleStateApi(async () => {
      const res = await get_revenue_static_v2(mode, year, month);
      if (res.statusCode == 200) {
        seStatsData(res.data);
        return;
      } else {
        toastMessage(res.message, 'error');
        seStatsData([]);
      }
    });
  }, [mode, year, month]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center py-4">
        Thống kê doanh thu
      </h1>
      <div className="grid grid-cols-1 gap-10">
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-1">
            Chức năng:
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="p-1 border border-black rounded-md"
            >
              <option value="day">Ngày</option>
              <option value="month">Tháng</option>
              <option value="quarter">Quý</option>
            </select>
          </label>

          {/* Tháng */}
          {mode !== 'day' ? null : (
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
          )}

          {/* Năm */}

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
        </div>
        {stateApi.loading ? (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <RevenueChart data={statsData} mode={mode as any} />
        )}
      </div>
    </>
  );
};

export default ECommerce;
