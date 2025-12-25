import styled from "styled-components";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

import {useDarkMode} from "../../context/DarkModeContext";

import DashboardBox from "./DashboardBox";
import Headings from "../../components/Headings";
import { AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({bookings, numOfDays}) {
  const {darkMode} = useDarkMode();
  const colors = darkMode
  ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };
  //prepare chart data
  // 1. create dates
  const daysInterval = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date()
  })
  // 2. calculate total sales and extras sales
  const data = daysInterval?.map(day => ({
    label: format(day, "MMM dd"),
    totalSales: bookings?.filter(booking => isSameDay(new Date(booking.created_at), day)).reduce((sum, booking) => sum + booking.total_price, 0),
    extrasSales: bookings?.filter(booking => isSameDay(new Date(booking.created_at), day)).reduce((sum, booking) => sum + booking.extras_price, 0)
  }))
  return (
    <StyledSalesChart>
      <Headings as="h2">Sales from {format(daysInterval[0], "MMM dd yyyy")} to {format(daysInterval[daysInterval.length - 1], "MMM dd yyyy")}</Headings>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />
          <Tooltip contentStyle={{backgroundColor: colors.background}}/>
          <XAxis dataKey="label" tick={{fill: colors.text}} tickLine={{stroke: colors.text}}/>
          <YAxis unit="$" tick={{fill: colors.text}} tickLine={{stroke: colors.text}}/>
          <Area dataKey="totalSales" stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} type="monotone" strokeWidth={2} name="Total sales" unit="$" />
          <Area dataKey="extrasSales" stroke={colors.extrasSales.stroke} fill={colors.extrasSales.fill} type="monotone" strokeWidth={2} name="Extras sales" unit="$"/>
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}
