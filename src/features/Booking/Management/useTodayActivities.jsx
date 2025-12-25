import { useQuery } from "@tanstack/react-query"

import {getStaysTodayActivity } from "../../../services/apiBookings"

export default function useTodayActivities() {
    const {data: todayActivities, isLoading} = useQuery({
        queryKey: ['today-activities'],
        queryFn: getStaysTodayActivity,
        staleTime: 1000 * 60 * 5 // 5 minutes
    })
    return {todayActivities, isLoading}
}    
