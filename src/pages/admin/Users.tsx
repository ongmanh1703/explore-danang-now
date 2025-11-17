import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye, Mail, Calendar, Activity, UserCircle, Shield, Users as UsersIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  createdAt: string;
  lastLogin?: string;
  totalBookings?: number;
  totalSpent?: number;
  status?: string;
}

const Users = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    // Mock data với thông tin chi tiết
    const mockUsers: UserData[] = [
      {
        _id: "1",
        name: "Nguyễn Văn An",
        email: "admin@danang.vn",
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
        phone: "0901234567",
        address: "123 Đường Bạch Đằng, Đà Nẵng",
        bio: "Quản trị viên hệ thống",
        createdAt: "2024-01-15T08:30:00",
        lastLogin: "2024-03-20T14:25:00",
        totalBookings: 0,
        totalSpent: 0,
        status: "active"
      },
      {
        _id: "2",
        name: "Trần Thị Bình",
        email: "staff@danang.vn",
        role: "staff",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff",
        phone: "0912345678",
        address: "456 Đường Lê Duẩn, Đà Nẵng",
        bio: "Nhân viên quản lý nội dung",
        createdAt: "2024-01-20T09:15:00",
        lastLogin: "2024-03-20T13:45:00",
        totalBookings: 0,
        totalSpent: 0,
        status: "active"
      },
      {
        _id: "3",
        name: "Lê Hoàng Cường",
        email: "cuong.le@gmail.com",
        role: "user",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cuong",
        phone: "0923456789",
        address: "789 Đường Nguyễn Văn Linh, Đà Nẵng",
        bio: "Yêu thích du lịch và khám phá",
        createdAt: "2024-02-05T10:20:00",
        lastLogin: "2024-03-19T16:30:00",
        totalBookings: 5,
        totalSpent: 15000000,
        status: "active"
      },
      {
        _id: "4",
        name: "Phạm Thị Dung",
        email: "dung.pham@yahoo.com",
        role: "user",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dung",
        phone: "0934567890",
        address: "321 Đường Trần Phú, Đà Nẵng",
        bio: "Đam mê ẩm thực và văn hóa địa phương",
        createdAt: "2024-02-10T11:45:00",
        lastLogin: "2024-03-18T09:15:00",
        totalBookings: 3,
        totalSpent: 8500000,
        status: "active"
      },
      {
        _id: "5",
        name: "Võ Minh Hoàng",
        email: "hoang.vo@outlook.com",
        role: "user",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hoang",
        phone: "0945678901",
        address: "654 Đường Hùng Vương, Đà Nẵng",
        createdAt: "2024-02-15T14:30:00",
        lastLogin: "2024-03-15T10:20:00",
        totalBookings: 8,
        totalSpent: 25000000,
        status: "active"
      }
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetail = (user: UserData) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    staff: users.filter(u => u.role === 'staff').length,
    users: users.filter(u => u.role === 'user').length,
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Chưa đăng nhập";
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Quản lý người dùng
        </h2>
        <p className="text-muted-foreground mt-1">
          Quản lý tất cả người dùng trong hệ thống
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tất cả tài khoản
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản trị viên</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.admins}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Quyền quản trị
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhân viên</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.staff}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Quản lý nội dung
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.users}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Khách hàng
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-border/50">
        <CardHeader className="border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-foreground">Danh sách người dùng</CardTitle>
              <CardDescription className="mt-1">
                Xem và quản lý thông tin chi tiết người dùng
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên, email, vai trò..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/40">
                  <TableHead className="font-semibold">Người dùng</TableHead>
                  <TableHead className="font-semibold">Liên hệ</TableHead>
                  <TableHead className="font-semibold text-center">Vai trò</TableHead>
                  <TableHead className="font-semibold text-center">Trạng thái</TableHead>
                  <TableHead className="font-semibold text-center">Ngày tạo</TableHead>
                  <TableHead className="font-semibold text-center">Lần đăng nhập</TableHead>
                  <TableHead className="font-semibold text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{user.name}</div>
                            {user.bio && (
                              <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {user.bio}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-foreground">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="text-xs text-muted-foreground">
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={user.role === "admin" ? "default" : "secondary"}
                          className={
                            user.role === "admin"
                              ? "bg-primary text-primary-foreground"
                              : user.role === "staff"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {user.role === "admin" ? "Quản trị" : user.role === "staff" ? "Nhân viên" : "Người dùng"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                          Hoạt động
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm text-foreground">
                        {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {formatDate(user.lastLogin)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(user)}
                          className="hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Không tìm thấy người dùng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">Chi tiết người dùng</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết và hoạt động của người dùng
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 mt-4">
              {/* User Profile Section */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                        {selectedUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Họ và tên</label>
                        <p className="text-base font-semibold text-foreground">{selectedUser.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <p className="text-sm text-foreground">{selectedUser.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                          <p className="text-sm text-foreground">{selectedUser.phone || "Chưa cập nhật"}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Địa chỉ</label>
                        <p className="text-sm text-foreground">{selectedUser.address || "Chưa cập nhật"}</p>
                      </div>
                      {selectedUser.bio && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Giới thiệu</label>
                          <p className="text-sm text-foreground">{selectedUser.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Thông tin tài khoản</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Vai trò
                      </label>
                      <Badge
                        variant={selectedUser.role === "admin" ? "default" : "secondary"}
                        className={
                          selectedUser.role === "admin"
                            ? "bg-primary text-primary-foreground"
                            : selectedUser.role === "staff"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {selectedUser.role === "admin" ? "Quản trị viên" : selectedUser.role === "staff" ? "Nhân viên" : "Người dùng"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Trạng thái
                      </label>
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                        Hoạt động
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Ngày tạo
                      </label>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(selectedUser.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Lần đăng nhập gần nhất
                      </label>
                      <p className="text-sm font-medium text-foreground">
                        {formatDate(selectedUser.lastLogin)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics (for regular users) */}
              {selectedUser.role === "user" && (
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Thống kê hoạt động</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Tổng số đặt tour</p>
                        <p className="text-2xl font-bold text-foreground">{selectedUser.totalBookings || 0}</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Tổng chi tiêu</p>
                        <p className="text-2xl font-bold text-foreground">
                          {(selectedUser.totalSpent || 0).toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
