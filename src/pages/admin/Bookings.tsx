import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Check,
  X,
  Eye,
  RefreshCcw,
  Search,
  Calendar as CalendarIcon,
  User as UserIcon,
  Phone,
  Users,
  MapPin,
  Clock, // ⬅️ dùng icon số ngày
} from "lucide-react";

type Booking = {
  _id: string;
  tour?: { _id: string; title: string; price?: number; duration?: number; days?: number; durationDays?: number };
  user?: { _id: string; name?: string };
  name: string;
  phone: string;
  bookingDate: string; // ISO date
  people: number;
  note?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;   // ISO date
  duration?: number;   // fallback nếu lưu ở booking
};

const statusColor: Record<Booking["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const currencyVN = (n?: number) =>
  typeof n === "number" ? new Intl.NumberFormat("vi-VN").format(n) + "đ" : "-";

const fmtDate = (d?: string) => {
  if (!d) return "-";
  try {
    const date = new Date(d);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d as string;
  }
};

// Helper lấy số ngày
const getDays = (b: any) =>
  b?.tour?.duration ?? b?.tour?.days ?? b?.tour?.durationDays ?? b?.duration ?? 1;

export default function Bookings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | Booking["status"]>("");
  const [detail, setDetail] = useState<Booking | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Không tải được danh sách đặt tour");
      setBookings(data);
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchText =
        !q ||
        [b.tour?.title, b.user?.name, b.name, b.phone, b.note]
          .filter(Boolean)
          .some((t) => (t as string).toLowerCase().includes(q));
      const matchStatus = !statusFilter || b.status === statusFilter;
      return matchText && matchStatus;
    });
  }, [bookings, query, statusFilter]);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    setBusyId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Cập nhật trạng thái thất bại");
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
      toast({ title: "Đã cập nhật", description: `Đơn #${id.slice(-6)} → ${status}` });
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message });
    } finally {
      setBusyId(null);
    }
  };

  const cancelBooking = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Hủy đơn thất bại");
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b)));
      toast({ title: "Đã hủy đơn", description: `Đơn #${id.slice(-6)} đã chuyển sang Cancelled` });
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Quản lý đặt tour</h1>
          <p className="text-sm text-muted-foreground">
            Xem, xác nhận, hủy và quản trị toàn bộ đơn đặt tour của người dùng.
          </p>
        </div>
        <Button variant="outline" onClick={fetchAll} disabled={loading}>
          <RefreshCcw className="w-4 h-4 mr-2" />
          Tải lại
        </Button>
      </div>

      {/* Thanh công cụ: Tìm kiếm + Lọc */}
      <div className="mb-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="Tìm theo tour / tên / SĐT / ghi chú…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={statusFilter === "" ? "default" : "outline"}
            onClick={() => setStatusFilter("")}
          >
            Tất cả
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => setStatusFilter("pending")}
          >
            Đang chờ
          </Button>
          <Button
            variant={statusFilter === "confirmed" ? "default" : "outline"}
            onClick={() => setStatusFilter("confirmed")}
          >
            Đã xác nhận
          </Button>
          <Button
            variant={statusFilter === "cancelled" ? "default" : "outline"}
            onClick={() => setStatusFilter("cancelled")}
          >
            Đã hủy
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Bảng */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr className="text-gray-600">
                  <th className="px-4 py-3">Đơn</th>
                  <th className="px-4 py-3">Tour</th>
                  <th className="px-4 py-3">Khách đặt</th>
                  <th className="px-4 py-3">Liên hệ</th>
                  <th className="px-4 py-3">Ngày đi</th>
                  <th className="px-4 py-3">SL</th>
                  <th className="px-4 py-3">Tổng</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      Đang tải danh sách…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      Không có đơn nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => {
                    const days = getDays(b);

                    return (
                      <tr key={b._id} className="border-t">
                        <td className="px-4 py-3">
                          <div className="font-medium">#{b._id.slice(-6)}</div>
                          <div className="text-xs text-gray-500">Tạo: {fmtDate(b.createdAt)}</div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-medium line-clamp-1">{b.tour?.title || "-"}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Tour ID: {b.tour?._id || "—"}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{days}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{b.name || b.user?.name || "—"}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{b.phone || "—"}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                            <span>{fmtDate(b.bookingDate)}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>{b.people}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3 font-semibold">
                          {currencyVN((b.tour?.price || 0) * (b.people || 0))}
                        </td>

                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${statusColor[b.status]}`}>
                            {b.status === "pending"
                              ? "Đang chờ"
                              : b.status === "confirmed"
                              ? "Đã xác nhận"
                              : "Đã hủy"}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDetail(b)}
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              disabled={busyId === b._id || b.status === "confirmed"}
                              onClick={() => updateStatus(b._id, "confirmed")}
                              title="Xác nhận"
                            >
                              <Check className="w-4 h-4" />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              disabled={busyId === b._id || b.status === "cancelled"}
                              onClick={() => cancelBooking(b._id)}
                              title="Hủy"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal chi tiết */}
      {detail && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDetail(null)} />
          <div className="absolute left-1/2 top-1/2 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold">Chi tiết đơn #{detail._id.slice(-6)}</h2>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColor[detail.status]}>
                      {detail.status === "pending"
                        ? "Đang chờ"
                        : detail.status === "confirmed"
                        ? "Đã xác nhận"
                        : "Đã hủy"}
                    </Badge>
                    <Button variant="ghost" onClick={() => setDetail(null)}>
                      Đóng
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Tour</div>
                    <div className="font-medium">{detail.tour?.title || "-"}</div>
                    <div className="text-sm">Giá: {currencyVN(detail.tour?.price)}</div>
                    <div className="text-sm">
                      Tổng: {currencyVN((detail.tour?.price || 0) * detail.people)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Khách đặt</div>
                    <div className="font-medium">{detail.name || detail.user?.name || "-"}</div>
                    <div className="text-sm">SĐT: {detail.phone || "-"}</div>
                    <div className="text-sm">Người dùng hệ thống: {detail.user?.name || "—"}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Thông tin chuyến</div>
                    <div className="text-sm">Ngày đi: {fmtDate(detail.bookingDate)}</div>
                    <div className="text-sm">Số người: {detail.people}</div>
                    <div className="text-sm">Tạo lúc: {fmtDate(detail.createdAt)}</div>
                    <div className="text-sm">
                      Số ngày: {getDays(detail)} ngày
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Ghi chú</div>
                    <div className="text-sm whitespace-pre-line border rounded-md p-2 min-h-[60px] bg-muted/30">
                      {detail.note || "(Không có)"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(detail._id, "confirmed")}
                    disabled={busyId === detail._id || detail.status === "confirmed"}
                  >
                    <Check className="w-4 h-4 mr-2" /> Xác nhận
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => cancelBooking(detail._id)}
                    disabled={busyId === detail._id || detail.status === "cancelled"}
                  >
                    <X className="w-4 h-4 mr-2" /> Hủy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
