import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import { deleteCabin } from "../../src/services/apiCabins";
export function useDeleteCabin () {
    const queryClient = useQueryClient()
    const mutationObj = useMutation({
        mutationFn: deleteCabin,
        retry: false,
        onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['cabins']})
        toast.success('Cabin deleted successfully')
        },
        onError: (error) => {
        toast.error(error.message)
        }
    })
  const {mutate: deleteCabinById, isPending: isDeleting} = mutationObj;

  return {deleteCabinById, isDeleting}
};