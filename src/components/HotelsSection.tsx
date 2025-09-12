import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Utensils, Waves } from 'lucide-react';
import luxuryResort from '@/assets/luxury-resort.jpg';

const HotelsSection = () => {
  const hotels = [
    {
      id: 1,
      name: 'Fusion Resort Đà Nẵng',
      image: luxuryResort,
      rating: 4.8,
      reviews: 342,
      price: 2500000,
      originalPrice: 3200000,
      location: 'Bãi biển Mỹ Khê',
      category: 'Resort 5 sao',
      amenities: ['Bể bơi vô cực', 'Spa', 'Nhà hàng', 'Gym'],
      features: [
        { icon: Wifi, label: 'WiFi miễn phí' },
        { icon: Car, label: 'Đưa đón sân bay' },
        { icon: Utensils, label: 'Ăn sáng buffet' },
        { icon: Waves, label: 'Bãi biển riêng' },
      ],
    },
    {
      id: 2,
      name: 'InterContinental Danang',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 567,
      price: 1800000,
      originalPrice: 2300000,
      location: 'Bán đảo Sơn Trà',
      category: 'Khách sạn 5 sao',
      amenities: ['Bể bơi', 'Spa', 'Sân golf', 'Kids club'],
      features: [
        { icon: Wifi, label: 'WiFi miễn phí' },
        { icon: Car, label: 'Bãi đỗ xe' },
        { icon: Utensils, label: '3 nhà hàng' },
        { icon: Waves, label: 'Bãi biển' },
      ],
    },
    {
      id: 3,
      name: 'Naman Retreat',
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 234,
      price: 3500000,
      originalPrice: 4200000,
      location: 'Thuận Phước',
      category: 'Boutique Resort',
      amenities: ['Yoga', 'Spa trị liệu', 'Organic food', 'Meditation'],
      features: [
        { icon: Wifi, label: 'WiFi miễn phí' },
        { icon: Car, label: 'Dịch vụ xe' },
        { icon: Utensils, label: 'Ẩm thực organic' },
        { icon: Waves, label: 'Bãi biển riêng' },
      ],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 tropical-gradient text-white">Khách sạn & Resort</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lưu trú
            <span className="text-accent"> đẳng cấp</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Từ resort sang trọng bên bờ biển đến khách sạn boutique độc đáo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="group card-hover border-0 shadow-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="hero-gradient text-white text-xs">
                    {hotel.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  -22%
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{hotel.name}</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.location}</span>
                  <span>•</span>
                  <span>{hotel.reviews} đánh giá</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {hotel.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <feature.icon className="h-4 w-4" />
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(hotel.price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(hotel.originalPrice)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">/đêm</span>
                </div>
                
                <Button className="w-full tropical-gradient hover:opacity-90 text-white">
                  Đặt phòng ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-white">
            Xem tất cả khách sạn
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;