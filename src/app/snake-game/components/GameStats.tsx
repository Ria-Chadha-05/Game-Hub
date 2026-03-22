'use client';

interface GameStatsProps {
  score: number;
  highScore: number;
}

const GameStats = ({ score, highScore }: GameStatsProps) => (
  <div className="grid grid-cols-2 gap-4 mb-8">
    <div className="p-6 bg-card border border-white/10 rounded-2xl text-center">
      <div className="text-sm text-white/60 mb-2 uppercase tracking-wider">Score</div>
      <div className="text-4xl font-bold text-green-500">{score}</div>
      <div className="text-xs text-white/40 mt-1">Current Game</div>
    </div>

    <div className="p-6 bg-card border border-white/10 rounded-2xl text-center">
      <div className="text-sm text-white/60 mb-2 uppercase tracking-wider">High Score</div>
      <div className="text-4xl font-bold text-white">{highScore}</div>
      <div className="text-xs text-white/40 mt-1">Best Record</div>
    </div>
  </div>
);

export default GameStats;
