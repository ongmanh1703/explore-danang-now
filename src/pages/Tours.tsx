import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Users, Calendar, Clock, Search, Filter, MapPin } from 'lucide-react';

const Tours = () => {
  const tours = [
    {
      id: 1,
      title: 'Tour Ba Na Hills + Chùa Linh Ứng',
      image: '/placeholder.svg',
      price: 750000,
      originalPrice: 950000,
      duration: '1 ngày',
      groupSize: '15-20 người',
      rating: 4.8,
      reviews: 156,
      highlights: ['Cầu Vàng', 'Làng Pháp', 'Chùa Linh Ứng', 'Cáp treo'],
      departure: 'Hàng ngày',
      category: 'Khám phá thiên nhiên',
      includes: ['Xe du lịch', 'Hướng dẫn viên', 'Vé tham quan', 'Bữa trưa'],
    },
    {
      id: 2,
      title: 'City Tour Đà Nẵng + Hội An',
      image: '/placeholder.svg',
      price: 650000,
      originalPrice: 800000,
      duration: '1 ngày',
      groupSize: '10-15 người',
      rating: 4.7,
      reviews: 203,
      highlights: ['Phố cổ Hội An', 'Chùa Cầu', 'Làng gốm Thanh Hà', 'Đèn lồng'],
      departure: 'Thứ 2, 4, 6',
      category: 'Văn hóa lịch sử',
      includes: ['Xe du lịch', 'Hướng dẫn viên', 'Vé tham quan', '2 bữa ăn'],
    },
    {
      id: 3,
      title: 'Tour Ẩm thực Đà Nẵng',
      image: '/placeholder.svg',
      price: 450000,
      originalPrice: 550000,
      duration: '4 giờ',
      groupSize: '8-12 người',
      rating: 4.9,
      reviews: 89,
      highlights: ['Bún chả cá', 'Mì Quảng', 'Bánh tráng cuốn thịt heo', 'Chè'],
      departure: 'Chiều hàng ngày',
      category: 'Ẩm thực',
      includes: ['Hướng dẫn viên', 'Tất cả món ăn', 'Nước uống', 'Xe máy'],
    },
    {
      id: 4,
      title: 'Tour Ngũ Hành Sơn + Bãi biển Mỹ Khê',
      image: '/placeholder.svg',
      price: 580000,
      originalPrice: 720000,
      duration: '1 ngày',
      groupSize: '12-18 người',
      rating: 4.6,
      reviews: 134,
      highlights: ['Ngũ Hành Sơn', 'Làng đá Non Nước', 'Bãi biển Mỹ Khê', 'Chùa Tam Thai'],
      departure: 'Thứ 3, 5, 7',
      category: 'Khám phá thiên nhiên',
      includes: ['Xe du lịch', 'Hướng dẫn viên', 'Vé tham quan', 'Bữa trưa'],
    },
    {
      id: 5,
      title: 'Tour Sơn Trà + Chùa Linh Ứng',
      image: '/placeholder.svg',
      price: 380000,
      originalPrice: 480000,
      duration: 'Nửa ngày',
      groupSize: '10-15 người',
      rating: 4.5,
      reviews: 98,
      highlights: ['Bán đảo Sơn Trà', 'Chùa Linh Ứng', 'Tượng Quan Âm', 'Rừng nguyên sinh'],
      departure: 'Sáng hàng ngày',
      category: 'Tâm linh',
      includes: ['Xe du lịch', 'Hướng dẫn viên', 'Vé tham quan', 'Nước suối'],
    },
    {
      id: 6,
      title: 'Tour Sunset + Cầu Rồng phun lửa',
      image: '/placeholder.svg',
      price: 320000,
      originalPrice: 400000,
      duration: '3 giờ',
      groupSize: '15-20 người',
      rating: 4.7,
      reviews: 167,
      highlights: ['Cầu Rồng', 'Phun lửa', 'Sunset', 'Cầu Tình Yêu'],
      departure: 'Chiều thứ 7, CN',
      category: 'City tour',
      includes: ['Xe du lịch', 'Hướng dẫn viên', 'Nước uống', 'Ảnh kỷ niệm'],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90 z-10" />
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg"
              alt="Tour du lịch"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 text-center text-white">
            <Badge className="mb-4 sunset-gradient text-white">Tour du lịch</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tour được yêu thích
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Khám phá Đà Nẵng với những tour du lịch hấp dẫn và giá tốt nhất
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm tour..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Loại tour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="nature">Khám phá thiên nhiên</SelectItem>
                    <SelectItem value="culture">Văn hóa lịch sử</SelectItem>
                    <SelectItem value="food">Ẩm thực</SelectItem>
                    <SelectItem value="spiritual">Tâm linh</SelectItem>
                    <SelectItem value="city">City tour</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half">Nửa ngày</SelectItem>
                    <SelectItem value="full">1 ngày</SelectItem>
                    <SelectItem value="multi">Nhiều ngày</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Dưới 500k</SelectItem>
                    <SelectItem value="medium">500k - 1tr</SelectItem>
                    <SelectItem value="high">Trên 1tr</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="sunset-gradient text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <Card key={tour.id} className="group card-hover border-0 shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="tropical-gradient text-white text-xs">
                        {tour.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round((1 - tour.price / tour.originalPrice) * 100)}%
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{tour.title}</h3>
                    
                    <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{tour.rating}</span>
                        <span className="text-muted-foreground text-sm">({tour.reviews} đánh giá)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{tour.departure}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {tour.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{tour.highlights.length - 3} khác
                        </Badge>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Bao gồm:</p>
                      <div className="flex flex-wrap gap-1">
                        {tour.includes.slice(0, 2).map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
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
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-secondary">
                          {formatPrice(tour.price)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(tour.originalPrice)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">/người</span>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full sunset-gradient hover:opacity-90 text-white">
                        Đặt tour ngay
                      </Button>
                      <Button variant="outline" className="w-full">
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                Xem thêm tour
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tours;