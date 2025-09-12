import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Khám phá', href: '/destinations' },
    { label: 'Tour du lịch', href: '/tours' },
    { label: 'Khách sạn', href: '/hotels' },
    { label: 'Ẩm thực', href: '/cuisine' },
    { label: 'Tin tức', href: '/news' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Đà Nẵng, Việt Nam</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+84 236 3888 888</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@danangtravel.vn</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button variant="ghost" size="sm">Đăng nhập</Button>
              <Button variant="outline" size="sm">Đăng ký</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DN</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Du lịch Đà Nẵng</h1>
              <p className="text-xs text-muted-foreground">Thành phố đáng sống</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm">Đăng nhập</Button>
                <Button variant="outline" size="sm">Đăng ký</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;