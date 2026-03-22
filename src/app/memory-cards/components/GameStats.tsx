'use client';

import Icon from '@/components/ui/AppIcon';

interface GameStatsProps {
  moves: number;
  matches: number;
  totalPairs: number;
  bestScore: number;
  onResetScores: () => void;
}

const GameStats = ({ moves, matches, totalPairs, bestScore, onResetScores }: GameStatsProps) => (
  <div className="mb-8">
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="p-6 bg-card border border-white/10 rounded-2xl text-center">
        <div className="text-sm text-white/60 mb-2 uppercase tracking-wider">Moves</div>
        <div className="text-4xl font-bold text-purple-500">{moves}</div>
        <div className="text-xs text-white/40 mt-1">Total</div>
      </div>

      <div className="p-6 bg-card border border-white/10 rounded-2xl text-center">
        <div className="text-sm text-white/60 mb-2 uppercase tracking-wider">Matches</div>
        <div className="text-4xl font-bold text-white">{matches}/{totalPairs}</div>
        <div className="text-xs text-white/40 mt-1">Pairs</div>
      </div>

      <div className="p-6 bg-card border border-white/10 rounded-2xl text-center">
        <div className="text-sm text-white/60 mb-2 uppercase tracking-wider">Best</div>
        <div className="text-4xl font-bold text-purple-500">{bestScore || '-'}</div>
        <div className="text-xs text-white/40 mt-1">Moves</div>
      </div>
    </div>

    <button
      onClick={onResetScores}
      className="w-full py-3 border border-white/10 text-white/60 rounded-xl font-medium hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
    >
      <Icon name="TrashIcon" size={18} />
      Reset Best Scores
    </button>
  </div>
);

export default GameStats;
