'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
  difficulty: string;
}

const games: Game[] = [
  {
    id: 'game_tictactoe',
    title: 'Tic Tac Toe',
    description: 'Classic 3x3 strategy game. Challenge a friend and prove your tactical skills.',
    icon: 'XMarkIcon',
    color: 'from-blue-500 to-blue-600',
    href: '/tic-tac-toe',
    difficulty: 'Easy',
  },
  {
    id: 'game_snake',
    title: 'Snake Game',
    description: 'Guide the snake to eat food and grow. Avoid walls and your own tail!',
    icon: 'ArrowPathIcon',
    color: 'from-green-500 to-green-600',
    href: '/snake-game',
    difficulty: 'Medium',
  },
  {
    id: 'game_whack',
    title: 'Whack A Mole',
    description: 'Test your reflexes! Click the moles before they disappear.',
    icon: 'BoltIcon',
    color: 'from-amber-500 to-amber-600',
    href: '/whack-a-mole',
    difficulty: 'Medium',
  },
  {
    id: 'game_memory',
    title: 'Memory Cards',
    description: 'Match pairs of cards and challenge your memory. How fast can you complete it?',
    icon: 'PuzzlePieceIcon',
    color: 'from-purple-500 to-purple-600',
    href: '/memory-cards',
    difficulty: 'Hard',
  },
];

const GameGrid = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="games" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Game</h2>
          <p className="text-lg text-white/60">Pick a game and start playing instantly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <Link
              key={game.id}
              href={game.href}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="spotlight-card group relative p-8 bg-card rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${game.color}`} />

              <div className="relative z-10 flex items-start gap-6">
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${game.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={game.icon as never} size={32} className="text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                      {game.title}
                    </h3>
                    <span className="text-xs font-medium text-white/60 px-3 py-1 rounded-full border border-white/10">
                      {game.difficulty}
                    </span>
                  </div>
                  <p className="text-white/60 mb-6 leading-relaxed">{game.description}</p>
                  <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                    <span className="font-semibold">Play Now</span>
                    <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;
