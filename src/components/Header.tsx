import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin, Phone, Mail, LogOut, Bus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Lấy user từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    navigate('/');
  };

  const navigationItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Khám phá', href: '/destinations' },
    { label: 'Tour du lịch', href: '/tours' },
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

            {/* Nếu đã đăng nhập */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-primary font-medium">
                  Xin chào, {user.name || user.fullname || 'Người dùng'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </Button>
              </div>
            ) : (
              // Nếu chưa đăng nhập
              <div className="hidden md:flex space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Đăng nhập</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm">Đăng ký</Button>
                </Link>
              </div>
            )}
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
          <div className="flex items-center space-x-4">
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

            {/* Nút Bus căn phải */}
            {user && (
              <Link to="/my-bookings">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary transition-colors ml-12"
                  title="Tour đã đặt"
                >
                  <Bus className="h-8 w-8" />
                </Button>
              </Link>
            )}

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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <Link
                  to="/my-bookings"
                  className="text-foreground hover:text-primary transition-colors font-medium flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Tour đã đặt</span>
                </Link>
              )}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <span className="text-primary font-medium px-2">
                      Xin chào, {user.name || 'Người dùng'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" size="sm" onClick={() => setIsMenuOpen(false)}>
                        Đăng ký
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;