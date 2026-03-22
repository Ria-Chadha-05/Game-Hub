'use client';

import Icon from '@/components/ui/AppIcon';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameControlsProps {
  difficulty: Difficulty;
  isComplete: boolean;
  moves: number;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
}

const difficulties: { value: Difficulty; label: string; pairs: number }[] = [
  { value: 'easy',   label: 'Easy',   pairs: 6  },
  { value: 'medium', label: 'Medium', pairs: 8  },
  { value: 'hard',   label: 'Hard',   pairs: 12 },
];

const GameControls = ({ difficulty, isComplete, moves, onDifficultyChange, onReset }: GameControlsProps) => (
  <div className="text-center space-y-6">
    <div className="p-6 bg-card border border-white/10 rounded-2xl">
      <div className="text-sm text-white/60 mb-4 uppercase tracking-wider">Difficulty Level</div>
      <div className="flex gap-3 justify-center">
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            onClick={() => onDifficultyChange(diff.value)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              difficulty === diff.value
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div>{diff.label}</div>
            <div className="text-xs opacity-75">{diff.pairs} pairs</div>
          </button>
        ))}
      </div>
    </div>

    <div className="p-6 bg-card border border-white/10 rounded-2xl">
      {isComplete ? (
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">🎉 Congratulations!</div>
          <p className="text-white/60">You completed the game in {moves} moves!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-2xl font-bold text-white">
            <span className="text-purple-500">Find All Pairs</span>
          </div>
          <p className="text-white/60">Click cards to flip and match them</p>
        </div>
      )}
    </div>

    <button
      onClick={onReset}
      className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all hover:shadow-2xl hover:shadow-purple-500/50"
    >
      <span className="flex items-center gap-2 justify-center">
        <Icon name="ArrowPathIcon" size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        New Game
      </span>
    </button>
  </div>
);

export default GameControls;
