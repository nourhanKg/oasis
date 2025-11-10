import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../services/apiSettings";

export function useSettings() {
    const queryObj = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
        staleTime: Infinity, // fresh
        retry: 1
    })
    const { isPending, data = null, error } = queryObj;
    return {
        isPending,
        settings: data,
        settingsError: error
    };
}