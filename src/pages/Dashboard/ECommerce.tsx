import CardLowerSelling from './CardLowerSelling.tsx';
import CardRevenue from './CardRevenue.tsx';
import CardTopSelling from './CardTopSelling.tsx';

const ECommerce = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-4">Thống kê</h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-2">
          <CardRevenue />
        </div>

        <div className="col-span-2">
          <CardTopSelling />
        </div>
        <div className="col-span-2">
          <CardLowerSelling />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
