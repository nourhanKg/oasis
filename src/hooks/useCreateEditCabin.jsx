import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createEditCabin } from "../services/apiCabins";
export function useCreateEditCabin(isEditMode) {
    const queryClient = useQueryClient();
    const mutationObj = useMutation({
        mutationFn: ({formData, id}) => createEditCabin(formData, id),
        onSuccess: () => {
        toast.success(`Cabin successfully ${isEditMode ? 'edited' : 'created'}`);
        queryClient.invalidateQueries({queryKey: ['cabins']})
        },
        onError: (error) => {
        toast.error(error.message);
        }
    })
  const {isPending: isUpdating, mutate: updateCabin} = mutationObj;

  return {updateCabin, isUpdating}
}