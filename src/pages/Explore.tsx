import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Clock, Search, Filter } from 'lucide-react';
import goldenBridge from '@/assets/golden-bridge.jpg';

const Explore = () => {
  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'beach', label: 'Bãi biển' },
    { value: 'mountain', label: 'Núi rừng' },
    { value: 'spiritual', label: 'Tâm linh' },
    { value: 'entertainment', label: 'Vui chơi' },
    { value: 'culture', label: 'Văn hóa' },
  ];

  const destinations = [
    {
      id: 1,
      name: 'Cầu Vàng - Ba Na Hills',
      image: goldenBridge,
      rating: 4.8,
      reviews: 2847,
      category: 'Thắng cảnh',
      duration: 'Cả ngày',
      location: 'Ba Na Hills',
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
      location: 'Ngũ Hành Sơn',
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
      location: 'Bán đảo Sơn Trà',
      description: 'Ngôi chùa linh thiêng với tượng Phật Quan Âm cao nhất Việt Nam, nhìn ra toàn cảnh thành phố.',
      highlights: ['Tượng Quan Âm 67m', 'View toàn cảnh', 'Kiến trúc đẹp'],
    },
    {
      id: 4,
      name: 'Ngũ Hành Sơn',
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 2156,
      category: 'Tâm linh',
      duration: '3-4 giờ',
      location: 'Ngũ Hành Sơn',
      description: 'Quần thể 5 ngọn núi đá vôi với hang động và chùa chiền linh thiêng.',
      highlights: ['5 ngọn núi', 'Hang động tự nhiên', 'Chùa cổ'],
    },
    {
      id: 5,
      name: 'Cầu Rồng',
      image: '/placeholder.svg',
      rating: 4.4,
      reviews: 1543,
      category: 'Văn hóa',
      duration: '30 phút',
      location: 'Trung tâm thành phố',
      description: 'Cây cầu biểu tượng của Đà Nẵng với hình dáng con rồng phun lửa và nước.',
      highlights: ['Phun lửa cuối tuần', 'Kiến trúc độc đáo', 'Biểu tượng thành phố'],
    },
    {
      id: 6,
      name: 'Bán đảo Sơn Trà',
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 987,
      category: 'Thiên nhiên',
      duration: 'Nửa ngày',
      location: 'Sơn Trà',
      description: 'Khu bảo tồn thiên nhiên với rừng nguyên sinh và bãi biển hoang sơ.',
      highlights: ['Rừng nguyên sinh', 'Voọc chà vá chân nâu', 'Bãi biển hoang sơ'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
          <div className="absolute inset-0">
            <img
              src={goldenBridge}
              alt="Khám phá Đà Nẵng"
              className="w-full h-full object-cover"
            />
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
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm điểm đến..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Loại điểm đến" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Thời gian tham quan" />
                  </SelectTrigger>
                  <SelectContent>
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
        <section className="py-20">
          <div className="container mx-auto px-4">
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
                        <span>{destination.location}</span>
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

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                Xem thêm điểm đến
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;