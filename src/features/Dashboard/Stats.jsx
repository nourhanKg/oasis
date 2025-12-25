import { HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar, HiOutlineHomeModern } from "react-icons/hi2";
import Stat from "./Stat";


import { formatCurrency } from "../../utils/helpers";

export default function Stats({
    bookings,
    confirmedStays,
    numOfDays,
    cabinsCount
}) {
    const numBookings = bookings.length;
    const numConfirmedStays = confirmedStays.length;
    const sales = bookings.reduce((acc, stay) => acc + stay.total_price + stay.extras_price, 0)

    // Occupancy calculation
    //1. occupancy nights
    const totalNights = confirmedStays.reduce((acc, stay) => acc + stay.num_of_nights, 0)
    console.log(totalNights)
    //2. total available nights 
    const availableNights = numOfDays * cabinsCount;
    console.log(availableNights)
    //3. rate
    const occupancy = (totalNights / availableNights) * 100;
  return (
    <>
        <Stat 
            title="Boookings"
            color="blue"
            icon={<HiOutlineHomeModern/>}
            value={numBookings}
         />
        <Stat 
            title="Sales"
            color="green"
            icon={<HiOutlineBanknotes/>}
            value={formatCurrency(sales)}
         />
        <Stat 
            title="Check-ins"
            color="indigo"
            icon={<HiOutlineCalendarDays/>}
            value={numConfirmedStays}
         />
        <Stat 
            title="Occupancy"
            color="yellow"
            icon={<HiOutlineChartBar/>}
            value={`${occupancy.toFixed(2)}%`}
         />
    </>
  )
}
