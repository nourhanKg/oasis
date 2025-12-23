import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

import {signup as signupApi} from "../../services/apiAuth"

export default function useSignUp() {
    const {mutate: signup, isPending: isSigningUp, error} = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success('User created successfully, please verify your email');
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
  return{signup, isSigningUp, error}
}
