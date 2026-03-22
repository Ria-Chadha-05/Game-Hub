import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import WhackAMoleGame from './components/WhackAMoleGame';

export const metadata: Metadata = {
  title: 'Whack A Mole - Game Hub',
  description: 'Test your reflexes in this fast-paced Whack A Mole game. Click the moles before they disappear!',
};

export default function WhackAMolePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
      </div>

      <main className="pt-32 pb-20 px-6">
        <WhackAMoleGame />
      </main>

      <Footer />
    </div>
  );
}
