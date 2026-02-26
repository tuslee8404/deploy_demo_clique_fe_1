import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "male",
    bio: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

  // ── Xử lý đăng ký ──────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      toast({ title: "Mật khẩu không khớp!", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await register({
        ...form,
        age: Number(form.age),
      });
      toast({
        title: "Đăng ký thành công! 🎉",
        description: "Đang chuyển đến trang đăng nhập...",
      });
      navigate("/login");
    } catch (err: any) {
      toast({
        title: "Đăng ký thất bại",
        description: err?.message || "Vui lòng kiểm tra lại thông tin",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          {/* Header */}
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="gradient-primary rounded-2xl p-3">
              <UserPlus className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Tạo Tài Khoản
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Tham gia Dating App và bắt đầu kết nối
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className={inputClass}
              placeholder="Tên của bạn"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={inputClass}
              type="number"
              placeholder="Tuổi (≥ 18)"
              min={18}
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />
            <select
              className={inputClass}
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <textarea
              className={`${inputClass} min-h-[80px] resize-none`}
              placeholder="Mô tả bản thân..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
            <input
              className={inputClass}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className={inputClass}
              type="password"
              placeholder="Mật khẩu (≥ 8 ký tự, có chữ hoa, chữ thường, số, ký hiệu đặc biệt)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <input
              className={inputClass}
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={form.confirm_password}
              onChange={(e) =>
                setForm({ ...form, confirm_password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full gradient-primary text-primary-foreground rounded-xl py-3 font-semibold hover-scale shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? "Đang xử lý..." : "Đăng ký ngay"}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-primary cursor-pointer hover:underline"
              >
                Đăng nhập
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
