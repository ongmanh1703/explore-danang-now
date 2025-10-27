import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Star,
  ArrowLeft,
  MessageSquare,
  Calendar,
  Phone,
  User as UserIcon,
  Users,
} from "lucide-react";

const BookTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    people: 1,
    note: "",
    date: "",
  });
  const [formError, setFormError] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  // Kiểm tra đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({ title: "Chưa đăng nhập!", description: "Vui lòng đăng nhập để đặt tour." });
      navigate("/login");
    }
  }, [navigate]);

  // Lấy thông tin tour
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tours/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `Không tìm thấy tour với ID: ${id}`);
        }
        const data = await res.json();
        setTour(data);
        setLoading(false);
      } catch (err: any) {
        toast({ title: "Lỗi", description: err.message });
        navigate("/tours");
      }
    };
    fetchTour();
  }, [id, navigate]);

  // Lấy danh sách đánh giá
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Không thể tải đánh giá");
        }
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Lỗi khi tải đánh giá:", err);
      }
    };
    fetchReviews();
  }, [id]);

  // Chọn sao
  const handleStarClick = (rating: number) => setNewReview({ ...newReview, rating });

  // Gửi đánh giá
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment.trim()) {
      toast({ title: "Lỗi", description: "Vui lòng chọn số sao và nhập nhận xét." });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tour: id,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gửi đánh giá thất bại");
      setReviews([...reviews, { ...newReview, user: "Bạn" }]);
      setNewReview({ rating: 0, comment: "" });
      toast({ title: "Thành công!", description: "Đánh giá đã được gửi." });
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message });
    }
  };

  // Gửi form đặt tour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || form.people < 1) {
      setFormError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tour: tour._id,
          bookingDate: form.date,
          people: form.people,
          note: form.note,
          name: form.name, // Thêm name
          phone: form.phone, // Thêm phone
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Đặt tour thất bại");
      toast({ title: "Thành công!", description: "Đặt tour thành công!" });
      navigate("/my-bookings");
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message });
    }
  };

  // Format tiền
  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ";

  // Tính điểm & lượt đánh giá
  const totalReviews = reviews?.length ?? 0;
  const avgRating =
    totalReviews > 0
      ? (Math.round(((reviews.reduce((s, r) => s + (r?.rating || 0), 0) / totalReviews) + Number.EPSILON) * 10) / 10).toFixed(1)
      : (tour?.rating ? Number(tour.rating).toFixed(1) : "5.0");
  const reviewCountDisplay = totalReviews > 0 ? totalReviews : (tour?.reviewCount ?? 0);

  // Chip tags
  const chipTags: string[] =
    (Array.isArray(tour?.tags) && tour.tags.length > 0)
      ? tour.tags
      : ["Cầu Vàng", "Làng Pháp", "Khu vui chơi", "Cáp treo"];

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (!tour) return <div className="text-center py-20">Không tìm thấy tour!</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-40">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2" variant="outline">
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Cột trái: Thông tin tour + Đánh giá */}
            <div className="space-y-8">
              {/* Thông tin tour */}
              <div className="space-y-4">
                {tour.image && (
                  <img
                    src={tour.image.startsWith("http") ? tour.image : `http://localhost:5000${tour.image}`}
                    alt={tour.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}

                <h1 className="text-4xl font-extrabold tracking-tight">{tour.title}</h1>

                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{avgRating}</span>
                  <span className="text-sm text-gray-500">({reviewCountDisplay} đánh giá)</span>
                </div>

                <p className="text-gray-700 leading-7">
                  Trải nghiệm <span className="font-semibold">{tour.title}</span>
                  {tour.description ? <> {tour.description}</> : " với lịch trình hấp dẫn trong 1 ngày."}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {chipTags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block rounded-full bg-orange-500 text-white px-3 py-1 text-sm shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phần đánh giá */}
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-indigo-500" /> Đánh giá từ khách hàng
                </h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4 mb-8">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        onClick={() => handleStarClick(idx + 1)}
                        className={`h-6 w-6 cursor-pointer transition ${
                          idx < newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <textarea
                    placeholder="Nhận xét của bạn..."
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                  <Button
                    type="submit"
                    className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
                    disabled={!newReview.rating || !newReview.comment.trim()}
                  >
                    Gửi đánh giá
                  </Button>
                </form>

                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-gray-600">Chưa có đánh giá nào cho tour này.</p>
                  ) : (
                    reviews.map((r, i) => (
                      <div key={i} className="border-b pb-3">
                        <div className="flex items-center gap-2">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-4 w-4 ${
                                idx < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="font-semibold text-sm text-gray-700">{r.user}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{r.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Cột phải: Form đặt tour */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">Đặt Tour Ngay</h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Họ và tên</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          className="pl-9"
                          placeholder="Nhập họ tên"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Số điện thoại</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          className="pl-9"
                          inputMode="tel"
                          placeholder="VD: 09xx..."
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Ngày khởi hành</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <Input
                          type="date"
                          className="pl-9"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          min={new Date().toISOString().slice(0, 10)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Số người</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <select
                          className="w-full h-10 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                          value={form.people}
                          onChange={(e) => setForm({ ...form, people: +e.target.value })}
                          required
                        >
                          {Array.from({ length: 20 }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Label className="text-sm">Ghi chú</Label>
                    <Input
                      placeholder="Yêu cầu đặc biệt (nếu có)"
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                    />
                  </div>

                  <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Giá tour / người:</span>
                      <span className="font-semibold">{formatPrice(tour.price)}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-semibold">Tổng cộng</span>{" "}
                        <span className="text-gray-500">({form.people} người):</span>
                      </div>
                      <div className="text-indigo-600 font-bold">
                        {formatPrice(tour.price * form.people)}
                      </div>
                    </div>
                  </div>

                  {formError && <p className="mt-2 text-sm text-red-500">{formError}</p>}

                  <Button
                    type="submit"
                    className="w-full mt-4 py-5 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
                  >
                    <span className="mr-2">🚀</span> Xác nhận đặt tour
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookTour;