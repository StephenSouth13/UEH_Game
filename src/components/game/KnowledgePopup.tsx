import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface KnowledgePopupProps {
  level: number;
  onContinue: () => void;
}

const KnowledgePopup = ({ level, onContinue }: KnowledgePopupProps) => {
  const knowledgeContent = [
    {
      title: "Email Phishing - Kỹ Thuật Lừa Đảo Phổ Biến",
      content: [
        "🎣 Email phishing là kỹ thuật giả mạo email để đánh cắp thông tin",
        "⚠️ Luôn kiểm tra kỹ địa chỉ email người gửi",
        "🔍 Tìm dấu hiệu nghi ngờ: lỗi chính tả, domain lạ, yêu cầu khẩn cấp",
        "✅ Liên hệ trực tiếp qua kênh chính thức khi nghi ngờ",
        "🛡️ Không bao giờ cung cấp mật khẩu, OTP qua email"
      ],
      links: [
        { text: "Tìm hiểu thêm về Phishing", url: "https://www.cisa.gov/phishing" }
      ]
    },
    {
      title: "Mật Khẩu Mạnh - Tuyến Phòng Thủ Đầu Tiên",
      content: [
        "🔐 Mật khẩu mạnh phải dài ít nhất 12 ký tự",
        "🎲 Kết hợp chữ HOA, thường, số và ký tự đặc biệt",
        "🚫 Tránh sử dụng thông tin cá nhân dễ đoán",
        "🔄 Sử dụng mật khẩu khác nhau cho từng tài khoản",
        "💾 Dùng trình quản lý mật khẩu để lưu trữ an toàn"
      ],
      links: [
        { text: "Tạo mật khẩu mạnh", url: "https://www.security.org/how-secure-is-my-password/" }
      ]
    },
    {
      title: "WiFi Công Cộng - Nguy Hiểm Ẩn Giấu",
      content: [
        "📡 WiFi công cộng dễ bị tấn công Man-in-the-Middle",
        "🔒 Luôn sử dụng VPN khi kết nối WiFi công cộng",
        "🚫 Tránh truy cập tài khoản ngân hàng, email quan trọng",
        "✅ Chỉ truy cập website có HTTPS (khóa xanh)",
        "⚡ Tắt chia sẻ file và AirDrop khi ở nơi công cộng"
      ],
      links: [
        { text: "An toàn với WiFi công cộng", url: "https://www.kaspersky.com/resource-center/preemptive-safety/public-wifi-safety" }
      ]
    },
    {
      title: "Phần Mềm Diệt Virus - Lá Chắn Bảo Vệ",
      content: [
        "🛡️ Antivirus là công cụ thiết yếu cho mọi thiết bị",
        "🔄 Cập nhật định kỳ để phát hiện mối đe dọa mới",
        "⚠️ Không tắt antivirus khi tải file lạ",
        "🔍 Quét định kỳ toàn bộ hệ thống",
        "✅ Nghe theo khuyến nghị của phần mềm về mối đe dọa"
      ],
      links: [
        { text: "Chọn Antivirus phù hợp", url: "https://www.av-test.org/en/antivirus/home-windows/" }
      ]
    }
  ];

  const knowledge = knowledgeContent[level - 1];

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full p-8 bg-card border-2 border-primary/50 neon-border animate-scale-in">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-3xl font-bold text-primary neon-glow mb-2">
            KIẾN THỨC BẢO MẬT
          </h2>
          <p className="text-warning">Level {level} - Hoàn thành xuất sắc!</p>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
            <h3 className="text-xl font-bold text-primary mb-4">
              {knowledge.title}
            </h3>
            
            <ul className="space-y-3">
              {knowledge.content.map((item, index) => (
                <li key={index} className="text-foreground flex items-start">
                  <span className="mr-2 mt-1">{item.split(' ')[0]}</span>
                  <span>{item.substring(item.indexOf(' ') + 1)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
            <p className="text-sm text-accent font-bold mb-2">📖 TÀI LIỆU THAM KHẢO:</p>
            {knowledge.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline text-sm block"
              >
                {link.text} →
              </a>
            ))}
          </div>

          <Button
            onClick={onContinue}
            className="w-full bg-success text-success-foreground hover:bg-success/80 text-xl font-bold py-6 neon-border animate-pulse-glow"
          >
            ⚡ TIẾP TỤC GIẢI CỨU
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Đã tạm dừng bộ đếm thời gian
          </p>
        </div>
      </Card>
    </div>
  );
};

export default KnowledgePopup;
