import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Check, X } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, customer: 'Nguyễn Văn A', tour: 'Bà Nà Hills', rating: 5, comment: 'Tour rất tuyệt vời, hướng dẫn viên nhiệt tình!', date: '2025-10-15', status: 'approved' },
    { id: 2, customer: 'Trần Thị B', tour: 'Hội An', rating: 4, comment: 'Địa điểm đẹp, nhưng hơi đông người.', date: '2025-10-14', status: 'pending' },
    { id: 3, customer: 'Lê Văn C', tour: 'Cù Lao Chàm', rating: 5, comment: 'Biển trong xanh, đáng để trải nghiệm!', date: '2025-10-13', status: 'approved' },
    { id: 4, customer: 'Phạm Thị D', tour: 'Sơn Trà', rating: 3, comment: 'Thời gian hơi ngắn.', date: '2025-10-12', status: 'pending' },
  ]);

  // Hàm hiển thị sao
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-sunset text-sunset' : 'text-muted-foreground'}`}
      />
    ));
  };

  // Xử lý khi bấm nút Duyệt
  const handleApprove = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
  };

  // Xử lý khi bấm nút Từ chối
  const handleReject = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Quản lý Đánh giá
          </h2>
          <p className="text-muted-foreground mt-1">
            Quản lý và phê duyệt đánh giá từ khách hàng
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{review.customer}</h3>
                    <Badge variant="outline">{review.tour}</Badge>
                    <Badge
                      variant={
                        review.status === 'approved'
                          ? 'default'
                          : review.status === 'rejected'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {review.status === 'approved'
                        ? 'Đã duyệt'
                        : review.status === 'rejected'
                        ? 'Đã từ chối'
                        : 'Chờ duyệt'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                </div>

                {review.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleApprove(review.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Duyệt
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(review.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Từ chối
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
