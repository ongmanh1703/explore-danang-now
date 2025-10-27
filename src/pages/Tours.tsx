import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Star, Users, Calendar, Clock, Search, Filter, MapPin
} from 'lucide-react';

// === API CALL (KHÔNG CẦN TOKEN) ===
const API_BASE = "http://localhost:5000/api/tours";

const callAPI = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Không thể tải tour");
  return res.json();
};

interface Tour {
  _id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize?: string;
  rating?: number;
  reviews?: number;
  highlights: string[];
  departure?: string;
  category?: string;
  includes: string[];
  status: string;
}

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // 👉 Thêm state để hiển thị dần
  const [visibleCount, setVisibleCount] = useState(6);

  const navigate = useNavigate();

  // Load tours từ backend
  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await callAPI(API_BASE);
        // Chỉ hiển thị tour đã xuất bản
        setTours(data.filter((t: Tour) => t.status === "published"));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTours();
  }, []);

  // Filter logic
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch = (tour.title || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || (tour.category || "").toLowerCase() === categoryFilter.toLowerCase();
      const matchesDuration = durationFilter === "all" ||
        (durationFilter === "half" && tour.duration.toLowerCase().includes("giờ")) ||
        (durationFilter === "full" && tour.duration.toLowerCase().includes("ngày") && !tour.duration.toLowerCase().includes("nhiều")) ||
        (durationFilter === "multi" && tour.duration.toLowerCase().includes("nhiều"));
      const matchesPrice = priceFilter === "all" ||
        (priceFilter === "low" && tour.price < 500000) ||
        (priceFilter === "medium" && tour.price >= 500000 && tour.price <= 1000000) ||
        (priceFilter === "high" && tour.price > 1000000);

      return matchesSearch && matchesCategory && matchesDuration && matchesPrice;
    });
  }, [tours, searchTerm, categoryFilter, durationFilter, priceFilter]);

  // Chỉ hiển thị giới hạn theo visibleCount
  const visibleTours = filteredTours.slice(0, visibleCount);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const getDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round((1 - price / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90 z-10" />
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-teal-600" />
          </div>
          <div className="relative z-20 text-center text-white px-4">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Tour du lịch</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tour được yêu thích
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Khám phá Đà Nẵng với những tour du lịch hấp dẫn và giá tốt nhất
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-4">
            <Card className="p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm tour..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Loại tour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="khám phá thiên nhiên">Khám phá thiên nhiên</SelectItem>
                    <SelectItem value="văn hóa lịch sử">Văn hóa lịch sử</SelectItem>
                    <SelectItem value="ẩm thực">Ẩm thực</SelectItem>
                    <SelectItem value="tâm linh">Tâm linh</SelectItem>
                    <SelectItem value="city tour">City tour</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={durationFilter} onValueChange={setDurationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="half">Nửa ngày</SelectItem>
                    <SelectItem value="full">1 ngày</SelectItem>
                    <SelectItem value="multi">Nhiều ngày</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="low">Dưới 500k</SelectItem>
                    <SelectItem value="medium">500k - 1tr</SelectItem>
                    <SelectItem value="high">Trên 1tr</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600">
                  <Filter className="h-4 w-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Đang tải tour...</p>
              </div>
            ) : visibleTours.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">Không tìm thấy tour nào phù hợp.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleTours.map((tour) => (
                  <Card
                    key={tour._id}
                    className="group card-hover border-0 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      {tour.image ? (
                        <img
                          src={tour.image ? (tour.image.startsWith('http') ? tour.image : `http://localhost:5000${tour.image}`) : ""}
                          alt={tour.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
                          <MapPin className="h-16 w-16 text-white opacity-70" />
                        </div>
                      )}
                      {tour.category && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-teal-500 to-blue-600 text-white text-xs">
                            {tour.category}
                          </Badge>
                        </div>
                      )}
                      {tour.originalPrice && tour.originalPrice > tour.price && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          -{getDiscountPercent(tour.price, tour.originalPrice)}%
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900">
                        {tour.title}
                      </h3>

                      <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{tour.duration}</span>
                        </div>
                        {tour.groupSize && (
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{tour.groupSize}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{tour.rating || 0}</span>
                          <span className="text-muted-foreground text-sm">
                            ({tour.reviews || 0} đánh giá)
                          </span>
                        </div>
                        {tour.departure && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{tour.departure}</span>
                          </div>
                        )}
                      </div>

                      {/* Highlights */}
                      {tour.highlights && tour.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {tour.highlights.slice(0, 3).map((h, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {h}
                            </Badge>
                          ))}
                          {tour.highlights.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{tour.highlights.length - 3} khác
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Includes */}
                      {tour.includes && tour.includes.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Bao gồm:</p>
                          <div className="flex flex-wrap gap-1">
                            {tour.includes.slice(0, 2).map((item, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                            {tour.includes.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{tour.includes.length - 2} khác
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-secondary">
                            {formatPrice(tour.price)}
                          </span>
                          {tour.originalPrice && tour.originalPrice > tour.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(tour.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">/người</span>
                      </div>

                      {/* Book Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium"
                        onClick={() => navigate(`/book-tour/${tour._id}`)}
                      >
                        Đặt tour ngay
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {!loading && filteredTours.length > visibleCount && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                  Xem thêm tour
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tours;

