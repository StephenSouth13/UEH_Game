import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlayerData } from "@/pages/Index";

interface LoginScreenProps {
  onLoginSuccess: (data: PlayerData) => void;
}

const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [mssv, setMssv] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ mssv?: string; email?: string }>({});

  const validateMSSV = (value: string): string | null => {
    if (!/^\d{11}$/.test(value)) {
      return "MSSV phải là 11 chữ số";
    }
    if (!value.startsWith('3')) {
      return "MSSV phải bắt đầu bằng số 3";
    }
    return null;
  };

  const validateEmail = (value: string, mssvValue: string): string | null => {
    if (!value.endsWith('@st.ueh.edu.vn')) {
      return "Email phải kết thúc bằng @st.ueh.edu.vn";
    }
    
    const emailPrefix = value.split('@')[0];
    if (!emailPrefix.includes(mssvValue)) {
      return `Email phải chứa MSSV (${mssvValue}) trong phần tên`;
    }
    
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { mssv?: string; email?: string } = {};
    
    // Validate MSSV
    const mssvError = validateMSSV(mssv);
    if (mssvError) {
      newErrors.mssv = mssvError;
    }
    
    // Validate Email
    const emailError = validateEmail(email, mssv);
    if (emailError) {
      newErrors.email = emailError;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Success - clear errors and proceed
    setErrors({});
    onLoginSuccess({ mssv, email });
  };

  return (
    <Card className="w-full max-w-md p-8 bg-card border-primary/30 neon-border">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 neon-glow text-primary">
          ZERO HOUR
        </h1>
        <p className="text-xl text-destructive animate-pulse-glow">
          Mạng Lưới Tử Thần
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>⚠️ HỆ THỐNG BẢO MẬT ĐANG BỊ TẤN CÔNG</p>
          <p>Xác thực danh tính để bắt đầu nhiệm vụ giải cứu</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-primary">
            MSSV (Mã Số Sinh Viên)
          </label>
          <Input
            type="text"
            value={mssv}
            onChange={(e) => setMssv(e.target.value)}
            placeholder="31211012345"
            className={`font-mono ${errors.mssv ? 'border-destructive' : 'border-primary/50'}`}
            maxLength={11}
          />
          {errors.mssv && (
            <p className="mt-2 text-sm text-destructive animate-pulse">
              ⚠️ {errors.mssv}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-primary">
            Email UEH
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ten.31211012345@st.ueh.edu.vn"
            className={`font-mono ${errors.email ? 'border-destructive' : 'border-primary/50'}`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-destructive animate-pulse">
              ⚠️ {errors.email}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/80 text-lg font-bold py-6 neon-border animate-pulse-glow"
        >
          🔐 XÁC THỰC & BẮT ĐẦU NHIỆM VỤ
        </Button>
      </form>

      <div className="mt-6 text-xs text-muted-foreground text-center">
        <p>Version 2.1 | Bảo mật Digital</p>
        <p className="text-warning mt-1">Thời gian tối đa: 10 phút</p>
      </div>
    </Card>
  );
};

export default LoginScreen;
