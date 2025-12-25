import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns";
import {getStaysAfterDate } from "../../services/apiBookings"

export default function useRecentStays() {
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date") || "last-7-days";
    const numOfDays = +date.split("-")[1];
    const queryDate = subDays(new Date(), numOfDays).toISOString();
    const {data: stays, isLoading} = useQuery({
        queryKey: ['stays', `last-${numOfDays}`],
        queryFn: () => getStaysAfterDate(queryDate),
        staleTime: 0
    })
    const checkedIn = stays?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out");
    return {stays: checkedIn, isLoading, numOfDays};
}    
