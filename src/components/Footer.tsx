import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Điểm đến', href: '/destinations' },
    { label: 'Tour du lịch', href: '/tours' },
    { label: 'Khách sạn', href: '/hotels' },
    { label: 'Ẩm thực', href: '/cuisine' },
    { label: 'Tin tức', href: '/news' },
  ];

  const services = [
    { label: 'Đặt tour', href: '/book-tour' },
    { label: 'Đặt khách sạn', href: '/book-hotel' },
    { label: 'Thuê xe', href: '/car-rental' },
    { label: 'Hướng dẫn viên', href: '/guide' },
    { label: 'Visa', href: '/visa' },
    { label: 'Bảo hiểm du lịch', href: '/insurance' },
  ];

  const destinations = [
    { label: 'Ba Na Hills', href: '/destinations/bana-hills' },
    { label: 'Hội An', href: '/destinations/hoi-an' },
    { label: 'Huế', href: '/destinations/hue' },
    { label: 'Phong Nha', href: '/destinations/phong-nha' },
    { label: 'Ninh Bình', href: '/destinations/ninh-binh' },
    { label: 'Sapa', href: '/destinations/sapa' },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="hero-gradient rounded-2xl p-8 mb-12">
          <div className="text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Đăng ký nhận thông tin du lịch mới nhất
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Nhận những ưu đãi hấp dẫn, tour mới và cẩm nang du lịch thú vị từ chúng tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Nhập email của bạn" 
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Send className="mr-2 h-4 w-4" />
                Đăng ký
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DN</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Du lịch Đà Nẵng</h3>
                <p className="text-sm text-muted-foreground">Thành phố đáng sống</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Chúng tôi cam kết mang đến những trải nghiệm du lịch tuyệt vời nhất tại Đà Nẵng 
              và các vùng lân cận. Với đội ngũ chuyên nghiệp và dịch vụ tận tâm.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Nguyễn Văn Linh, Quận Thanh Khê, Đà Nẵng</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+84 236 3888 888</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@danangtravel.vn</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-semibold mb-4">Điểm đến phổ biến</h4>
            <ul className="space-y-2">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <Link 
                    to={destination.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {destination.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 Du lịch Đà Nẵng. Tất cả quyền được bảo lưu.
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;