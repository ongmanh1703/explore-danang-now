import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Calendar,
  Users,
  CreditCard,
  User as UserIcon,
  Clock, // ⬅️ thêm
} from "lucide-react";

const currencyVN = (n?: number) =>
  typeof n === "number" ? new Intl.NumberFormat("vi-VN").format(n) + "đ" : "-";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách booking
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast({ title: "Chưa đăng nhập!", description: "Vui lòng đăng nhập để xem booking." });
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Không thể tải danh sách booking");
        }
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        toast({ title: "Lỗi", description: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate, toast]);

  // Format ngày
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Badge trạng thái
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Đã xác nhận</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Đang xử lý</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Đã hủy</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Chưa xác định</Badge>;
    }
  };

  // Điều hướng thanh toán
  const goToPayment = (bookingId: string) => {
    navigate(`/payment/${bookingId}`);
  };

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (bookings.length === 0) return <div className="text-center py-20">Bạn chưa có booking nào.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-gray-700 hover:text-indigo-600"
            variant="ghost"
          >
            <ArrowLeft className="h-5 w-5" /> Quay lại
          </Button>

          <h1 className="text-3xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-4 px-6 rounded-t-lg shadow-md">
            Đơn Đặt Tour Của Bạn
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const pricePer = booking?.tour?.price ?? 0;
              const total = pricePer * (booking?.people ?? 0);
              const canPay = booking?.status === "confirmed";

              // ⬅️ Lấy số ngày từ nhiều field khả dụng, mặc định 1
              const days =
                booking?.tour?.duration ??
                booking?.tour?.days ??
                booking?.tour?.durationDays ??
                booking?.duration ??
                1;

              return (
                <Card
                  key={booking._id}
                  className="bg-gradient-to-r from-indigo-100 to-blue-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {booking?.tour?.title || "Tour"}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <UserIcon className="h-5 w-5" />
                      <span>{booking?.name || booking?.user?.name || "Khách"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Calendar className="h-5 w-5" />
                      <span>{formatDate(booking.bookingDate)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock className="h-5 w-5" />
                      <span>{days} </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Users className="h-5 w-5" />
                      <span>{booking.people} người</span>
                    </div>

                    {/* Giá tiền */}
                    <div className="rounded-md bg-white/70 p-3 mb-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Giá / người:</span>
                        <span className="font-semibold">{currencyVN(pricePer)}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span>Tổng cộng:</span>
                        <span className="font-bold text-indigo-700">{currencyVN(total)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {booking.note || "Không có ghi chú"}
                    </p>

                    <div className="flex justify-between items-center">
                      {getStatusBadge(booking.status || "pending")}

                      <Button
                        onClick={() => goToPayment(booking._id)}
                        disabled={!canPay}
                        title={canPay ? "Tiến hành thanh toán" : "Chưa được xác nhận — không thể thanh toán"}
                        className={`transition-all duration-200 ${
                          canPay
                            ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300"
                        }`}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Thanh toán
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;
