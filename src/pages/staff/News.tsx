import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const StaffNews = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const news = [
    { id: 1, title: 'Lễ hội pháo hoa quốc tế 2025', date: '2025-10-12', status: 'published', views: 1234 },
    { id: 2, title: 'Khai trương khu du lịch mới', date: '2025-10-14', status: 'draft', views: 0 },
    { id: 3, title: 'Top 10 món ăn đặc sản Đà Nẵng', date: '2025-10-10', status: 'published', views: 2341 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý Tin tức</h2>
          <p className="text-muted-foreground">Quản lý bài viết của bạn</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm tin tức
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Lượt xem</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.views}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                      {item.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffNews;
