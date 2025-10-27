import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ArrowLeft, Camera, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const API_URL = "/api/posts";
const BACKEND_URL = "http://localhost:5000"; // ĐỔI NẾU CẦN

const getYouTubeEmbed = (url: string) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.pathname === "/watch") {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {}
  return null;
};

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState({ ratings: [], average: 0, count: 0 });
  const [userRating, setUserRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    fetchDestination();
    fetchComments();
    fetchRatings();
    checkUserRating();
  }, [id]);

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`);
      if (res.ok) {
        const data = await res.json();
        setDestination(data);
      } else {
        toast({ title: "Lỗi", description: "Không tìm thấy điểm đến", variant: "destructive" });
        navigate("/explore");
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${id}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      } else {
        toast({ title: "Lỗi", description: "Không thể tải bình luận", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", description: "Không thể kết nối đến server", variant: "destructive" });
    }
  };

  const fetchRatings = async () => {
    try {
      const res = await fetch(`/api/ratings?postId=${id}`);
      if (res.ok) {
        setRatings(await res.json());
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", description: "Không thể tải đánh giá", variant: "destructive" });
    }
  };

  const checkUserRating = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`/api/ratings?postId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
      const userRate = data.ratings.find((r: any) => r.user._id === userId);
      if (userRate) setUserRating(userRate.rating);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment || newReview.rating === 0) {
      toast({ title: "Thiếu thông tin", description: "Vui lòng chọn sao và nhập bình luận", variant: "destructive" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để gửi đánh giá", variant: "destructive" });
      navigate("/login"); // Redirect to login page
      return;
    }

    try {
      // Submit rating
      const ratingRes = await fetch(`/api/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: id, rating: newReview.rating }),
      });

      if (!ratingRes.ok) {
        const errorData = await ratingRes.json();
        toast({ title: "Lỗi", description: errorData.message || "Không thể gửi đánh giá", variant: "destructive" });
        return;
      }

      // Submit comment
      const commentRes = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: id, content: newReview.comment }),
      });

      if (commentRes.ok) {
        const savedComment = await commentRes.json();
        setComments([savedComment, ...comments]); // Update UI with the new comment
        setNewReview({ rating: 0, comment: "" }); // Reset form
        toast({ title: "Cảm ơn bạn!", description: "Đánh giá và bình luận đã được gửi." });
        fetchRatings(); // Refresh ratings
        fetchComments(); // Refresh comments
      } else {
        const errorData = await commentRes.json();
        toast({ title: "Lỗi", description: errorData.message || "Không thể gửi bình luận", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", description: "Không thể kết nối đến server", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!destination) return null;

  const images = destination.images?.map((img: string) => img.startsWith("http") ? img : `${BACKEND_URL}${img}`) || [];
  const videoEmbed = destination.videoUrl ? getYouTubeEmbed(destination.videoUrl) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[75vh] w-full">
        {images[0] ? (
          <img src={images[0]} alt={destination.title} className="w-full h-full object-cover" />
        ) : (
          <div className="bg-gradient-to-br from-blue-600 to-teal-700 w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {destination.title}
          </h1>
          <div className="flex items-center gap-6 text-white mt-3 text-sm md:text-base">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{ratings.average || "Chưa có đánh giá"}</span>
            </div>
            <div className="flex items-center gap-1 opacity-90">
              <MapPin className="h-5 w-5" />
              <span>{destination.place || "Đà Nẵng"}</span>
            </div>
            <div className="flex items-center gap-1 opacity-90">
              <Clock className="h-5 w-5" />
              <span>{destination.duration || "Liên hệ"}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-6xl py-16 space-y-16">
        {/* Gallery */}
        {images.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Hình ảnh nổi bật</h2>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
                {[...images, ...images].map((img: string, idx: number) => (
                  <div key={idx} className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={img}
                      alt={`gallery-${idx}`}
                      className="h-56 md:h-64 w-[320px] md:w-[380px] object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <Camera className="h-7 w-7 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
                will-change: transform;
              }
            `}</style>
          </section>
        )}

        {/* Giới thiệu */}
        <section className="bg-muted/30 rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-4">Giới thiệu</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify whitespace-pre-line">
            {destination.content}
          </p>
        </section>

        {/* Video */}
        {videoEmbed && (
          <section className="rounded-2xl overflow-hidden shadow-md">
            <h2 className="text-3xl font-bold mb-4">Video giới thiệu</h2>
            <div className="w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={`${videoEmbed}?rel=0&modestbranding=1`}
                title="Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Tabs: Tổng quan, Lịch sử, Lưu ý */}
        <section>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 gap-2 bg-muted rounded-xl p-2">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="history">Lịch sử</TabsTrigger>
              <TabsTrigger value="tips">Lưu ý</TabsTrigger>
            </TabsList>
            <div className="mt-6 bg-muted/30 p-6 rounded-2xl shadow">
              <TabsContent value="overview">
                <p className="text-gray-700 text-lg text-justify">{destination.details?.overview || destination.content}</p>
              </TabsContent>
              <TabsContent value="history">
                <p className="text-gray-700 text-lg text-justify">{destination.details?.history || "Đang cập nhật..."}</p>
              </TabsContent>
              <TabsContent value="tips">
                <p className="text-gray-700 text-lg text-justify">{destination.details?.tips || "Hãy mang theo nước và giày thoải mái."}</p>
              </TabsContent>
            </div>
          </Tabs>
        </section>

        {/* Điểm nổi bật */}
        {destination.highlights && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Điểm nổi bật</h2>
            <div className="flex flex-wrap gap-3">
              {destination.highlights.map((h: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-sm px-4 py-2 rounded-full shadow-sm">
                  {h}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* ĐÁNH GIÁ & BÌNH LUẬN */}
        <section className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="h-7 w-7 text-indigo-500" />
            Đánh giá & Bình luận
          </h2>

          {/* Form gửi đánh giá */}
          <form onSubmit={handleReviewSubmit} className="space-y-5 mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  onClick={() => handleStarClick(idx + 1)}
                  className={`h-7 w-7 cursor-pointer transition ${
                    idx < newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <textarea
              placeholder="Chia sẻ trải nghiệm của bạn tại đây..."
              className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-base"
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium"
            >
              Gửi đánh giá
            </Button>
          </form>

          {/* Danh sách bình luận */}
          <div className="space-y-5">
            {comments.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            ) : (
              comments.map((comment: any, i: number) => (
                <div key={i} className="border-b pb-5 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-800">{comment.user?.name || "Khách vãng lai"}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col md:flex-row gap-4">
          <Button
            variant="secondary"
            className="flex-1 flex items-center justify-center gap-2 text-lg py-4 rounded-xl shadow"
            onClick={() => {
              const query = `${destination.title}, ${destination.place || ""}, Đà Nẵng`;
              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank");
            }}
          >
            <MapPin className="h-5 w-5" /> Xem vị trí
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 text-lg py-4 rounded-xl shadow"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" /> Quay lại
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationDetail;