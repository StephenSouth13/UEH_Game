import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameLevel } from "@/pages/Index";

interface GameScreenProps {
  currentLevel: number;
  currentTime: number;
  maxTime: number;
  gameLevel: GameLevel;
  dialogue: string;
  onAnswer: (answer: number) => void;
}

const GameScreen = ({
  currentLevel,
  currentTime,
  maxTime,
  gameLevel,
  dialogue,
  onAnswer
}: GameScreenProps) => {
  const [displayedDialogue, setDisplayedDialogue] = useState("");
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Typewriter effect for dialogue
  useEffect(() => {
    setDisplayedDialogue("");
    setDialogueIndex(0);
  }, [dialogue]);

  useEffect(() => {
    if (dialogueIndex < dialogue.length) {
      const timeout = setTimeout(() => {
        setDisplayedDialogue(prev => prev + dialogue[dialogueIndex]);
        setDialogueIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [dialogue, dialogueIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timePercentage = (currentTime / maxTime) * 100;
  const timeColor = currentTime > 300 ? 'text-success' : currentTime > 120 ? 'text-warning' : 'text-destructive';
  const timerAnimation = currentTime < 120 ? 'animate-danger-pulse' : '';

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header with Timer and Level */}
      <div className="flex justify-between items-center">
        <div className="text-primary neon-glow">
          <span className="text-2xl font-bold">LEVEL {currentLevel}/5</span>
        </div>
        <Card className={`px-6 py-3 bg-card border-2 ${currentTime < 120 ? 'border-destructive' : 'border-primary/50'} ${timerAnimation}`}>
          <div className="text-sm text-muted-foreground">THỜI GIAN CÒN LẠI</div>
          <div className={`text-3xl font-bold font-mono ${timeColor}`}>
            {formatTime(currentTime)}
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${
            currentTime > 300 ? 'bg-success' : 
            currentTime > 120 ? 'bg-warning' : 
            'bg-destructive'
          }`}
          style={{ width: `${timePercentage}%` }}
        />
      </div>

      {/* Dialogue Box */}
      <Card className="p-6 bg-card border-primary/30 neon-border">
        <div className="flex items-start space-x-4">
          <div className="text-4xl">🕵️</div>
          <div className="flex-1">
            <div className="text-sm text-primary font-bold mb-2">HỆ THỐNG AN NINH MẠNG</div>
            <p className="text-foreground font-mono min-h-[60px]">
              {displayedDialogue}
              {dialogueIndex < dialogue.length && <span className="animate-pulse">▊</span>}
            </p>
          </div>
        </div>
      </Card>

      {/* Question Card */}
      <Card className="p-8 bg-card border-2 border-warning/50">
        <div className="mb-6">
          <div className="text-warning text-sm font-bold mb-2">
            ⚠️ CẢNH BÁO: {currentLevel === 5 ? 'QUYẾT ĐỊNH CUỐI CÙNG' : `MỨC ĐỘ ${currentLevel}`}
          </div>
          <h2 className="text-xl text-foreground">
            {gameLevel.question}
          </h2>
        </div>

        <div className="space-y-3">
          {gameLevel.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(index)}
              className="w-full text-left justify-start p-6 text-base bg-secondary hover:bg-primary/20 border border-primary/30 hover:border-primary transition-all"
              variant="outline"
            >
              <span className="font-bold text-primary mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-foreground">{option}</span>
            </Button>
          ))}
        </div>

        {currentLevel === 5 && (
          <div className="mt-6 p-4 bg-destructive/20 border border-destructive rounded-lg animate-pulse">
            <p className="text-destructive font-bold text-center">
              ⚡ CẢNH BÁO: Chọn sai = THẤT BẠI TỨC THỜI!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GameScreen;
