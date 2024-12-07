import { get_all_top_selling_static, Mode } from '@/api/statics';
import useFetch from '@/hooks/useFetch';
import { IGetTopProductStatics } from '@/Types/Statics';
import { getValues } from '@/utils/object';
import { toastMessage } from '@/utils/toastHelper';
import { Loader } from 'lucide-react';
import React from 'react';

const CardTopSelling = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [mode, setMode] = React.useState<Mode>(Mode.YEAR);
  const [year, setYear] = React.useState<number>(2024);
  const [month, setMonth] = React.useState<number>(1);
  const [day, setDay] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(10);
  const [list, setList] = React.useState<IGetTopProductStatics[]>([]);

  const fetchTopSelling = () => {
    handleStateApi(async () => {
      const res = await get_all_top_selling_static(
        mode,
        year,
        month,
        day,
        limit,
      );
      if (res.statusCode === 200) {
        setList(res.data);
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  const getDaysInMonth = (month: number, year: number): number[] => {
    return new Array(new Date(year, month, 0).getDate())
      .fill(0)
      .map((_, i) => i + 1);
  };

  React.useEffect(() => {
    fetchTopSelling();
  }, [mode, year, month, day, limit]);

  return (
    <div className="p-2 border border-black rounded-md flex flex-col gap-2">
      <h2 className="text-center font-bold text-2xl">
        Top sản phẩm bán chạy nhất
      </h2>
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
            <option value={-1}> -- Không chọn -- </option>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1">
          Ngày:
          <select
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value, 10))}
            className="p-1 border border-black rounded-md"
          >
            <option value={-1}> -- Không chọn -- </option>

            {getDaysInMonth(month, year).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1">
          Số lượng
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
            className="p-1 border border-black rounded-md"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <option key={i} value={(i + 1) * 5}>
                {(i + 1) * 5}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-col justify-center gap-3 px-20 py-6">
        {stateApi.loading ? (
          <Loader className="animate-spin" />
        ) : (
          list.map((item, index) => (
            <div key={index} className="flex items-center gap-5">
              <b className="text-xl">#{index + 1}</b>
              <span className="font-semibold">
                {item.productName} - {getValues(item.variationDetail)}
              </span>
              <span>
                Số lượng bán ra: <b>{item.quantity}</b>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardTopSelling;
