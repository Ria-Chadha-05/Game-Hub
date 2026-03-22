'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';

type Player = 'X' | 'O' | null;
type Board = Player[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  isDraw: boolean;
  scores: { X: number; O: number; draws: number };
}

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const INITIAL_SCORES = { X: 0, O: 0, draws: 0 };

const checkWinner = (board: Board): Player => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const TicTacToeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    scores: INITIAL_SCORES,
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const savedScores = localStorage.getItem('tictactoe-scores');
    if (savedScores) {
      try {
        const scores = JSON.parse(savedScores);
        setGameState((prev) => ({ ...prev, scores }));
      } catch {
        console.error('Failed to load scores');
      }
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('tictactoe-scores', JSON.stringify(gameState.scores));
    }
  }, [gameState.scores, isHydrated]);

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const winner = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every((cell) => cell !== null);

    const newScores = { ...gameState.scores };
    if (winner) newScores[winner]++;
    else if (isDraw) newScores.draws++;

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      isDraw,
      scores: newScores,
    });
  };

  const handleReset = () => {
    setGameState((prev) => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
    }));
  };

  const handleResetScores = () => {
    setGameState((prev) => ({ ...prev, scores: INITIAL_SCORES }));
    if (isHydrated) {
      localStorage.setItem('tictactoe-scores', JSON.stringify(INITIAL_SCORES));
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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Icon name="XMarkIcon" size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Tic Tac Toe</h1>
        </div>
        <p className="text-lg text-white/60">Challenge a friend in this classic strategy game</p>
      </div>

      <GameStats scores={gameState.scores} onResetScores={handleResetScores} />

      <div className="mb-8">
        <GameBoard board={gameState.board} onCellClick={handleCellClick} winner={gameState.winner} />
      </div>

      <GameControls
        currentPlayer={gameState.currentPlayer}
        winner={gameState.winner}
        isDraw={gameState.isDraw}
        onReset={handleReset}
      />
    </div>
  );
};

export default TicTacToeGame;
