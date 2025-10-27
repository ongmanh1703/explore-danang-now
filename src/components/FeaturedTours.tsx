import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Calendar, DollarSign, Clock } from 'lucide-react';
import Bana from '@/assets/ba-na.jpg';
import Hoian from '@/assets/chua-cau-hoian.jpg';
import Chodem from '@/assets/cho-dem-son-tra.jpg'
import { Navigate } from 'react-router-dom';
const FeaturedTours = () => {
  const tours = [
    {
      id: 1,
      title: 'Tour Ba Na Hills',
      image: Bana,
      price: 750000,
      originalPrice: 950000,
      duration: '1 ngày',
      groupSize: '3 người',
      rating: 4.8,
      reviews: 3093,
      highlights: ['Cầu Vàng', 'Làng Pháp', 'Cáp treo'],
      departure: 'Hàng ngày',
      category: 'Thắng cảnh',
    },
    {
      id: 2,
      title: 'City Tour Đà Nẵng + Hội An',
      image: Hoian,
      price: 650000,
      originalPrice: 800000,
      duration: '1 ngày',
      groupSize: '10-15 người',
      rating: 4.7,
      reviews: 203,
      highlights: ['Phố cổ Hội An', 'Chùa Cầu', 'Làng gốm Thanh Hà', 'Đèn lồng'],
      departure: 'Thứ 2, 4, 6',
      category: 'Văn hóa lịch sử',
    },
    {
      id: 3,
      title: 'Tour Ẩm thực Chợ Đêm Sơn Trà',
      image: Chodem,
      price: 450000,
      originalPrice: 550000,
      duration: '4 giờ',
      groupSize: '8-12 người',
      rating: 4.9,
      reviews: 89,
      highlights: ['Mực rim', 'Bún trộn', 'Chè'],
      departure: 'Tối hàng ngày',
      category: 'Ẩm thực',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };
  const Navigate = (path: string) => {
    window.location.href = path;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 sunset-gradient text-white">Tour nổi bật</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Các tour
            <span className="text-secondary"> được yêu thích</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Những chuyến đi được thiết kế đặc biệt với giá tốt nhất và trải nghiệm tuyệt vời
          </p>
        </div>

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
                  -21%
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
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(tour.price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(tour.originalPrice)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">/người</span>
                </div>
                
                 <Button
                        className="w-full sunset-gradient hover:opacity-90 text-white"
                        onClick={() => Navigate(`/book-tour/${tour.id}`)}
                      >
                        Đặt tour ngay
                      </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
            Xem tất cả tour
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;