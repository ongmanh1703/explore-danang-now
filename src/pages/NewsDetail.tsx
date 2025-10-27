// frontend/src/pages/NewsDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Eye,
  MessageCircle,
  Star,
  ArrowLeft,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const BACKEND_URL = "http://localhost:5000"; // ĐỔI NẾU CẦN

interface Post {
  _id: string;
  title: string;
  content: string;
  images: string[];
  category: string;
  createdAt: string;
  views?: number;
  comments?: number;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  // Đánh giá & bình luận
  const [reviews, setReviews] = useState([
    { user: "Khách vãng lai", rating: 5, comment: "Bài viết rất hay và chi tiết!" },
  ]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchRelatedAndFeatured();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        toast({ title: "Lỗi", description: "Không tìm thấy bài viết", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedAndFeatured = async () => {
    try {
      const res = await fetch(`/api/posts?category=tin_tuc&status=published&limit=6`);
      if (res.ok) {
        const all = await res.json();
        const filtered = all.filter((p: Post) => p._id !== id);
        setRelatedPosts(filtered.slice(0, 3));
        setFeaturedPosts(filtered.filter((p: Post) => p.views && p.views > 1000).slice(0, 3));
      }
    } catch (err) {
      console.error("Lỗi tải tin liên quan");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment || newReview.rating === 0) {
      toast({ title: "Thiếu thông tin", description: "Vui lòng chọn sao và nhập bình luận", variant: "destructive" });
      return;
    }
    const reviewToAdd = { ...newReview, user: "Khách vãng lai" };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
    toast({ title: "Cảm ơn bạn!", description: "Đánh giá đã được gửi." });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-muted-foreground">
        Không tìm thấy bài viết!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover Image */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={
            post.images[0]
              ? post.images[0].startsWith("http")
                ? post.images[0]
                : `${BACKEND_URL}${post.images[0]}`
              : "/placeholder.svg"
          }
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
          <div className="container mx-auto px-4 py-8 text-white">
            <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 mb-3">
              Tin tức
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold max-w-4xl leading-snug">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 border-b pb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.views || 0}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {reviews.length}
              </div>
            </div>

            {/* Content */}
            <article className="prose prose-lg max-w-none mb-10 text-gray-800 leading-relaxed">
              <div
                className="whitespace-pre-line mt-6 space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Buttons */}
            <div className="flex gap-3 mb-10">
              <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại
              </Button>
            </div>

            {/* Đánh giá & Bình luận */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-indigo-500" /> Đánh giá & Bình luận
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4 mb-8">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      onClick={() => handleStarClick(idx + 1)}
                      className={`h-6 w-6 cursor-pointer transition ${
                        idx < newReview.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <textarea
                  placeholder="Chia sẻ cảm nhận của bạn..."
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  Gửi đánh giá
                </Button>
              </form>

              {/* Danh sách review */}
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="border-b pb-3 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${
                            idx < r.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="font-semibold text-sm text-gray-700">
                        {r.user}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related News */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Tin liên quan</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((item) => (
                    <Card
                      key={item._id}
                      className="cursor-pointer hover:shadow-xl transition group"
                      onClick={() => navigate(`/news/${item._id}`)}
                    >
                      <img
                        src={
                          item.images[0]
                            ? item.images[0].startsWith("http")
                              ? item.images[0]
                              : `${BACKEND_URL}${item.images[0]}`
                            : "/placeholder.svg"
                        }
                        alt={item.title}
                        className="h-40 w-full object-cover rounded-t-lg group-hover:scale-105 transition"
                      />
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Tin nổi bật</h3>
              {featuredPosts.length > 0 ? (
                featuredPosts.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 mb-3 cursor-pointer hover:bg-gray-100 rounded p-2 transition"
                    onClick={() => navigate(`/news/${item._id}`)}
                  >
                    <img
                      src={
                        item.images[0]
                          ? item.images[0].startsWith("http")
                            ? item.images[0]
                            : `${BACKEND_URL}${item.images[0]}`
                          : "/placeholder.svg"
                      }
                      alt={item.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Chưa có tin nổi bật</p>
              )}
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;