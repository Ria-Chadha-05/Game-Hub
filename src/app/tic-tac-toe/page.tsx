import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import TicTacToeGame from './components/TicTacToeGame';

export const metadata: Metadata = {
  title: 'Tic Tac Toe - Game Hub',
  description: 'Play classic Tic Tac Toe game. Challenge a friend in this strategic 3x3 grid game.',
};

export default function TicTacToePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
      </div>

      <main className="pt-32 pb-20 px-6">
        <TicTacToeGame />
      </main>

      <Footer />
    </div>
  );
}
