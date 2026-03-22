'use client';

import { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameCanvasProps {
  snake: Position[];
  food: Position;
  gridSize: number;
  cellSize: number;
  isGameOver: boolean;
  isPaused: boolean;
}

const GameCanvas = ({ snake, food, gridSize, cellSize, isGameOver, isPaused }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = gridSize * cellSize;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(size, i * cellSize);
      ctx.stroke();
    }

    snake.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      const gradient = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);

      if (index === 0) {
        gradient.addColorStop(0, '#22c55e');
        gradient.addColorStop(1, '#16a34a');
      } else {
        gradient.addColorStop(0, '#16a34a');
        gradient.addColorStop(1, '#15803d');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

      if (index === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x + 2, y + 2, cellSize / 2, cellSize / 2);
      }
    });

    const foodCx = food.x * cellSize + cellSize / 2;
    const foodCy = food.y * cellSize + cellSize / 2;
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(foodCx, foodCy, cellSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    if (isGameOver || isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isGameOver ? 'GAME OVER' : 'PAUSED', size / 2, size / 2);
    }
  }, [snake, food, gridSize, cellSize, isGameOver, isPaused]);

  return (
    <div className="flex justify-center">
      <div className="p-4 bg-card border border-white/10 rounded-2xl">
        <canvas
          ref={canvasRef}
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default GameCanvas;
