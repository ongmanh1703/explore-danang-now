import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import heroImage from '@/assets/danang-hero.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Đà Nẵng Beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Khám phá
            <span className="block text-transparent bg-gradient-to-r from-sunset to-tropical bg-clip-text">
              Đà Nẵng
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Thành phố của những cây cầu, bãi biển tuyệt đẹp và ẩm thực phong phú.
            <br />
            Hãy để chúng tôi đưa bạn đến những trải nghiệm khó quên!
          </p>

          {/* Search Box */}
          <div className="glass-effect p-6 rounded-2xl max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Điểm đến" 
                  className="pl-10 bg-background/80 border-white/20 text-foreground"
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  type="date" 
                  className="pl-10 bg-background/80 border-white/20 text-foreground"
                />
              </div>
              
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Số khách" 
                  className="pl-10 bg-background/80 border-white/20 text-foreground"
                />
              </div>
              
              <Button className="w-full hero-gradient hover:opacity-90 text-white font-semibold">
                <Search className="mr-2 h-5 w-5" />
                Tìm kiếm
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hero-gradient hover:opacity-90 text-white font-semibold px-8">
              Khám phá ngay
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Xem video giới thiệu
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;