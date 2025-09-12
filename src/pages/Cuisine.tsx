import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Clock, Search, Filter, Utensils, Users } from 'lucide-react';
import vietnameseFood from '@/assets/vietnamese-food.jpg';

const Cuisine = () => {
  const dishes = [
    {
      id: 1,
      name: 'Mì Quảng',
      image: vietnameseFood,
      description: 'Món ăn đặc sản nổi tiếng nhất của Quảng Nam với nước dùng đậm đà, sợi mì vàng và tôm tươi.',
      category: 'Món chính',
      price: '25000-40000',
      rating: 4.8,
      reviews: 1234,
      speciality: true,
      ingredients: ['Tôm', 'Thịt heo', 'Trứng cút', 'Bánh tráng'],
    },
    {
      id: 2,
      name: 'Bún chả cá',
      image: '/placeholder.svg',
      description: 'Món bún với chả cá thu thơm ngon, ăn kèm rau sống và nước mắm chua ngọt.',
      category: 'Món chính',
      price: '20000-35000',
      rating: 4.7,
      reviews: 987,
      speciality: true,
      ingredients: ['Cá thu', 'Bún tươi', 'Rau sống', 'Nước mắm'],
    },
    {
      id: 3,
      name: 'Bánh tráng cuốn thịt heo',
      image: '/placeholder.svg',
      description: 'Bánh tráng mỏng cuốn thịt heo nướng thơm lừng, ăn kèm rau sống và nước chấm đặc biệt.',
      category: 'Món nhẹ',
      price: '15000-25000',
      rating: 4.6,
      reviews: 756,
      speciality: true,
      ingredients: ['Bánh tráng', 'Thịt heo nướng', 'Rau sống', 'Nước chấm'],
    },
    {
      id: 4,
      name: 'Bánh xèo',
      image: '/placeholder.svg',
      description: 'Bánh xèo giòn rụm với nhân tôm thịt, ăn kèm rau sống và nước mắm chua ngọt.',
      category: 'Món chính',
      price: '30000-50000',
      rating: 4.5,
      reviews: 654,
      speciality: false,
      ingredients: ['Bột gạo', 'Tôm', 'Thịt ba chỉ', 'Giá đỗ'],
    },
    {
      id: 5,
      name: 'Chè bưởi',
      image: '/placeholder.svg',
      description: 'Món tráng miệng thanh mát với múi bưởi tươi, nước cốt dừa và đá bào.',
      category: 'Tráng miệng',
      price: '10000-20000',
      rating: 4.4,
      reviews: 432,
      speciality: false,
      ingredients: ['Bưởi', 'Nước cốt dừa', 'Đường', 'Đá bào'],
    },
    {
      id: 6,
      name: 'Bánh căn',
      image: '/placeholder.svg',
      description: 'Bánh căn tròn xinh với nhân đậu xanh hoặc tôm, ăn kèm nước mắm pha.',
      category: 'Món nhẹ',
      price: '2000-3000',
      rating: 4.3,
      reviews: 321,
      speciality: false,
      ingredients: ['Bột gạo', 'Đậu xanh', 'Tôm', 'Hành lá'],
    },
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Mì Quảng Bà Mua',
      address: '23A Trần Quý Cáp, Thạch Thang, Hải Châu',
      rating: 4.8,
      reviews: 256,
      priceRange: '25000-40000',
      specialty: 'Mì Quảng',
      openTime: '6:00 - 22:00',
    },
    {
      id: 2,
      name: 'Bún Chả Cá 1327',
      address: '1327 Trần Cao Vân, Xuân Hà, Thanh Khê',
      rating: 4.7,
      reviews: 189,
      priceRange: '20000-35000',
      specialty: 'Bún chả cá',
      openTime: '7:00 - 21:00',
    },
    {
      id: 3,
      name: 'Bánh Tráng Cuốn Thịt Heo Hạnh',
      address: '60 Hoàng Diệu, Hải Châu',
      rating: 4.6,
      reviews: 143,
      priceRange: '15000-25000',
      specialty: 'Bánh tráng cuốn',
      openTime: '15:00 - 23:00',
    },
  ];

  const formatPrice = (price: string) => {
    const [min, max] = price.split('-');
    return `${parseInt(min).toLocaleString()}đ - ${parseInt(max).toLocaleString()}đ`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-primary/90 z-10" />
          <div className="absolute inset-0">
            <img
              src={vietnameseFood}
              alt="Ẩm thực Đà Nẵng"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 text-center text-white">
            <Badge className="mb-4 hero-gradient text-white">Ẩm thực</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ẩm thực Đà Nẵng
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Khám phá hương vị đặc sắc của vùng đất miền Trung
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
                    placeholder="Tìm món ăn, quán ăn..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Loại món" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="main">Món chính</SelectItem>
                    <SelectItem value="snack">Món nhẹ</SelectItem>
                    <SelectItem value="dessert">Tráng miệng</SelectItem>
                    <SelectItem value="drink">Đồ uống</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Mức giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Dưới 20k</SelectItem>
                    <SelectItem value="medium">20k - 50k</SelectItem>
                    <SelectItem value="high">Trên 50k</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="hero-gradient text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Featured Dishes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 sunset-gradient text-white">Món ăn đặc sản</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Những món ăn <span className="text-accent">không thể bỏ qua</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Khám phá hương vị độc đáo của ẩm thực miền Trung
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dishes.map((dish) => (
                <Card key={dish.id} className="group card-hover border-0 shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {dish.speciality && (
                      <div className="absolute top-4 left-4">
                        <Badge className="tropical-gradient text-white">
                          Đặc sản
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/20 text-white">
                        {dish.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{dish.name}</h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{dish.rating}</span>
                        <span className="text-muted-foreground">({dish.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {dish.description}
                    </p>
                    
                    <div className="flex items-center mb-4 text-sm text-muted-foreground">
                      <Utensils className="h-4 w-4 mr-1" />
                      <span>Nguyên liệu: {dish.ingredients.join(', ')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-accent">
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                    
                    <Button className="w-full sunset-gradient hover:opacity-90 text-white">
                      Tìm quán gần đây
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Restaurants */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 hero-gradient text-white">Quán ăn nổi tiếng</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Các quán ăn <span className="text-primary">được yêu thích</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                    
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-muted-foreground">({restaurant.reviews} đánh giá)</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurant.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Mở cửa: {restaurant.openTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-4 w-4" />
                        <span>Đặc sản: {restaurant.specialty}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-accent">
                        {formatPrice(restaurant.priceRange)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full hero-gradient text-white">
                        Xem vị trí
                      </Button>
                      <Button variant="outline" className="w-full">
                        Đánh giá & review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-white">
                Xem tất cả quán ăn
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cuisine;