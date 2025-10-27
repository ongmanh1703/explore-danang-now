import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Compass, Calendar } from "lucide-react";

const Dashboard = () => {
  // 📊 Dữ liệu thống kê mẫu
  const stats = [
    { title: "Tổng người dùng", value: "1,234", icon: Users, trend: "+12%", color: "text-blue-500" },
    { title: "Điểm đến", value: "45", icon: MapPin, trend: "+3", color: "text-green-500" },
    { title: "Tours", value: "89", icon: Compass, trend: "+8", color: "text-orange-500" },
    { title: "Đặt tour", value: "567", icon: Calendar, trend: "+23%", color: "text-sky-500" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4780 },
    { month: "May", revenue: 5890 },
    { month: "Jun", revenue: 6390 },
    { month: "Jul", revenue: 7200 },
  ];

  const userGrowthData = [
    { month: "Jan", users: 100 },
    { month: "Feb", users: 200 },
    { month: "Mar", users: 350 },
    { month: "Apr", users: 500 },
    { month: "May", users: 650 },
    { month: "Jun", users: 800 },
  ];

  const tourDistribution = [
    { name: "Hội An", value: 35 },
    { name: "Bà Nà Hills", value: 25 },
    { name: "Cù Lao Chàm", value: 20 },
    { name: "Sơn Trà", value: 15 },
    { name: "Khác", value: 5 },
  ];

  const pieColors = ["#3b82f6", "#f97316", "#10b981", "#a855f7", "#facc15"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Dashboard
        </h2>
        <p className="text-muted-foreground mt-1">
          Tổng quan hệ thống Đà Nẵng Tourism
        </p>
      </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-semibold">↑ {stat.trend}</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Biểu đồ doanh thu & tăng trưởng người dùng */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Doanh thu */}
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Người dùng mới */}
        <Card>
          <CardHeader>
            <CardTitle>Tăng trưởng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#10b981" barSize={30} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Phân bố tour */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân bố tour theo khu vực</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={tourDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {tourDistribution.map((_, index) => (
                    <Cell key={index} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Người dùng mới đăng ký</p>
                    <p className="text-xs text-muted-foreground">{i} giờ trước</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
