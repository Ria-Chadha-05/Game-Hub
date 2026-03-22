'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';
import GameCanvas from './GameCanvas';
import GameControls from './GameControls';
import GameStats from './GameStats';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  isGameOver: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 15 };

const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
  return newFood;
};

const SnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    isGameOver: false,
    isPaused: false,
    score: 0,
    highScore: 0,
  });

  const [isHydrated, setIsHydrated] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    const savedHighScore = localStorage.getItem('snake-highscore');
    if (savedHighScore) {
      setGameState((prev) => ({ ...prev, highScore: parseInt(savedHighScore, 10) }));
    }
  }, []);

  useEffect(() => {
    if (isHydrated && gameState.score > gameState.highScore) {
      localStorage.setItem('snake-highscore', gameState.score.toString());
      setGameState((prev) => ({ ...prev, highScore: gameState.score }));
    }
  }, [gameState.score, gameState.highScore, isHydrated]);

  const moveSnake = useCallback(() => {
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev;

      const head = { ...prev.snake[0] };
      switch (prev.nextDirection) {
        case 'UP':    head.y -= 1; break;
        case 'DOWN':  head.y += 1; break;
        case 'LEFT':  head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return { ...prev, isGameOver: true };
      }

      if (prev.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        return { ...prev, isGameOver: true };
      }

      const newSnake = [head, ...prev.snake];

      if (head.x === prev.food.x && head.y === prev.food.y) {
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(newSnake),
          score: prev.score + 10,
          direction: prev.nextDirection,
        };
      }

      newSnake.pop();
      return { ...prev, snake: newSnake, direction: prev.nextDirection };
    });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      setGameState((prev) => {
        const { direction } = prev;

        if ((e.key === 'ArrowUp'    || e.key === 'w') && direction !== 'DOWN')  return { ...prev, nextDirection: 'UP' };
        if ((e.key === 'ArrowDown'  || e.key === 's') && direction !== 'UP')    return { ...prev, nextDirection: 'DOWN' };
        if ((e.key === 'ArrowLeft'  || e.key === 'a') && direction !== 'RIGHT') return { ...prev, nextDirection: 'LEFT' };
        if ((e.key === 'ArrowRight' || e.key === 'd') && direction !== 'LEFT')  return { ...prev, nextDirection: 'RIGHT' };
        if (e.key === ' ') {
          e.preventDefault();
          return { ...prev, isPaused: !prev.isPaused };
        }

        return prev;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHydrated, gameState.isGameOver]);

  useEffect(() => {
    if (!isHydrated) return;

    const speed = Math.max(50, INITIAL_SPEED - Math.floor(gameState.score / 50) * 10);
    gameLoopRef.current = setInterval(moveSnake, speed);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isHydrated, gameState.isGameOver, gameState.isPaused, gameState.nextDirection, gameState.score, moveSnake]);

  const handleReset = () => {
    setGameState((prev) => ({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      isGameOver: false,
      isPaused: false,
      score: 0,
      highScore: prev.highScore,
    }));
  };

  const handleTogglePause = () => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  if (!isHydrated) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 border-4 border-success border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <Icon name="ArrowPathIcon" size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Snake Game</h1>
        </div>
        <p className="text-lg text-white/60">Use arrow keys or WASD to control the snake</p>
      </div>

      <GameStats score={gameState.score} highScore={gameState.highScore} />

      <div className="mb-8">
        <GameCanvas
          snake={gameState.snake}
          food={gameState.food}
          gridSize={GRID_SIZE}
          cellSize={CELL_SIZE}
          isGameOver={gameState.isGameOver}
          isPaused={gameState.isPaused}
        />
      </div>

      <GameControls
        isGameOver={gameState.isGameOver}
        isPaused={gameState.isPaused}
        onReset={handleReset}
        onTogglePause={handleTogglePause}
      />
    </div>
  );
};

export default SnakeGame;
