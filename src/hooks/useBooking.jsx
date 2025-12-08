import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getBooking } from "../services/apiBookings"

export default function useBooking() {
    const { bookingId } = useParams();
    const { data, isPending, error } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        staleTime: 0,
        retry: false
    })
  return {
    isPending,
    booking: data,
    error
  }
}
