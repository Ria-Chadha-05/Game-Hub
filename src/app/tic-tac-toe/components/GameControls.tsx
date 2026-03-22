'use client';

import Icon from '@/components/ui/AppIcon';

interface GameControlsProps {
  isGameOver: boolean;
  isPaused: boolean;
  onReset: () => void;
  onTogglePause: () => void;
}

const GameControls = ({ isGameOver, isPaused, onReset, onTogglePause }: GameControlsProps) => (
  <div className="space-y-6">
    <div className="flex items-center justify-center gap-4">
      {!isGameOver && (
        <button
          onClick={onTogglePause}
          className="px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-all flex items-center gap-2"
        >
          <Icon name={isPaused ? 'PlayIcon' : 'PauseIcon'} size={20} />
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      )}

      <button
        onClick={onReset}
        className="group px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:scale-105 transition-all hover:shadow-2xl hover:shadow-green-500/50"
      >
        <span className="flex items-center gap-2">
          <Icon name="ArrowPathIcon" size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          {isGameOver ? 'Play Again' : 'Restart'}
        </span>
      </button>
    </div>

    <div className="p-6 bg-card border border-white/10 rounded-2xl">
      <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
        {[
          { keys: ['↑', 'W'], label: 'Move Up' },
          { keys: ['↓', 'S'], label: 'Move Down' },
          { keys: ['←', 'A'], label: 'Move Left' },
          { keys: ['→', 'D'], label: 'Move Right' },
        ].map(({ keys, label }) => (
          <div key={label} className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{keys[0]}</kbd>
            <span>or</span>
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{keys[1]}</kbd>
            <span>{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 col-span-2">
          <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">Space</kbd>
          <span>Pause/Resume</span>
        </div>
      </div>
    </div>
  </div>
);

export default GameControls;
