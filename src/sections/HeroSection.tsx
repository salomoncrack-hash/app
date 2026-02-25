import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return;
      
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      characterRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 5}deg)
        rotateX(${-y * 5}deg)
        translateZ(20px)
      `;
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--black))] via-[hsl(var(--dark-gray))] to-[hsl(var(--burgundy-dark))]" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-in">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold-light font-medium">
                Bienvenido al Futuro del Juego
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Experimenta la
              </h1>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-gold">Emoción</span>{' '}
                <span className="text-white">del</span>
                <span className="text-white">anime casino</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sumérgete en un mundo donde la elegancia se encuentra con la emoción. 
              Juega, gana y disfruta de la aventura casino definitiva con impresionantes estéticas anime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold px-8 py-6 text-lg hover:shadow-xl hover:shadow-[hsl(var(--gold))]/30 transition-all duration-300 group"
                >
                  Comenzar
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/games">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[hsl(var(--gold))]/50 text-gold hover:bg-[hsl(var(--gold))]/10 px-8 py-6 text-lg transition-all duration-300"
                >
                  Explorar Juegos
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              {[
                { value: '50K+', label: 'Jugadores' },
                { value: '100+', label: 'Juegos' },
                { value: '$1M+', label: 'Ganado Diario' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Character */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-[hsl(var(--gold))]/20 via-transparent to-transparent blur-3xl" />
            
            {/* Character Image */}
            <img
              ref={characterRef}
              src="/hero-character.png"
              alt="Personaje Anime Casino"
              className="relative z-10 w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain transition-transform duration-200 ease-out drop-shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            />

            {/* Floating Elements */}
            <div className="absolute top-10 left-0 w-16 h-16 glass-card rounded-full flex items-center justify-center animate-float">
              <span className="text-2xl">♠️</span>
            </div>
            <div className="absolute bottom-20 left-10 w-14 h-14 glass-card rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-2xl">♥️</span>
            </div>
            <div className="absolute top-1/3 right-0 w-12 h-12 glass-card rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
              <span className="text-xl">♦️</span>
            </div>
            <div className="absolute bottom-10 right-10 w-14 h-14 glass-card rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
              <span className="text-2xl">♣️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--black))] to-transparent" />
    </section>
  );
}
