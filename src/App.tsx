import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Cuisine from "./pages/Cuisine";
import News from "./pages/News";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import DestinationDetail from "./pages/DestinationDetail"; // New import
import BookTour from "./pages/BookTour"; // New import
import DishDetail from "./pages/DishDetail"; // New import
import NewsDetail from "./pages/NewsDetail"; // New import
import { AdminLayout } from "../layouts/AdminLayout";
import { StaffLayout } from "../layouts/StaffLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminDestinations from "./pages/admin/Destinations";
import AdminTours from "./pages/admin/Tours";
import AdminCuisine from "./pages/admin/Cuisine";
import AdminNews from "./pages/admin/News";
import AdminBookings from "./pages/admin/Bookings";
import AdminReviews from "./pages/admin/Reviews";
import StaffDashboard from "./pages/staff/Dashboard";
import StaffTours from "./pages/staff/Tours";
import StaffNews from "./pages/staff/News";
import ScrollToTop from "./components/ScrollToTop";
import MyBookings from "./pages/MyBookings";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
           <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/destinations" element={<Explore />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/cuisine" element={<Cuisine />} />
            <Route path="/cuisine/:id" element={<DishDetail />} />
            {/* Chi tiết địa điểm */}
            <Route path="/destinations/:id" element={<DestinationDetail />} />
          {/* Auth routes */}
            {/* Đặt tour */}
            <Route path="/book-tour/:id" element={<BookTour />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/payment/:bookingId" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
         {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          <Route path="/admin/destinations" element={<AdminLayout><AdminDestinations /></AdminLayout>} />
          <Route path="/admin/tours" element={<AdminLayout><AdminTours /></AdminLayout>} />
          <Route path="/admin/cuisine" element={<AdminLayout><AdminCuisine /></AdminLayout>} />
          <Route path="/admin/news" element={<AdminLayout><AdminNews /></AdminLayout>} />
          <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
          <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
         {/* Staff Routes */}
          <Route path="/staff" element={<StaffLayout><StaffDashboard /></StaffLayout>} />
          <Route path="/staff/tours" element={<StaffLayout><StaffTours /></StaffLayout>} />
          <Route path="/staff/news" element={<StaffLayout><StaffNews /></StaffLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> 
          
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;