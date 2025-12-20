import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

import {login as loginApi} from "../../services/apiAuth"

export default function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: login, isPending: isLoginingIn, error} = useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/", {replace: true})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
  return{login, isLoginingIn, error}
}
