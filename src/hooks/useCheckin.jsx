import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router";
import {toast} from "react-hot-toast";

import { updateBooking } from "../services/apiBookings"
export default function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending: isCheckingIn} = useMutation(
        {
            mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, { status: "checked-in", has_paid: true, ...breakfast }),
            onSuccess: (data) => {
                toast.success(`Booking ${data.id} successfully checked in`);
                queryClient.invalidateQueries({ queryKey: ["bookings", data.id] });
                navigate("/dashboard");
            },
            onError: (error) => {
                toast.error(error.message);
            },}
    )
  return { checkIn: mutate, isCheckingIn }
}
