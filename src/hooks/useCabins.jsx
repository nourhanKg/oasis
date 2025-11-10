import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../services/apiCabins";

export function useCabins() {
    const queryObj = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
        staleTime: 10 * 1000, // 10 seconds
        retry: 1
    })
    const { isPending, data = [], error } = queryObj;
    return {
        isPending,
        cabins: data,
        cabinsError: error
    };
}