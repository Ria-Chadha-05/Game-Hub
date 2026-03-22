'use client';

import Icon from '@/components/ui/AppIcon';

interface GameControlsProps {
  isPlaying: boolean;
  isGameOver: boolean;
  onStart: () => void;
  onReset: () => void;
}

const HOW_TO_PLAY = [
  'Click on moles as they appear from the holes',
  'Each hit scores 10 points',
  'You have 30 seconds to score as high as possible',
  'Moles disappear after 1 second — be quick!',
];

const GameControls = ({ isPlaying, isGameOver, onStart, onReset }: GameControlsProps) => (
  <div className="text-center space-y-6">
    {isGameOver && (
      <div className="p-6 bg-card border border-white/10 rounded-2xl mb-6">
        <div className="text-3xl font-bold text-white mb-2">🎉 Game Over!</div>
        <p className="text-white/60">Great reflexes! Ready for another round?</p>
      </div>
    )}

    <div className="flex items-center justify-center gap-4">
      {!isPlaying && !isGameOver && (
        <button
          onClick={onStart}
          className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:scale-105 transition-all hover:shadow-2xl hover:shadow-amber-500/50"
        >
          <span className="flex items-center gap-2">
            <Icon name="PlayIcon" size={20} />
            Start Game
          </span>
        </button>
      )}

      {(isPlaying || isGameOver) && (
        <button
          onClick={onReset}
          className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:scale-105 transition-all hover:shadow-2xl hover:shadow-amber-500/50"
        >
          <span className="flex items-center gap-2">
            <Icon name="ArrowPathIcon" size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            {isGameOver ? 'Play Again' : 'Reset Game'}
          </span>
        </button>
      )}
    </div>

    {!isPlaying && !isGameOver && (
      <div className="p-6 bg-card border border-white/10 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-3">How to Play</h3>
        <ul className="text-sm text-white/60 space-y-2 text-left max-w-md mx-auto">
          {HOW_TO_PLAY.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default GameControls;
