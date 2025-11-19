import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, Check, X, Search, Eye, Trash2, MessageSquare } from 'lucide-react';

interface Comment {
  id: number;
  customer: string;
  email: string;
  tour: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  avatar?: string;
}

const Reviews = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, customer: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', tour: 'Bà Nà Hills', rating: 5, comment: 'Tour rất tuyệt vời, hướng dẫn viên nhiệt tình! Khung cảnh đẹp, đồ ăn ngon. Mình rất hài lòng với chuyến đi này.', date: '2025-10-15', status: 'approved' },
    { id: 2, customer: 'Trần Thị B', email: 'tranthib@gmail.com', tour: 'Hội An', rating: 4, comment: 'Địa điểm đẹp, nhưng hơi đông người. Nên đi vào ngày thường sẽ thoải mái hơn.', date: '2025-10-14', status: 'pending' },
    { id: 3, customer: 'Lê Văn C', email: 'levanc@gmail.com', tour: 'Cù Lao Chàm', rating: 5, comment: 'Biển trong xanh, đáng để trải nghiệm! Hoạt động lặn ngắm san hô rất thú vị.', date: '2025-10-13', status: 'approved' },
    { id: 4, customer: 'Phạm Thị D', email: 'phamthid@gmail.com', tour: 'Sơn Trà', rating: 3, comment: 'Thời gian hơi ngắn. Mong tour có thể kéo dài thêm để khám phá nhiều hơn.', date: '2025-10-12', status: 'pending' },
    { id: 5, customer: 'Hoàng Văn E', email: 'hoangvane@gmail.com', tour: 'Bà Nà Hills', rating: 4, comment: 'Cáp treo dài nhất thế giới rất ấn tượng. Cầu Vàng đẹp như mơ!', date: '2025-10-11', status: 'approved' },
    { id: 6, customer: 'Võ Thị F', email: 'vothif@gmail.com', tour: 'Hội An', rating: 5, comment: 'Phố cổ lung linh về đêm. Thả đèn hoa đăng rất lãng mạn.', date: '2025-10-10', status: 'approved' },
    { id: 7, customer: 'Đặng Văn G', email: 'dangvang@gmail.com', tour: 'Ngũ Hành Sơn', rating: 2, comment: 'Chưa được như kỳ vọng. Nhiều người quá.', date: '2025-10-09', status: 'rejected' },
    { id: 8, customer: 'Bùi Thị H', email: 'buithih@gmail.com', tour: 'Cù Lao Chàm', rating: 5, comment: 'Tuyệt vời! Biển đảo đẹp như tranh vẽ.', date: '2025-10-08', status: 'pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Hàm hiển thị sao
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-sunset text-sunset' : 'text-muted-foreground'}`}
      />
    ));
  };

  const handleApprove = (id: number) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' as const } : c))
    );
  };

  const handleReject = (id: number) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' as const } : c))
    );
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleViewDetail = (comment: Comment) => {
    setSelectedComment(comment);
    setIsDetailOpen(true);
  };

  const filteredComments = comments.filter((comment) => {
    const matchesSearch = 
      comment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: comments.length,
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    rejected: comments.filter(c => c.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Quản lý Bình luận & Đánh giá
          </h2>
          <p className="text-muted-foreground mt-1">
            Quản lý và phê duyệt bình luận, đánh giá từ khách hàng
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bình luận</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã từ chối</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên, tour hoặc nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Đã từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Comments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Bình luận</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy bình luận nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{comment.customer}</div>
                        <div className="text-sm text-muted-foreground">{comment.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{comment.tour}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(comment.rating)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="truncate">{comment.comment}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {comment.date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          comment.status === 'approved'
                            ? 'default'
                            : comment.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {comment.status === 'approved'
                          ? 'Đã duyệt'
                          : comment.status === 'rejected'
                          ? 'Đã từ chối'
                          : 'Chờ duyệt'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewDetail(comment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {comment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleApprove(comment.id)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleReject(comment.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết bình luận</DialogTitle>
            <DialogDescription>
              Xem đầy đủ thông tin bình luận và đánh giá
            </DialogDescription>
          </DialogHeader>
          {selectedComment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Khách hàng
                  </label>
                  <p className="text-lg font-semibold">{selectedComment.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-lg">{selectedComment.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Tour
                  </label>
                  <Badge variant="outline" className="mt-1">{selectedComment.tour}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Ngày đánh giá
                  </label>
                  <p className="text-lg">{selectedComment.date}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Đánh giá
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {renderStars(selectedComment.rating)}
                  </div>
                  <span className="text-lg font-semibold">
                    {selectedComment.rating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Nội dung bình luận
                </label>
                <p className="mt-1 text-base leading-relaxed bg-muted/50 p-4 rounded-lg">
                  {selectedComment.comment}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Trạng thái
                </label>
                <div className="mt-1">
                  <Badge
                    variant={
                      selectedComment.status === 'approved'
                        ? 'default'
                        : selectedComment.status === 'rejected'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {selectedComment.status === 'approved'
                      ? 'Đã duyệt'
                      : selectedComment.status === 'rejected'
                      ? 'Đã từ chối'
                      : 'Chờ duyệt'}
                  </Badge>
                </div>
              </div>

              {selectedComment.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleApprove(selectedComment.id);
                      setIsDetailOpen(false);
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Duyệt bình luận
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      handleReject(selectedComment.id);
                      setIsDetailOpen(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Từ chối
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
