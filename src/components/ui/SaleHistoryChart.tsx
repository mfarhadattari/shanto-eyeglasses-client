import moment from "moment";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SaleHistoryChart = ({ sales }: { sales: any[] }) => {
  const transformData = (sales: any[]) => {
    return sales.map((sale: any) => {
      const formattedWeek =
        (sale._id as string).split("-")[1] === "00"
          ? moment().subtract(1, "weeks").format("YYYY-MM-DD")
          : (sale._id as string).split("-")[1] === "53"
          ? moment().add(1, "weeks").format("YYYY-MM-DD")
          : moment(`${sale._id}-1`, "YYYY-W").format("YYYY-MM-DD");

      return {
        week: formattedWeek,
        totalQuantity: sale.totalQuantity,
      };
    });
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={transformData(sales)}
        margin={{
          top: 30,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="totalQuantity"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SaleHistoryChart;
