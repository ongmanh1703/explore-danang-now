// frontend/src/components/admin/PostManager.tsx
import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X, ImagePlus, Film } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const categoryLabels = {
  am_thuc: "Ẩm thực",
  tin_tuc: "Tin tức",
  kham_pha: "Khám phá",
};

const getYouTubeEmbed = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const PostManager = ({ category }: { category: 'am_thuc' | 'tin_tuc' | 'kham_pha' }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "", content: "", images: [] as File[], videoUrl: "", 
    place: "", price: "", status: "draft" as "draft" | "published"
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const API_URL = "/api/posts";
  const token = localStorage.getItem('token');
  const BACKEND_URL = "http://localhost:5000"; // ĐỔI NẾU CẦN

  useEffect(() => {
    fetchPosts();
    return () => {
      imagePreviews.forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    };
  }, [category]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}?category=${category}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      toast({ title: "Lỗi", description: "Không thể tải bài viết", variant: "destructive" });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const url = imagePreviews[index];
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const openDialog = (post = null) => {
    setEditingPost(post);
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        images: [],
        videoUrl: post.videoUrl || "",
        place: post.place || "",
        price: post.price?.toString() || "",
        status: post.status || "draft"
      });

      // THÊM DOMAIN CHO ẢNH CŨ
      const fullImageUrls = (post.images || []).map((img: string) =>
        img.startsWith('http') ? img : `${BACKEND_URL}${img}`
      );
      setImagePreviews(fullImageUrls);
    } else {
      setFormData({ title: "", content: "", images: [], videoUrl: "", place: "", price: "", status: "draft" });
      setImagePreviews([]);
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({ title: "Lỗi", description: "Vui lòng nhập tiêu đề và nội dung", variant: "destructive" });
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("category", category);
    form.append("status", formData.status);
    if (formData.place) form.append("place", formData.place);
    if (formData.price) form.append("price", formData.price);
    if (formData.videoUrl) form.append("videoUrl", formData.videoUrl);
    formData.images.forEach(file => form.append("images", file));

    try {
      const url = editingPost ? `${API_URL}/${editingPost._id}` : API_URL;
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });

      if (res.ok) {
        toast({ title: editingPost ? "Cập nhật thành công!" : "Thêm thành công!" });
        fetchPosts();
        setOpen(false);
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.message, variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Lỗi mạng", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa bài viết này?")) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "Đã xóa!" });
      fetchPosts();
    } catch (err) {
      toast({ title: "Lỗi xóa", variant: "destructive" });
    }
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showVideo = ['am_thuc', 'kham_pha'].includes(category);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center border-b pb-3">
        <div>
          <h2 className="text-3xl font-bold">Quản lý {categoryLabels[category]}</h2>
          <p className="text-muted-foreground">Quản lý bài viết {categoryLabels[category].toLowerCase()}</p>
        </div>
        <Button onClick={() => openDialog()}><Plus className="mr-2 h-4 w-4" /> Thêm bài</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                {category === 'kham_pha' && <TableHead>Địa điểm</TableHead>}
                {showVideo && <TableHead>Video</TableHead>}
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    Không có bài viết nào
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(post => (
                  <TableRow key={post._id}>
                    {/* ẢNH TRONG BẢNG */}
                    <TableCell>
                      {post.images && post.images.length > 0 ? (
                        <div className="flex gap-1">
                          {post.images.slice(0, 1).map((img: string, i: number) => (
                            <img 
                              key={i}
                              src={img.startsWith('http') ? img : `${BACKEND_URL}${img}`} 
                              alt={post.title} 
                              className="w-12 h-12 object-cover rounded border"
                            />
                          ))}
                          {post.images.length > 1 && (
                            <span className="text-xs self-center text-muted-foreground">
                              +{post.images.length - 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    <TableCell className="font-medium">{post.title}</TableCell>
                    {category === 'kham_pha' && (
                      <TableCell>{post.place || '—'}</TableCell>
                    )}
                    {showVideo && (
                      <TableCell>
                        {post.videoUrl ? (
                          <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                            <Film className="h-3 w-3" /> Xem
                          </a>
                        ) : <span className="text-muted-foreground">—</span>}
                      </TableCell>
                    )}
                    <TableCell>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(post._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Sửa bài viết" : "Thêm bài viết mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Tiêu đề</Label>
              <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
            </div>

            <div>
              <Label>Nội dung</Label>
              <Textarea
                className="min-h-[150px]"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            {category === 'am_thuc' && (
              <div>
                <Label>Giá (VNĐ)</Label>
                <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
              </div>
            )}

            {category === 'kham_pha' && (
              <div>
                <Label>Tên địa điểm</Label>
                <Input
                  placeholder="Ví dụ: Bà Nà Hills, Hội An, Cầu Rồng..."
                  value={formData.place}
                  onChange={e => setFormData({ ...formData, place: e.target.value })}
                />
              </div>
            )}

            {showVideo && (
              <div>
                <Label>Video YouTube URL</Label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                />
                {formData.videoUrl && getYouTubeEmbed(formData.videoUrl) && (
                  <iframe
                    className="w-full h-64 mt-2 rounded"
                    src={getYouTubeEmbed(formData.videoUrl)}
                    title="Preview"
                    allowFullScreen
                  />
                )}
              </div>
            )}

            {/* ẢNH TRONG DIALOG */}
            <div>
              <Label>Hình ảnh</Label>
              <div className="flex flex-wrap gap-2">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img 
                      src={src} 
                      alt="" 
                      className="w-20 h-20 object-cover rounded border" 
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <label className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-muted">
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <Label>Trạng thái</Label>
              <select
                className="w-full border rounded-md p-2"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
              >
                <option value="draft">Nháp</option>
                <option value="published">Đã xuất bản</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostManager;