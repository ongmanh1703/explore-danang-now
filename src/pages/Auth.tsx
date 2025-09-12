import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Mail, Lock, User, Phone, Facebook, Chrome } from 'lucide-react';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg"
              alt="Đăng nhập"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 text-center text-white">
            <Badge className="mb-4 hero-gradient text-white">Tài khoản</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Đăng nhập / Đăng ký
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Tham gia cộng đồng du lịch Đà Nẵng
            </p>
          </div>
        </section>

        {/* Auth Forms */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                  <TabsTrigger value="register">Đăng ký</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Đăng nhập tài khoản</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Social Login */}
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full" size="lg">
                          <Chrome className="h-5 w-5 mr-2" />
                          Đăng nhập với Google
                        </Button>
                        <Button variant="outline" className="w-full" size="lg">
                          <Facebook className="h-5 w-5 mr-2" />
                          Đăng nhập với Facebook
                        </Button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Hoặc
                          </span>
                        </div>
                      </div>

                      {/* Email/Phone Login */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email hoặc số điện thoại</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="email" 
                              type="text" 
                              placeholder="Nhập email hoặc SĐT"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Mật khẩu</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="password" 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Nhập mật khẩu"
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" className="rounded" />
                            <Label htmlFor="remember" className="text-sm">Ghi nhớ đăng nhập</Label>
                          </div>
                          <Button variant="link" className="text-sm p-0">
                            Quên mật khẩu?
                          </Button>
                        </div>

                        <Button className="w-full hero-gradient text-white" size="lg">
                          Đăng nhập
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Tạo tài khoản mới</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Social Register */}
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full" size="lg">
                          <Chrome className="h-5 w-5 mr-2" />
                          Đăng ký với Google
                        </Button>
                        <Button variant="outline" className="w-full" size="lg">
                          <Facebook className="h-5 w-5 mr-2" />
                          Đăng ký với Facebook
                        </Button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Hoặc
                          </span>
                        </div>
                      </div>

                      {/* Manual Register */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullname">Họ và tên</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="fullname" 
                              type="text" 
                              placeholder="Nhập họ và tên"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="register-email" 
                              type="email" 
                              placeholder="Nhập email"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="phone" 
                              type="tel" 
                              placeholder="Nhập số điện thoại"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password">Mật khẩu</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="register-password" 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Nhập mật khẩu"
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="confirm-password" 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Nhập lại mật khẩu"
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="terms" className="rounded" />
                          <Label htmlFor="terms" className="text-sm">
                            Tôi đồng ý với{' '}
                            <Button variant="link" className="text-sm p-0 h-auto">
                              Điều khoản sử dụng
                            </Button>
                            {' '}và{' '}
                            <Button variant="link" className="text-sm p-0 h-auto">
                              Chính sách bảo mật
                            </Button>
                          </Label>
                        </div>

                        <Button className="w-full sunset-gradient text-white" size="lg">
                          Tạo tài khoản
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Forgot Password */}
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Quên mật khẩu?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-center text-muted-foreground text-sm">
                      Nhập email hoặc số điện thoại để nhận mã đặt lại mật khẩu
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email hoặc số điện thoại</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="reset-email" 
                          type="text" 
                          placeholder="Nhập email hoặc SĐT"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button className="w-full hero-gradient text-white">
                      Gửi mã đặt lại
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;