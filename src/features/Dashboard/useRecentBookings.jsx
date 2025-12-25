import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns";
import {getBookingsAfterDate } from "../../services/apiBookings"

export default function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date") || "last-7-days";
    const numOfDays = +date.split("-")[1];
    const queryDate = subDays(new Date(), numOfDays).toISOString();
    const {data: bookings, isLoading} = useQuery({
        queryKey: ['bookings', `last-${numOfDays}`],
        queryFn: () => getBookingsAfterDate(queryDate),
        staleTime: 0
    })
    return {bookings, isLoading, numOfDays};
}    
