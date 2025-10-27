// frontend/src/pages/News.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Eye, Search, Filter, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const BACKEND_URL = "http://localhost:5000"; // ĐỔI NẾU CẦN

interface Post {
  _id: string;
  title: string;
  content: string;
  images: string[];
  category: string;
  status: 'draft' | 'published';
  createdAt: string;
  views?: number;
  comments?: number;
}

const News = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const newsCategories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'travel-news', label: 'Tin du lịch' },
    { value: 'events', label: 'Sự kiện' },
    { value: 'festivals', label: 'Lễ hội' },
    { value: 'guides', label: 'Cẩm nang' },
    { value: 'reviews', label: 'Review' },
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/posts?category=tin_tuc&status=published`);
      if (res.ok) {
        const data = await res.json();
        // Sắp xếp theo ngày mới nhất
        const sorted = data.sort((a: Post, b: Post) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sorted);
      } else {
        toast({ title: "Lỗi", description: "Không thể tải tin tức", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", description: "Vui lòng thử lại", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getExcerpt = (content: string, length = 120) => {
    const text = content.replace(/<[^>]*>/g, ''); // Loại bỏ HTML
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const filteredPosts = posts
    .filter(post => post.status === 'published')
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.title.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });

  const featuredNews = filteredPosts.slice(0, 2);
  const allNews = filteredPosts.slice(2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 z-10" />
          <div className="absolute inset-0">
            <img
              src={featuredNews[0]?.images[0] ? 
                (featuredNews[0].images[0].startsWith('http') ? featuredNews[0].images[0] : `${BACKEND_URL}${featuredNews[0].images[0]}`)
                : "/placeholder.svg"}
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
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-4">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm tin tức..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {newsCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
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
        {featuredNews.length > 0 && (
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="mb-4 sunset-gradient text-white">Tin nổi bật</Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Tin tức <span className=" text-primary">nổi bật</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredNews.map((news) => (
                  <Card key={news._id} className="group card-hover border-0 shadow-lg overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={news.images[0] ? 
                          (news.images[0].startsWith('http') ? news.images[0] : `${BACKEND_URL}${news.images[0]}`)
                          : "/placeholder.svg"}
                        alt={news.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="tropical-gradient text-white">
                          Tin tức
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
                        {getExcerpt(news.content)}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(news.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{news.views || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{news.comments || 0}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full hero-gradient hover:opacity-90 text-white" 
                        onClick={() => navigate(`/news/${news._id}`)}
                      >
                        Đọc tiếp
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All News */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Tất cả tin tức
              </h2>
            </div>

            {allNews.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">Chưa có bài viết nào.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allNews.map((news) => (
                  <Card key={news._id} className="group card-hover border-0 shadow-lg overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={news.images[0] ? 
                          (news.images[0].startsWith('http') ? news.images[0] : `${BACKEND_URL}${news.images[0]}`)
                          : "/placeholder.svg"}
                        alt={news.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/20 text-white">
                          Tin tức
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {getExcerpt(news.content, 100)}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(news.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{news.views || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{news.comments || 0}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full sunset-gradient hover:opacity-90 text-white"
                        onClick={() => navigate(`/news/${news._id}`)}
                      >
                        Đọc tiếp
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

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