import { get_all_lower_selling_static } from '@/api/statics';
import useFetch from '@/hooks/useFetch';
import { IGetLowerProductStatics } from '@/Types/Statics';
import { toastMessage } from '@/utils/toastHelper';
import { Loader } from 'lucide-react';
import React from 'react';
const CardLowerSelling = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [take, setTake] = React.useState<number>(5);
  const [skip, setSkip] = React.useState<number>(0);
  const [list, setList] = React.useState<IGetLowerProductStatics[]>([]);

  const fetchTopSelling = () => {
    handleStateApi(async () => {
      const res = await get_all_lower_selling_static(take, skip);
      if (res.statusCode === 200) {
        setList(res.data);
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  React.useEffect(() => {
    fetchTopSelling();
  }, [take]);

  return (
    <div className="p-2 border border-black rounded-md flex flex-col gap-2">
      <h2 className="text-center font-bold text-2xl">
        Top sản phẩm không bán chạy nhất
      </h2>
      <div className="flex items-center gap-5">
        <label className="flex items-center gap-1">
          Số lượng:
          <select
            value={take}
            onChange={(e) => setTake(Number(e.target.value))}
            className="p-1 border border-black rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
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
                {item.productName} - {item.variationDetail?.size || ' ? '} -{' '}
                {item.variationDetail?.color}
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
export default CardLowerSelling;
