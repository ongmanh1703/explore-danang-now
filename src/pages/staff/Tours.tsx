import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Compass } from 'lucide-react';

const StaffTours = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tours = [
    { id: 1, name: 'Bà Nà Hills Adventure', price: '1,200,000', duration: '1 ngày', status: 'published' },
    { id: 2, name: 'Hội An Ancient Town', price: '800,000', duration: '1 ngày', status: 'published' },
    { id: 3, name: 'Cù Lao Chàm Island', price: '1,500,000', duration: '1 ngày', status: 'draft' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý Tours</h2>
          <p className="text-muted-foreground">Quản lý các tour được giao</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm tour
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tour..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {tours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-tropical to-accent" />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{tour.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Compass className="h-3 w-3" />
                        {tour.duration}
                      </p>
                    </div>
                    <Badge variant={tour.status === 'published' ? 'default' : 'secondary'}>
                      {tour.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-ocean">{tour.price} ₫</span>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTours;
