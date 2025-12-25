import styled from "styled-components";

import { useCabins } from "../../hooks/useCabins";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";

import Spinner from "../../components/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../Booking/Management/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


export default function DashboardLayout() {
  const {bookings, isLoading, numOfDays} = useRecentBookings();
  const {stays, isLoading : isLoadingStays} = useRecentStays()
  const {cabins, isPending} = useCabins();
  // console.log("stays ", stays)
  if(isLoading || isLoadingStays || isPending) return <Spinner/>
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={stays} cabinsCount={cabins.length} numOfDays={numOfDays}></Stats>
      <TodayActivity />
      <DurationChart confirmedStays={stays}/>
      <SalesChart bookings={bookings} numOfDays={numOfDays}/>
    </StyledDashboardLayout>
  )
}
