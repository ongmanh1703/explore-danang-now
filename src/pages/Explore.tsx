// src/pages/Explore.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Clock, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const API_URL = "/api/posts";
const BACKEND_URL = "http://localhost:5000";

const Explore = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?category=kham_pha&status=published`);
      if (res.ok) {
        const data = await res.json();
        setDestinations(data);
      }
    } catch (err) {
      toast({ title: "Lỗi", description: "Không thể tải điểm đến", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration: string) => {
    if (!duration) return "Liên hệ";
    return duration;
  };

  const getCategoryLabel = (cat: string) => {
    const map: any = {
      'beach': 'Bãi biển',
      'mountain': 'Núi rừng',
      'spiritual': 'Tâm linh',
      'entertainment': 'Vui chơi',
      'culture': 'Văn hóa'
    };
    return map[cat] || cat;
  };

  const filtered = destinations.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || d.category === filterCategory;
    const matchesDuration = filterDuration === "all" ||
      (filterDuration === "short" && d.duration?.includes("giờ")) ||
      (filterDuration === "medium" && d.duration?.includes("giờ")) ||
      (filterDuration === "long" && d.duration?.includes("ngày")) ||
      (filterDuration === "full" && d.duration?.includes("ngày"));

    return matchesSearch && matchesCategory && matchesDuration;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
          <div className="absolute inset-0">
            {destinations[0]?.images?.[0] ? (
              <img
                src={destinations[0].images[0].startsWith('http') ? destinations[0].images[0] : `${BACKEND_URL}${destinations[0].images[0]}`}
                alt="Khám phá Đà Nẵng"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gradient-to-br from-blue-500 to-teal-600 w-full h-full" />
            )}
          </div>
          <div className="relative z-20 text-center text-white">
            <Badge className="mb-4 hero-gradient text-white">Khám phá</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Điểm đến tuyệt vời
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Khám phá những địa điểm đẹp nhất và thú vị nhất tại Đà Nẵng
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-4">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm điểm đến..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Loại điểm đến" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="beach">Bãi biển</SelectItem>
                    <SelectItem value="mountain">Núi rừng</SelectItem>
                    <SelectItem value="spiritual">Tâm linh</SelectItem>
                    <SelectItem value="entertainment">Vui chơi</SelectItem>
                    <SelectItem value="culture">Văn hóa</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterDuration} onValueChange={setFilterDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Thời gian tham quan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="short">Dưới 2 giờ</SelectItem>
                    <SelectItem value="medium">2-4 giờ</SelectItem>
                    <SelectItem value="long">Nửa ngày</SelectItem>
                    <SelectItem value="full">Cả ngày</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="hero-gradient text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Lọc kết quả
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">Không tìm thấy điểm đến nào</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((dest) => (
                  <Card key={dest._id} className="group card-hover border-0 shadow-lg overflow-hidden">
                    <div className="relative overflow-hidden">
                      {dest.images?.[0] ? (
                        <img
                          src={dest.images[0].startsWith('http') ? dest.images[0] : `${BACKEND_URL}${dest.images[0]}`}
                          alt={dest.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="bg-muted w-full h-64 flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className="tropical-gradient text-white">
                          {getCategoryLabel(dest.category) || "Khám phá"}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{dest.title}</h3>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">4.8</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(dest.duration) || "Liên hệ"}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{dest.place || "Đà Nẵng"}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {dest.content?.slice(0, 120)}...
                      </p>

                     <Button
  className="w-full hero-gradient hover:opacity-90 text-white"
  onClick={() => navigate(`/destinations/${dest._id}`)}  // Dùng _id từ API
>
  Xem chi tiết
</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;