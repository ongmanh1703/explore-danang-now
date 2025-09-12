import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Camera } from 'lucide-react';
import goldenBridge from '@/assets/golden-bridge.jpg';

const FeaturedDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Cầu Vàng - Ba Na Hills',
      image: goldenBridge,
      rating: 4.8,
      reviews: 2847,
      category: 'Thắng cảnh',
      duration: 'Cả ngày',
      description: 'Cây cầu vàng nổi tiếng với đôi bàn tay khổng lồ đỡ lấy, kiến trúc độc đáo giữa núi rừng Ba Na.',
      highlights: ['Cáp treo dài nhất thế giới', 'Kiến trúc Pháp cổ', 'Làng Pháp'],
    },
    {
      id: 2,
      name: 'Bãi biển Mỹ Khê',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 3452,
      category: 'Bãi biển',
      duration: '2-3 giờ',
      description: 'Một trong những bãi biển đẹp nhất Việt Nam với cát trắng mịn và nước biển trong xanh.',
      highlights: ['Cát trắng mịn', 'Nước biển trong', 'Hoạt động thể thao'],
    },
    {
      id: 3,
      name: 'Chùa Linh Ứng',
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 1876,
      category: 'Tâm linh',
      duration: '1-2 giờ',
      description: 'Ngôi chùa linh thiêng với tượng Phật Quan Âm cao nhất Việt Nam, nhìn ra toàn cảnh thành phố.',
      highlights: ['Tượng Quan Âm 67m', 'View toàn cảnh', 'Kiến trúc đẹp'],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 hero-gradient text-white">Điểm đến nổi bật</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Khám phá những địa điểm
            <span className="text-primary"> tuyệt vời</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Từ những thắng cảnh thiên nhiên hùng vĩ đến các di tích lịch sử độc đáo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group card-hover border-0 shadow-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="tropical-gradient text-white">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="icon" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="text-muted-foreground">({destination.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Đà Nẵng</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
                
                <Button className="w-full hero-gradient hover:opacity-90 text-white">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
            Xem tất cả điểm đến
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;