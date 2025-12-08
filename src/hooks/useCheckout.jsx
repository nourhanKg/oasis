import { useMutation, useQueryClient } from "@tanstack/react-query"
import {toast} from "react-hot-toast";

import { updateBooking } from "../services/apiBookings"
export default function useCheckout() {
    const queryClient = useQueryClient();
    const { mutate, isPending: isCheckingOut} = useMutation(
        {
            mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out" }),
            onSuccess: (data) => {
                toast.success(`Booking ${data.id} successfully checked out`);
                queryClient.invalidateQueries({ active: true });
            },
            onError: (error) => {
                toast.error(error.message);
            },}
    )
  return { checkOut: mutate, isCheckingOut }
}
