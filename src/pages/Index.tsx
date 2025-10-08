import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import LoginScreen from "@/components/game/LoginScreen";
import GameScreen from "@/components/game/GameScreen";
import GameOverScreen from "@/components/game/GameOverScreen";
import KnowledgePopup from "@/components/game/KnowledgePopup";

const GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
const MAX_TIME = 600; // 10 minutes
const PENALTY_TIME = 120; // 2 minutes

export type GameState = 'login' | 'playing' | 'paused' | 'gameover';
export type ResultType = 'excellent-win' | 'normal-win' | 'timeout-loss' | 'instant-loss';

export interface PlayerData {
  mssv: string;
  email: string;
}

export interface GameLevel {
  question: string;
  options: string[];
  correctAnswer: number;
  dialogue: string;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('login');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentTime, setCurrentTime] = useState(MAX_TIME);
  const [resultType, setResultType] = useState<ResultType | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState("");
  const gameTimerRef = useRef<number | null>(null);

  const gameLevels: GameLevel[] = [
    {
      question: "Bạn nhận được email từ 'admin@ueh-edu.vn' yêu cầu xác thực tài khoản. Hành động nào an toàn nhất?",
      options: [
        "Nhấp vào link trong email ngay lập tức",
        "Kiểm tra domain chính thức và liên hệ trực tiếp qua website",
        "Trả lời email với thông tin cá nhân",
        "Bỏ qua hoàn toàn"
      ],
      correctAnswer: 1,
      dialogue: "Phát hiện tốt! Email phishing thường giả mạo domain. Luôn kiểm tra kỹ địa chỉ gửi và liên hệ trực tiếp qua kênh chính thức."
    },
    {
      question: "Khi tạo mật khẩu mới, phương pháp nào an toàn nhất?",
      options: [
        "Sử dụng tên và ngày sinh",
        "Dùng mật khẩu giống nhau cho nhiều tài khoản",
        "Kết hợp chữ hoa, thường, số, ký tự đặc biệt và dài > 12 ký tự",
        "Lưu mật khẩu trong file text trên máy"
      ],
      correctAnswer: 2,
      dialogue: "Xuất sắc! Mật khẩu mạnh là tuyến phòng thủ đầu tiên. Kết hợp độ phức tạp và độ dài để tăng bảo mật."
    },
    {
      question: "Bạn kết nối WiFi công cộng tại quán cà phê. Điều gì NÊN làm?",
      options: [
        "Đăng nhập ngân hàng online ngay",
        "Sử dụng VPN trước khi truy cập thông tin nhạy cảm",
        "Chia sẻ mật khẩu WiFi với bạn bè",
        "Tắt firewall để tăng tốc độ"
      ],
      correctAnswer: 1,
      dialogue: "Chính xác! WiFi công cộng dễ bị tấn công man-in-the-middle. VPN mã hóa kết nối, bảo vệ dữ liệu của bạn."
    },
    {
      question: "Phần mềm diệt virus báo phát hiện mối đe dọa. Bạn nên?",
      options: [
        "Tắt phần mềm diệt virus vì nó làm chậm máy",
        "Cách ly hoặc xóa file đe dọa theo khuyến nghị",
        "Tiếp tục sử dụng bình thường",
        "Tải thêm nhiều phần mềm diệt virus khác"
      ],
      correctAnswer: 1,
      dialogue: "Đúng vậy! Phần mềm diệt virus là lá chắn quan trọng. Luôn hành động theo khuyến nghị để ngăn chặn malware."
    },
    {
      question: "**QUYẾT ĐỊNH CUỐI CÙNG**: Hệ thống phát hiện truy cập bất thường. Bạn nhận được tin nhắn từ số lạ yêu cầu mã OTP để 'xác minh'. Hành động?",
      options: [
        "Cung cấp mã OTP ngay để bảo vệ tài khoản",
        "BÁO CÁO CHO PHÒNG AN NINH MẠNG & ĐỔI MẬT KHẨU NGAY",
        "Gọi lại số điện thoại đó để xác nhận",
        "Chia sẻ lên mạng xã hội để hỏi ý kiến"
      ],
      correctAnswer: 1,
      dialogue: "XUẤT SẮC! Bạn đã ngăn chặn âm mưu chiếm tài khoản. KHÔNG BAO GIỜ chia sẻ OTP với bất kỳ ai, kể cả người xưng là nhân viên ngân hàng!"
    }
  ];

  const startTimer = () => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }

    gameTimerRef.current = window.setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime <= 1) {
          gameOver('timeout-loss');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }
  };

  const startGame = (data: PlayerData) => {
    setPlayerData(data);
    setGameState('playing');
    setCurrentLevel(1);
    setCurrentTime(MAX_TIME);
    setCurrentDialogue("NHIỆM VỤ BẮT ĐẦU! Hệ thống bảo mật đang bị tấn công. Bạn có 10 phút để ngăn chặn kẻ xâm nhập...");
    startTimer();
  };

  const handleAnswer = (selectedAnswer: number) => {
    const level = gameLevels[currentLevel - 1];
    
    if (selectedAnswer === level.correctAnswer) {
      // Correct answer
      stopTimer();
      setCurrentDialogue(level.dialogue);
      
      if (currentLevel === 5) {
        // Won the game!
        if (currentTime >= 480) {
          gameOver('excellent-win');
        } else {
          gameOver('normal-win');
        }
      } else {
        // Show knowledge popup for levels 1-4
        setShowKnowledge(true);
      }
    } else {
      // Wrong answer
      if (currentLevel === 5) {
        // Instant loss at level 5
        gameOver('instant-loss');
      } else {
        // Penalty for wrong answer
        setCurrentTime(prev => Math.max(0, prev - PENALTY_TIME));
        setCurrentDialogue(`SAI RỒI! Hệ thống mất thêm 2 phút. Hãy thận trọng hơn...`);
      }
    }
  };

  const continueToNextLevel = () => {
    setShowKnowledge(false);
    setCurrentLevel(prev => prev + 1);
    setCurrentDialogue(`Cấp độ ${currentLevel + 1}: Mối đe dọa tiếp theo xuất hiện...`);
    startTimer();
  };

  const gameOver = (type: ResultType) => {
    stopTimer();
    setResultType(type);
    setGameState('gameover');
    
    // Send result to Google Apps Script
    if (playerData) {
      updateGameResult(type);
    }
  };

  const updateGameResult = async (type: ResultType) => {
    try {
      const resultData = {
        mssv: playerData?.mssv,
        email: playerData?.email,
        result: type,
        finalTime: currentTime,
        level: currentLevel,
        timestamp: new Date().toISOString()
      };

      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData)
      });
    } catch (error) {
      console.error('Error updating game result:', error);
    }
  };

  const resetGame = () => {
    setGameState('login');
    setPlayerData(null);
    setCurrentLevel(1);
    setCurrentTime(MAX_TIME);
    setResultType(null);
    setShowKnowledge(false);
    setCurrentDialogue("");
    stopTimer();
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {gameState === 'login' && (
        <LoginScreen onLoginSuccess={startGame} />
      )}

      {gameState === 'playing' && (
        <GameScreen
          currentLevel={currentLevel}
          currentTime={currentTime}
          maxTime={MAX_TIME}
          gameLevel={gameLevels[currentLevel - 1]}
          dialogue={currentDialogue}
          onAnswer={handleAnswer}
        />
      )}

      {gameState === 'gameover' && resultType && (
        <GameOverScreen
          resultType={resultType}
          finalTime={currentTime}
          onRestart={resetGame}
        />
      )}

      {showKnowledge && (
        <KnowledgePopup
          level={currentLevel}
          onContinue={continueToNextLevel}
        />
      )}
    </div>
  );
};

export default Index;
