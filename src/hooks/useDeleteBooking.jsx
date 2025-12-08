import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import { deleteBooking } from "../services/apiBookings";
export function useDeleteBooking () {
    const queryClient = useQueryClient()
    const mutationObj = useMutation({
        mutationFn: deleteBooking,
        retry: false,
        onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["bookings"]})
        toast.success('Booking deleted successfully')
        },
        onError: (error) => {
        toast.error(error.message)
        }
    })
  const {mutate: deleteBookingById, isPending: isDeleting} = mutationObj;

  return {deleteBookingById, isDeleting}
};