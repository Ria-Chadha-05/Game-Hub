import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SnakeGame from './components/SnakeGame';

export const metadata: Metadata = {
  title: 'Snake Game - Game Hub',
  description: 'Play the classic Snake game. Control the snake, eat food, and grow longer while avoiding walls and yourself.',
};

export default function SnakeGamePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
      </div>

      <main className="pt-32 pb-20 px-6">
        <SnakeGame />
      </main>

      <Footer />
    </div>
  );
}
