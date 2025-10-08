import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultType } from "@/pages/Index";

interface GameOverScreenProps {
  resultType: ResultType;
  finalTime: number;
  onRestart: () => void;
}

const GameOverScreen = ({ resultType, finalTime, onRestart }: GameOverScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (resultType === 'excellent-win') {
      setShowConfetti(true);
      createConfetti();
    }
  }, [resultType]);

  const createConfetti = () => {
    const colors = ['#00ffff', '#ffff00', '#ff00ff', '#00ff00', '#ff0000'];
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
      confettiContainer.appendChild(confetti);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getResultConfig = () => {
    switch (resultType) {
      case 'excellent-win':
        return {
          title: '🏆 THẮNG XUẤT SẮC! 🏆',
          message: 'BẠN ĐÃ HOÀN THÀNH NHIỆM VỤ MỘT CÁCH XUẤT SẮC!',
          description: 'Hệ thống an ninh mạng đã được bảo vệ. Kẻ xâm nhập đã bị truy tìm và vô hiệu hóa. Với tốc độ và kiến thức của bạn, bạn thực sự là một chuyên gia bảo mật!',
          emoji: '🎖️',
          bgColor: 'bg-warning/20',
          borderColor: 'border-warning',
          textColor: 'text-warning',
          glowClass: 'animate-pulse-glow'
        };
      case 'normal-win':
        return {
          title: '✅ NHIỆM VỤ HOÀN THÀNH',
          message: 'BẠN ĐÃ CỨU MẠNG!',
          description: 'Dù áp lực, bạn vẫn hoàn thành nhiệm vụ. Hệ thống an toàn. Nhưng còn rất nhiều điều cần học về bảo mật!',
          emoji: '🛡️',
          bgColor: 'bg-success/20',
          borderColor: 'border-success',
          textColor: 'text-success',
          glowClass: ''
        };
      case 'timeout-loss':
        return {
          title: '⏰ HẾT THỜI GIAN',
          message: 'QUÁ MUỘN...',
          description: 'Thời gian đã hết. Kẻ xâm nhập đã truy cập được dữ liệu quan trọng và biến mất. Hệ thống bị tổn hại nghiêm trọng. Hãy học hỏi và chuẩn bị tốt hơn cho lần sau!',
          emoji: '💀',
          bgColor: 'bg-muted/20',
          borderColor: 'border-muted',
          textColor: 'text-muted-foreground',
          glowClass: ''
        };
      case 'instant-loss':
        return {
          title: '❌ THẤT BẠI TỨC THỜI',
          message: 'KẺ XẤU ĐÃ THOÁT!',
          description: 'Quyết định sai lầm! Kẻ xâm nhập đã tận dụng kẽ hở, xóa dấu vết và cao chạy xa bay với dữ liệu nhạy cảm. Đây là bài học đau đớn về tầm quan trọng của mỗi quyết định trong bảo mật!',
          emoji: '💥',
          bgColor: 'bg-destructive/20',
          borderColor: 'border-destructive',
          textColor: 'text-destructive',
          glowClass: 'animate-danger-pulse'
        };
    }
  };

  const config = getResultConfig();

  return (
    <>
      {showConfetti && <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50" />}
      
      <Card className={`w-full max-w-2xl p-12 ${config.bgColor} border-2 ${config.borderColor} ${config.glowClass}`}>
        <div className="text-center space-y-6">
          <div className="text-8xl mb-4 animate-bounce">
            {config.emoji}
          </div>
          
          <h1 className={`text-4xl font-bold ${config.textColor} neon-glow`}>
            {config.title}
          </h1>
          
          <p className={`text-2xl font-bold ${config.textColor}`}>
            {config.message}
          </p>
          
          <div className="py-6 px-8 bg-card/50 rounded-lg border border-border">
            <p className="text-foreground text-lg leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 py-6">
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="text-sm text-muted-foreground">THỜI GIAN CÒN LẠI</div>
              <div className="text-2xl font-bold text-primary font-mono">
                {formatTime(finalTime)}
              </div>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="text-sm text-muted-foreground">KẾT QUẢ</div>
              <div className={`text-2xl font-bold ${config.textColor}`}>
                {resultType === 'excellent-win' || resultType === 'normal-win' ? 'THẮNG' : 'THUA'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6">
            <Button
              onClick={onRestart}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80 text-xl font-bold py-6 neon-border"
            >
              🔄 THỬ LẠI
            </Button>
            
            <p className="text-sm text-muted-foreground">
              "Mỗi thất bại là một bài học. Mỗi thành công là một cột mốc."
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default GameOverScreen;
