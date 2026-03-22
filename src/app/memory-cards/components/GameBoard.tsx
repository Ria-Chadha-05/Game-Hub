'use client';

import Icon from '@/components/ui/AppIcon';

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameBoardProps {
  cards: Card[];
  onCardClick: (cardId: number) => void;
  gridCols: string;
}

const GameBoard = ({ cards, onCardClick, gridCols }: GameBoardProps) => (
  <div className={`grid ${gridCols} gap-4 max-w-2xl mx-auto`}>
    {cards.map((card) => (
      <button
        key={card.id}
        onClick={() => onCardClick(card.id)}
        disabled={card.isMatched}
        className="group relative aspect-square perspective-1000"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center border-2 border-white/20 group-hover:scale-105 transition-transform">
            <Icon name="QuestionMarkCircleIcon" size={40} className="text-white/80" />
          </div>

          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex items-center justify-center border-2 ${
              card.isMatched
                ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400/50'
                : 'bg-card border-white/20'
            }`}
          >
            <Icon
              name={card.icon as never}
              size={40}
              className={card.isMatched ? 'text-white' : 'text-purple-500'}
            />
          </div>
        </div>
      </button>
    ))}
  </div>
);

export default GameBoard;
