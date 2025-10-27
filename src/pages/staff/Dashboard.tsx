import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Newspaper, TrendingUp } from 'lucide-react';

const StaffDashboard = () => {
  const stats = [
    {
      title: 'Tours được giao',
      value: '12',
      icon: Compass,
      trend: '+2',
      color: 'text-tropical',
    },
    {
      title: 'Bài viết',
      value: '24',
      icon: Newspaper,
      trend: '+5',
      color: 'text-ocean',
    },
    {
      title: 'Lượt xem',
      value: '3,456',
      icon: TrendingUp,
      trend: '+234',
      color: 'text-sunset',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Tổng quan công việc của bạn</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-tropical">↑ {stat.trend}</span> tuần này
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Công việc gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Cập nhật tour Bà Nà Hills', time: '2 giờ trước' },
              { action: 'Đăng bài viết mới', time: '5 giờ trước' },
              { action: 'Chỉnh sửa tour Hội An', time: '1 ngày trước' },
              { action: 'Trả lời đánh giá khách hàng', time: '2 ngày trước' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-ocean" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
