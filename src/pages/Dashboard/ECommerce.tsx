import { Mode } from '@/api/statics.ts';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import TableOne from '../../components/TableOne.tsx';
import CardRevenue from './CardRevenue.tsx';
import CardTopSelling from './CardTopSelling.tsx';
import CardLowerSelling from './CardLowerSelling.tsx';

const ECommerce = () => {
  return (
    <>
    <h1 className='text-3xl font-bold text-center py-4'>Thống kê</h1>
      <div className="grid grid-cols-2 gap-10">
        <CardRevenue />
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
