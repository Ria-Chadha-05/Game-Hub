'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';

interface Mole {
  id: number;
  isActive: boolean;
  isHit: boolean;
}

interface GameState {
  moles: Mole[];
  score: number;
  highScore: number;
  timeLeft: number;
  isPlaying: boolean;
  isGameOver: boolean;
}

const GAME_DURATION = 30;
const MOLE_COUNT = 9;
const MOLE_APPEAR_INTERVAL = 800;
const MOLE_VISIBLE_DURATION = 1000;
const LS_KEY = 'whack-highscore';

const createMoles = (): Mole[] =>
  Array.from({ length: MOLE_COUNT }, (_, i) => ({ id: i, isActive: false, isHit: false }));

const WhackAMoleGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    moles: createMoles(),
    score: 0,
    highScore: 0,
    timeLeft: GAME_DURATION,
    isPlaying: false,
    isGameOver: false,
  });

  const [isHydrated, setIsHydrated] = useState(false);
  const moleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      setGameState((prev) => ({ ...prev, highScore: parseInt(saved, 10) }));
    }
  }, []);

  useEffect(() => {
    if (isHydrated && gameState.score > gameState.highScore) {
      localStorage.setItem(LS_KEY, gameState.score.toString());
      setGameState((prev) => ({ ...prev, highScore: gameState.score }));
    }
  }, [gameState.score, gameState.highScore, isHydrated]);

  const activateRandomMole = useCallback(() => {
    setGameState((prev) => {
      const inactiveMoles = prev.moles.filter((m) => !m.isActive);
      if (inactiveMoles.length === 0) return prev;

      const randomMole = inactiveMoles[Math.floor(Math.random() * inactiveMoles.length)];
      const newMoles = prev.moles.map((m) =>
        m.id === randomMole.id ? { ...m, isActive: true, isHit: false } : m
      );

      setTimeout(() => {
        setGameState((state) => ({
          ...state,
          moles: state.moles.map((m) =>
            m.id === randomMole.id ? { ...m, isActive: false } : m
          ),
        }));
      }, MOLE_VISIBLE_DURATION);

      return { ...prev, moles: newMoles };
    });
  }, []);

  useEffect(() => {
    if (!isHydrated || !gameState.isPlaying) return;

    moleTimerRef.current = setInterval(activateRandomMole, MOLE_APPEAR_INTERVAL);

    gameTimerRef.current = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;
        if (newTimeLeft <= 0) {
          return { ...prev, timeLeft: 0, isPlaying: false, isGameOver: true };
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => {
      if (moleTimerRef.current) clearInterval(moleTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [isHydrated, gameState.isPlaying, activateRandomMole]);

  const handleMoleClick = (moleId: number) => {
    setGameState((prev) => {
      const mole = prev.moles.find((m) => m.id === moleId);
      if (!mole || !mole.isActive || mole.isHit) return prev;

      return {
        ...prev,
        moles: prev.moles.map((m) => m.id === moleId ? { ...m, isHit: true } : m),
        score: prev.score + 10,
      };
    });
  };

  const handleStart = () => {
    setGameState((prev) => ({
      moles: createMoles(),
      score: 0,
      highScore: prev.highScore,
      timeLeft: GAME_DURATION,
      isPlaying: true,
      isGameOver: false,
    }));
  };

  const handleReset = () => {
    setGameState((prev) => ({
      moles: createMoles(),
      score: 0,
      highScore: prev.highScore,
      timeLeft: GAME_DURATION,
      isPlaying: false,
      isGameOver: false,
    }));
  };

  if (!isHydrated) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 border-4 border-warning border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <Icon name="BoltIcon" size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Whack A Mole</h1>
        </div>
        <p className="text-lg text-white/60">Click the moles as fast as you can!</p>
      </div>

      <GameStats
        score={gameState.score}
        highScore={gameState.highScore}
        timeLeft={gameState.timeLeft}
      />

      <div className="mb-8">
        <GameBoard moles={gameState.moles} onMoleClick={handleMoleClick} />
      </div>

      <GameControls
        isPlaying={gameState.isPlaying}
        isGameOver={gameState.isGameOver}
        onStart={handleStart}
        onReset={handleReset}
      />
    </div>
  );
};

export default WhackAMoleGame;
