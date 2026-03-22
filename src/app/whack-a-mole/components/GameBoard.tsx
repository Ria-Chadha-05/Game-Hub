'use client';

interface Mole {
  id: number;
  isActive: boolean;
  isHit: boolean;
}

interface GameBoardProps {
  moles: Mole[];
  onMoleClick: (moleId: number) => void;
}

const GameBoard = ({ moles, onMoleClick }: GameBoardProps) => (
  <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto p-8 bg-card border border-white/10 rounded-2xl">
    {moles.map((mole) => (
      <button
        key={`mole_${mole.id}`}
        onClick={() => onMoleClick(mole.id)}
        disabled={!mole.isActive || mole.isHit}
        className="relative aspect-square bg-muted border-2 border-white/10 rounded-2xl overflow-hidden transition-all duration-200 hover:border-amber-500/50 disabled:cursor-default"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-black rounded-full border-4 border-white/5" />
        </div>

        {mole.isActive && !mole.isHit && (
          <div className="absolute inset-0 flex items-center justify-center animate-bounce-subtle">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full border-4 border-amber-800 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="text-3xl">🦔</div>
            </div>
          </div>
        )}

        {mole.isHit && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <div className="text-5xl animate-bounce-subtle">💥</div>
          </div>
        )}
      </button>
    ))}
  </div>
);

export default GameBoard;
