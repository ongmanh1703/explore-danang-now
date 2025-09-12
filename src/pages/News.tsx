import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Eye, Search, Filter, MessageCircle } from 'lucide-react';

const News = () => {
  const newsCategories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'travel-news', label: 'Tin du lịch' },
    { value: 'events', label: 'Sự kiện' },
    { value: 'festivals', label: 'Lễ hội' },
    { value: 'guides', label: 'Cẩm nang' },
    { value: 'reviews', label: 'Review' },
  ];

  const featuredNews = [
    {
      id: 1,
      title: 'Đà Nẵng ra mắt tuyến đường bộ ven biển mới, thu hút hàng triệu du khách',
      excerpt: 'Tuyến đường bộ ven biển mới dài 15km sẽ kết nối các điểm du lịch chính của thành phố...',
      image: '/placeholder.svg',
      category: 'Tin du lịch',
      author: 'Nguyễn Văn A',
      publishDate: '2024-01-15',
      views: 1234,
      comments: 45,
      featured: true,
    },
    {
      id: 2,
      title: 'Lễ hội pháo hoa quốc tế Đà Nẵng 2024 - Quy mô lớn nhất từ trước đến nay',
      excerpt: 'Lễ hội pháo hoa quốc tế Đà Nẵng 2024 sẽ diễn ra từ 10-15/6 với sự tham gia của 8 đội pháo hoa...',
      image: '/placeholder.svg',
      category: 'Sự kiện',
      author: 'Trần Thị B',
      publishDate: '2024-01-12',
      views: 2156,
      comments: 78,
      featured: true,
    },
  ];

  const allNews = [
    {
      id: 3,
      title: 'Top 10 món ăn đặc sản Đà Nẵng du khách không thể bỏ qua',
      excerpt: 'Khám phá những món ăn đặc sản độc đáo nhất của Đà Nẵng từ Mì Quảng, Bún chả cá đến Bánh xèo...',
      image: '/placeholder.svg',
      category: 'Cẩm nang',
      author: 'Lê Văn C',
      publishDate: '2024-01-10',
      views: 987,
      comments: 23,
      featured: false,
    },
    {
      id: 4,
      title: 'Bí quyết du lịch Đà Nẵng 3 ngày 2 đêm với ngân sách tiết kiệm',
      excerpt: 'Hướng dẫn chi tiết cách du lịch Đà Nẵng 3 ngày 2 đêm chỉ với 2 triệu đồng bao gồm ăn, ở, đi lại...',
      image: '/placeholder.svg',
      category: 'Cẩm nang',
      author: 'Phạm Thị D',
      publishDate: '2024-01-08',
      views: 1456,
      comments: 34,
      featured: false,
    },
    {
      id: 5,
      title: 'Review khách sạn 5 sao tại Đà Nẵng: Trải nghiệm xa hoa bên bờ biển',
      excerpt: 'Đánh giá chi tiết các khách sạn 5 sao hàng đầu tại Đà Nẵng với dịch vụ đẳng cấp và view biển tuyệt đẹp...',
      image: '/placeholder.svg',
      category: 'Review',
      author: 'Hoàng Văn E',
      publishDate: '2024-01-05',
      views: 2234,
      comments: 67,
      featured: false,
    },
    {
      id: 6,
      title: 'Lễ hội Cầu Ngư Đà Nẵng 2024 - Bảo tồn văn hóa biển đảo',
      excerpt: 'Lễ hội Cầu Ngư truyền thống của ngư dân Đà Nẵng sẽ được tổ chức tại bãi biển Mỹ Khê...',
      image: '/placeholder.svg',
      category: 'Lễ hội',
      author: 'Vũ Thị F',
      publishDate: '2024-01-03',
      views: 756,
      comments: 12,
      featured: false,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 z-10" />
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg"
              alt="Tin tức du lịch"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 text-center text-white">
            <Badge className="mb-4 hero-gradient text-white">Tin tức & Blog</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tin tức du lịch
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất về du lịch Đà Nẵng
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
                    placeholder="Tìm kiếm tin tức..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {newsCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Mới nhất</SelectItem>
                    <SelectItem value="week">Tuần này</SelectItem>
                    <SelectItem value="month">Tháng này</SelectItem>
                    <SelectItem value="year">Năm này</SelectItem>
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

        {/* Featured News */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 sunset-gradient text-white">Tin nổi bật</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Tin tức <span className="text-primary">nổi bật</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredNews.map((news) => (
                <Card key={news.id} className="group card-hover border-0 shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="tropical-gradient text-white">
                        {news.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white">
                        Nổi bật
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{news.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(news.publishDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{news.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{news.comments}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full hero-gradient hover:opacity-90 text-white">
                      Đọc tiếp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All News */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Tất cả tin tức
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allNews.map((news) => (
                <Card key={news.id} className="group card-hover border-0 shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/20 text-white">
                        {news.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{news.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(news.publishDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{news.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{news.comments}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full sunset-gradient hover:opacity-90 text-white">
                      Đọc tiếp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                Xem thêm tin tức
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;