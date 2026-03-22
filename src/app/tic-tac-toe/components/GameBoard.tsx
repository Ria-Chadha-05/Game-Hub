'use client';

import Icon from '@/components/ui/AppIcon';

type Player = 'X' | 'O' | null;

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  winner: Player;
}

const GameBoard = ({ board, onCellClick, winner }: GameBoardProps) => (
  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
    {board.map((cell, index) => (
      <button
        key={`cell_${index}`}
        onClick={() => onCellClick(index)}
        disabled={!!cell || !!winner}
        className={`aspect-square bg-card border-2 rounded-2xl flex items-center justify-center text-5xl font-bold transition-all duration-300 ${
          cell
            ? 'border-white/20 bg-white/5'
            : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer'
        } ${winner && cell ? 'animate-pulse-glow' : ''} disabled:cursor-not-allowed`}
      >
        {cell === 'X' && <Icon name="XMarkIcon" size={64} className="text-blue-500" />}
        {cell === 'O' && <div className="w-16 h-16 border-8 border-blue-500 rounded-full" />}
      </button>
    ))}
  </div>
);

export default GameBoard;
