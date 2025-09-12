import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg"
              alt="Đà Nẵng"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 text-center text-white">
            <Badge className="mb-4 hero-gradient text-white">Về Đà Nẵng</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Thành phố đáng sống
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Khám phá vẻ đẹp tự nhiên, văn hóa phong phú và con người thân thiện của Đà Nẵng
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Đà Nẵng - <span className="text-primary">Thành phố đáng sống nhất Việt Nam</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Đà Nẵng là thành phố trực thuộc Trung ương, là trung tâm kinh tế - xã hội quan trọng của khu vực miền Trung. 
                  Với vị trí địa lý đắc địa, khí hậu ôn hòa quanh năm và cảnh quan thiên nhiên tuyệt đẹp, 
                  Đà Nẵng đã trở thành điểm đến hấp dẫn cho du khách trong và ngoài nước.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Diện tích: 1,285 km²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Dân số: 1.2 triệu người</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Thành lập: 1997</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Thành phố xanh</span>
                  </div>
                </div>
                <Button className="hero-gradient text-white">Khám phá ngay</Button>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Đà Nẵng cityscape"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* History & Culture */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 sunset-gradient text-white">Lịch sử & Văn hóa</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Bề dày <span className="text-secondary">lịch sử</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Thời kỳ Chăm Pa</h3>
                  <p className="text-muted-foreground">
                    Đà Nẵng là vùng đất có lịch sử lâu đời với những di tích Chăm Pa cổ kính, 
                    thể hiện nền văn minh rực rỡ của người Chăm.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Thời Pháp thuộc</h3>
                  <p className="text-muted-foreground">
                    Giai đoạn này để lại nhiều công trình kiến trúc Pháp đẹp mắt, 
                    tạo nên nét đặc trưng riêng cho thành phố.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Đà Nẵng hiện đại</h3>
                  <p className="text-muted-foreground">
                    Ngày nay, Đà Nẵng là thành phố năng động, hiện đại nhưng vẫn giữ được 
                    những giá trị văn hóa truyền thống quý báu.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* People & Culture */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/placeholder.svg"
                  alt="People of Da Nang"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold mb-6">
                  Con người <span className="text-primary">Đà Nẵng</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Người Đà Nẵng nổi tiếng với lòng hiếu khách, sự thân thiện và gần gũi. 
                  Họ luôn chào đón du khách với nụ cười ấm áp và sẵn sàng chia sẻ những câu chuyện 
                  thú vị về quê hương mình.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Thân thiện, hiếu khách</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Bảo tồn văn hóa truyền thống</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Tinh thần đoàn kết, tương trợ</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Năng động, sáng tạo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;