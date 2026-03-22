'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  matches: number;
  isComplete: boolean;
  difficulty: Difficulty;
  bestScores: { easy: number; medium: number; hard: number };
}

const CARD_ICONS = [
  'HeartIcon', 'StarIcon', 'BoltIcon', 'FireIcon',
  'SparklesIcon', 'SunIcon', 'MoonIcon', 'CloudIcon',
  'BeakerIcon', 'CubeIcon', 'GlobeAltIcon', 'RocketLaunchIcon',
];

const DIFFICULTY_SETTINGS: Record<Difficulty, { pairs: number; gridCols: string }> = {
  easy:   { pairs: 6,  gridCols: 'grid-cols-3' },
  medium: { pairs: 8,  gridCols: 'grid-cols-4' },
  hard:   { pairs: 12, gridCols: 'grid-cols-4' },
};

const INITIAL_BEST_SCORES = { easy: 0, medium: 0, hard: 0 };
const LS_KEY = 'memory-cards-scores';

const buildShuffledCards = (difficulty: Difficulty): Card[] => {
  const { pairs } = DIFFICULTY_SETTINGS[difficulty];
  const icons = CARD_ICONS.slice(0, pairs);
  return [...icons, ...icons]
    .map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
};

const MemoryCardGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    matches: 0,
    isComplete: false,
    difficulty: 'medium',
    bestScores: INITIAL_BEST_SCORES,
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const bestScores = JSON.parse(saved);
        setGameState((prev) => ({ ...prev, bestScores }));
      } catch {
        console.error('Failed to load scores');
      }
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(LS_KEY, JSON.stringify(gameState.bestScores));
    }
  }, [gameState.bestScores, isHydrated]);

  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      cards: buildShuffledCards(prev.difficulty),
      flippedCards: [],
      moves: 0,
      matches: 0,
      isComplete: false,
    }));
  }, [gameState.difficulty]);

  const initializeGame = () => {
    setGameState((prev) => ({
      ...prev,
      cards: buildShuffledCards(prev.difficulty),
      flippedCards: [],
      moves: 0,
      matches: 0,
      isComplete: false,
    }));
  };

  const handleCardClick = (cardId: number) => {
    const card = gameState.cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || gameState.flippedCards.length === 2) return;

    const newFlippedCards = [...gameState.flippedCards, cardId];
    const newCards = gameState.cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );

    setGameState((prev) => ({ ...prev, cards: newCards, flippedCards: newFlippedCards }));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard  = newCards.find((c) => c.id === firstId);
      const secondCard = newCards.find((c) => c.id === secondId);

      if (firstCard?.icon === secondCard?.icon) {
        setTimeout(() => {
          setGameState((prev) => {
            const matchedCards = prev.cards.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
            );
            const newMatches  = prev.matches + 1;
            const totalPairs  = DIFFICULTY_SETTINGS[prev.difficulty].pairs;
            const isComplete  = newMatches === totalPairs;
            const newMoves    = prev.moves + 1;

            const bestScores = { ...prev.bestScores };
            if (isComplete) {
              const current = bestScores[prev.difficulty];
              if (current === 0 || newMoves < current) {
                bestScores[prev.difficulty] = newMoves;
              }
            }

            return {
              ...prev,
              cards: matchedCards,
              flippedCards: [],
              moves: newMoves,
              matches: newMatches,
              isComplete,
              bestScores,
            };
          });
        }, 500);
      } else {
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            cards: prev.cards.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            ),
            flippedCards: [],
            moves: prev.moves + 1,
          }));
        }, 1000);
      }
    }
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setGameState((prev) => ({ ...prev, difficulty }));
  };

  const handleResetScores = () => {
    setGameState((prev) => ({ ...prev, bestScores: INITIAL_BEST_SCORES }));
    if (isHydrated) {
      localStorage.setItem(LS_KEY, JSON.stringify(INITIAL_BEST_SCORES));
    }
  };

  if (!isHydrated) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Icon name="PuzzlePieceIcon" size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Memory Cards</h1>
        </div>
        <p className="text-lg text-white/60">Match all pairs to win the game</p>
      </div>

      <GameStats
        moves={gameState.moves}
        matches={gameState.matches}
        totalPairs={DIFFICULTY_SETTINGS[gameState.difficulty].pairs}
        bestScore={gameState.bestScores[gameState.difficulty]}
        onResetScores={handleResetScores}
      />

      <div className="mb-8">
        <GameBoard
          cards={gameState.cards}
          onCardClick={handleCardClick}
          gridCols={DIFFICULTY_SETTINGS[gameState.difficulty].gridCols}
        />
      </div>

      <GameControls
        difficulty={gameState.difficulty}
        isComplete={gameState.isComplete}
        moves={gameState.moves}
        onDifficultyChange={handleDifficultyChange}
        onReset={initializeGame}
      />
    </div>
  );
};

export default MemoryCardGame;
