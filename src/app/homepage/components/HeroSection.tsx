import Icon from '@/components/ui/AppIcon';

const HeroSection = () => (
  <section className="relative pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-slide-in-blur opacity-0"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
            4 Games Available
          </span>
        </div>

        <div className="space-y-4">
          <h1
            className="text-6xl md:text-8xl font-bold text-white tracking-tight animate-slide-in-blur opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="inline-block">🎮</span> Game Hub
          </h1>
          <p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light animate-slide-in-blur opacity-0"
            style={{ animationDelay: '0.6s' }}
          >
            Play classic browser games instantly. No downloads, no hassle. Just pure gaming fun.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-blur opacity-0"
          style={{ animationDelay: '0.8s' }}
        >
          <a
            href="#games"
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Playing
              <Icon name="PlayIcon" size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          </a>

          <button className="px-8 py-4 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-all">
            View High Scores
          </button>
        </div>

        <div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-slide-in-blur opacity-0"
          style={{ animationDelay: '1s' }}
        >
          {[
            { value: '4', label: 'Classic Games' },
            { value: '100%', label: 'Free to Play' },
            { value: '0', label: 'Downloads' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-sm text-white/60 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
