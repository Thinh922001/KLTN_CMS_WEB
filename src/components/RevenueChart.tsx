import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type RevenueData = {
  date?: string;
  year?: number;
  month?: number;
  quarter?: number;
  totalRevenue: number;
};

type RevenueChartProps = {
  data: RevenueData[];
  mode: 'date' | 'month' | 'quarter';
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data, mode }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const width = 1200;
    const height = 450;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    const monthsInVietnamese = [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ];

    d3.select(chartRef.current).select('svg').remove();

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')
      .style('margin', '0 auto');

    const xDomain =
      mode === 'quarter'
        ? data.map((d) => `Quý ${d.quarter}`)
        : mode === 'month'
        ? data.map((d) => {
            const date = new Date(d.year!, d.month! - 1);
            const monthName = monthsInVietnamese[date.getMonth()];
            return `${monthName}`;
          })
        : data.map((d) => {
            const date = new Date(d.date!);
            return `${
              date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1
            }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
          });

    const xScale = d3
      .scaleBand<string>()
      .domain(xDomain)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.totalRevenue) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Draw axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d3.format('.2s')));

    const tooltip = d3
      .select(chartRef.current)
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 0 5px rgba(0,0,0,0.2)')
      .style('visibility', 'hidden')
      .style('pointer-events', 'none')
      .style('white-space', 'pre-line')
      .style('line-height', '1.5')
      .style('text-align', 'left')
      .style('font-size', '14px')
      .style('font-family', 'Arial, sans-serif');

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(xDomain[i])!)
      .attr('y', height - margin.bottom)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', (d) => (d.totalRevenue === 0 ? 'transparent' : 'steelblue'))
      .on('mouseover', (event, d) => {
        tooltip
          .style('visibility', 'visible')
          .html(
            mode === 'quarter'
              ? `Năm: ${d.year}, Quý: ${
                  d.quarter
                }<br>Tổng doanh thu: ${d.totalRevenue.toLocaleString()}đ`
              : mode === 'month'
              ? `Năm: ${d.year}, Tháng: ${
                  d.month
                }<br>Tổng doanh thu: ${d.totalRevenue.toLocaleString()}đ`
              : `<p>Ngày: ${
                  d.date
                }<p/> <p>Doanh thu: ${d.totalRevenue.toLocaleString()}đ<p/>`,
          );
      })
      .on('mousemove', (event) => {
        const [mouseX, mouseY] = [event.pageX, event.pageY];
        tooltip
          .style('top', `${mouseY - 250}px`)
          .style('left', `${mouseX - 250}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      })
      .transition()
      .duration(1000)
      .attr('y', (d) => yScale(d.totalRevenue))
      .attr('height', (d) => height - margin.bottom - yScale(d.totalRevenue));
  }, [data, mode]);

  return (
    <div
      ref={chartRef}
      style={{ textAlign: 'center', position: 'relative' }}
    ></div>
  );
};

export default RevenueChart;
