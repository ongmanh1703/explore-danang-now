// src/pages/DishDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, MapPin, UtensilsCrossed, MessageSquare, PlayCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const API_URL = "/api/posts";
const BACKEND_URL = "http://localhost:5000"; // ĐỔI NẾU CẦN

const parseEmbed = (url: string) => {
  if (!url) return null;
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
    return { kind: "video", src: url };
  }
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}?rel=0` };
  return null;
};

const MediaPlayer = ({ url, poster }: { url: string; poster?: string }) => {
  const info = parseEmbed(url);
  if (!info) return null;

  if (info.kind === "video") {
    return (
      <video controls playsInline preload="metadata" className="w-full rounded-lg" poster={poster}>
        <source src={info.src} type="video/mp4" />
        Trình duyệt không hỗ trợ video.
      </video>
    );
  }

  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        src={info.src}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-lg border-0"
      />
    </div>
  );
};

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchDish();
  }, [id]);

  const fetchDish = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`);
      if (res.ok) {
        const data = await res.json();
        setDish(data);
        setMainImage(data.images?.[0] ? `${BACKEND_URL}${data.images[0]}` : "");
        // Giả lập đánh giá (sau này lấy từ DB)
        setReviews([
          { user: "Khách 1", rating: 5, comment: "Rất ngon, chuẩn vị!" },
          { user: "Khách 2", rating: 4, comment: "Ngon nhưng hơi mặn." },
        ]);
      } else {
        toast({ title: "Lỗi", description: "Không tìm thấy món ăn", variant: "destructive" });
        navigate("/cuisine");
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (rating: number) => setNewReview({ ...newReview, rating });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment || newReview.rating === 0) {
      toast({ title: "Lỗi", description: "Vui lòng chọn sao và nhập bình luận", variant: "destructive" });
      return;
    }
    const reviewToAdd = { ...newReview, user: "Bạn" };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
    toast({ title: "Cảm ơn bạn đã đánh giá!" });
  };

  const handleFindLocation = () => {
    const query = encodeURIComponent(`${dish.title} Đà Nẵng`);
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!dish) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Nút điều hướng */}
          <div className="flex justify-center items-center gap-4 mb-10">
            <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Quay lại
            </Button>
            <Button onClick={handleFindLocation} className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white">
              <MapPin className="h-4 w-4" /> Tìm quán
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Cột trái: Ảnh + Video */}
            <div className="space-y-6">
              <img
                src={mainImage}
                alt={dish.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="grid grid-cols-4 gap-3">
                {dish.images?.map((img: string, i: number) => {
                  const src = img.startsWith('http') ? img : `${BACKEND_URL}${img}`;
                  return (
                    <img
                      key={i}
                      src={src}
                      alt={`gallery-${i}`}
                      onClick={() => setMainImage(src)}
                      className={`h-24 w-full object-cover rounded-xl cursor-pointer transition ${
                        mainImage === src ? "ring-2 ring-indigo-500" : "hover:opacity-80"
                      }`}
                    />
                  );
                })}
              </div>

              {dish.videoUrl && (
                <div className="bg-white p-4 rounded-2xl shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <PlayCircle className="h-5 w-5 text-rose-500" />
                    <p className="font-semibold">Video review / cách làm</p>
                  </div>
                  <MediaPlayer url={dish.videoUrl} poster={mainImage} />
                </div>
              )}
            </div>

            {/* Cột phải: Thông tin */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-3xl font-extrabold text-gray-900">{dish.title}</h2>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(Đang cập nhật)</span>
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">{dish.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className="bg-orange-500 text-white">Đặc sản</Badge>
                  {dish.place && <Badge className="bg-blue-500 text-white">{dish.place}</Badge>}
                </div>

                {/* Giá */}
                {dish.price && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-2xl font-bold text-accent">
                      {parseInt(dish.price).toLocaleString()}đ
                    </p>
                  </div>
                )}
              </div>

              {/* Thành phần (nếu có) */}
              {dish.ingredients && (
                <div className="bg-orange-50 p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-orange-500" /> Thành phần
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {dish.ingredients.map((ing: string, i: number) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Đánh giá */}
          <div className="mt-12 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-indigo-500" /> Đánh giá
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
                placeholder="Chia sẻ trải nghiệm của bạn..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
              <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                Gửi đánh giá
              </Button>
            </form>

            <div className="space-y-4">
              {reviews.map((r, i) => (
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
                    <span className="font-semibold text-sm">{r.user}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DishDetail;