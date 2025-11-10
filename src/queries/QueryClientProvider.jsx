import {QueryClient, QueryCache, MutationCache, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const QyeryClientProvider = ({children}) => {
    const queryCache = new QueryCache()
    const mutationCache = new MutationCache()
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
            // mutations: {
            //     cacheTime: 0,
            //     staleTime: 0,
            // }
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
   
}
export default QyeryClientProvider;