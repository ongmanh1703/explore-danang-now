import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, DollarSign, Clock } from 'lucide-react';
import Myquang from '@/assets/my-quang.jpg';
import Caolau from '@/assets/vietnamese-food.jpg';
import Banhtrang from '@/assets/banh-trang.jpg';

const CuisineSection = () => {
  const dishes = [
    {
      id: 1,
      name: 'Mì Quảng Đà Nẵng',
      image: Myquang,
      rating: 4.9,
      reviews: 156,
      price: '35.000đ - 50.000đ',
      category: 'Đặc sản',
      description: 'Món mì truyền thống với nước dùng đậm đà, thịt tôm và rau thơm',
      restaurants: ['Mì Quảng Bà Mua'],
      cookingTime: '10-15 phút',
    },
    {
      id: 2,
      name: 'Cao lầu',
      image: Caolau,
      rating: 4.8,
      reviews: 203,
      price: '30.000đ - 45.000đ',
      category: 'Đặc sản',
      description: 'Cao lầu là đặc sản Hội An với sợi mì vàng dai, thịt heo xíu thơm mềm. Món ăn không chan nhiều nước, chỉ rưới chút sốt đậm đà, tạo nên hương vị độc đáo khó quên.',
      restaurants: ['Cao lầu Phố Hội', 'Mì cao lầu-Ba Tàu'],
      cookingTime: '10-15 phút',
    },
    {
      id: 3,
      name: 'Bánh Tráng Cuốn Thịt Heo',
      image: Banhtrang,
      rating: 4.7,
      reviews: 89,
      price: '25.000đ - 35.000đ',
      category: 'Ăn vặt',
      description: 'Bánh tráng mỏng cuốn thịt heo nướng, chấm với nước mắm chua ngọt',
      restaurants: ['Bánh Tráng Cuốn Thịt Heo Đại Lộc'],
      cookingTime: '5-10 phút',
    },
  ];

  const restaurantCategories = [
    { name: 'Nhà hàng cao cấp', count: 45, color: 'hero-gradient' },
    { name: 'Quán ăn địa phương', count: 120, color: 'sunset-gradient' },
    { name: 'Ẩm thực đường phố', count: 80, color: 'tropical-gradient' },
    { name: 'Café & Bar', count: 65, color: 'hero-gradient' },
  ];

  const handleSearchRestaurant = (dishName) => {
    const query = `${dishName} Đà Nẵng`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 sunset-gradient text-white">Ẩm thực Đà Nẵng</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hương vị
            <span className="text-secondary"> đặc trưng</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Khám phá những món ăn ngon nổi tiếng và các địa điểm ẩm thực tuyệt vời
          </p>
        </div>

        {/* Featured Dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {dishes.map((dish) => (
            <Card key={dish.id} className="group card-hover border-0 shadow-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="tropical-gradient text-white text-xs">
                    {dish.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {dish.cookingTime}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{dish.name}</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{dish.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {dish.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-primary font-semibold">
                    <DollarSign className="h-4 w-4" />
                    <span>{dish.price}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {dish.reviews} đánh giá
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Địa điểm nổi bật:</p>
                  <div className="flex flex-wrap gap-1">
                    {dish.restaurants.slice(0, 2).map((restaurant, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {restaurant}
                      </Badge>
                    ))}
                    {dish.restaurants.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{dish.restaurants.length - 2} khác
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full sunset-gradient hover:opacity-90 text-white"
                  onClick={() => handleSearchRestaurant(dish.name)}
                >
                  Tìm nhà hàng
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Restaurant Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {restaurantCategories.map((category, index) => (
            <Card key={index} className="p-6 text-center card-hover border-0 shadow-md">
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl font-bold text-white">{category.count}</span>
              </div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">địa điểm</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white mr-4">
            Khám phá ẩm thực
          </Button>
          <Button size="lg" className="sunset-gradient hover:opacity-90 text-white">
            Food Tour Đà Nẵng
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CuisineSection;