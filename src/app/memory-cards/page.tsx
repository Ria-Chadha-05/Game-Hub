import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MemoryCardGame from './components/MemoryCardGame';

export const metadata: Metadata = {
  title: 'Memory Cards - Game Hub',
  description: 'Test your memory with this card matching game. Find all pairs to win!',
};

export default function MemoryCardsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
      </div>

      <main className="pt-32 pb-20 px-6">
        <MemoryCardGame />
      </main>

      <Footer />
    </div>
  );
}
