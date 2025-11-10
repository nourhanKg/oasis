import {Route, Routes, BrowserRouter, Navigate } from "react-router"
import { Toaster } from "react-hot-toast"
import QueryClientProvider from "./queries/QueryClientProvider"
import Dashboard  from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./components/AppLayout"
function App() {

  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/cabins/*" element={<Cabins/>}>
            </Route>
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster 
        position="top-center" 
        gutter={12} 
        containerStyle={{ margin: "8px" }} 
        toastOptions={{ 
          success: { duration: 3000 }, 
          error: { duration: 5000 } ,
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App;