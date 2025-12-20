import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

import {logout as logoutApi} from "../../services/apiAuth"

export default function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: logout, isPending: isLoginingOut, error} = useMutation({
        mutationFn: logoutApi,
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user?.user);
            navigate("/login", {replace: true})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
  return{logout, isLoginingOut, error}
}
