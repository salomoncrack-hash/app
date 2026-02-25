import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dices, CircleDot, Spade } from 'lucide-react';
import { Button } from '@/components/ui/button';

const games = [
  {
    id: 'roulette',
    name: 'Ruleta',
    description: 'Experimenta la emoción clásica de la ruleta con un toque moderno. Coloca tus apuestas y observa girar la rueda en nuestro hermoso juego animado.',
    image: 'public/game-roulette.jpg',
    icon: CircleDot,
    path: '/games/roulette',
    minBet: 1,
    maxBet: 1000,
    color: 'from-[hsl(var(--burgundy))] to-[hsl(var(--burgundy-dark))]',
  },
  {
    id: 'poker',
    name: 'Póker',
    description: 'Pon a prueba tus habilidades en nuestras mesas de póker. Ya seas principiante o profesional, nuestras mesas ofrecen algo para todos.',
    image: 'public/game-poker.png',
    icon: Spade,
    path: '/games/poker',
    minBet: 5,
    maxBet: 5000,
    color: 'from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))]',
  },
  {
    id: 'slots',
    name: 'Tragaperras',
    description: 'Gira los carretes y gana grande con nuestros emocionantes juegos de tragaperras. Disfruta de gráficos impresionantes y emocionantes bonificaciones.',
    image: 'public/game-slots.jpg',
    icon: Dices,
    path: '/games/slots',
    minBet: 0.5,
    maxBet: 100,
    color: 'from-purple-600 to-purple-900',
  },
];

export function GamesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.game-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(var(--black))]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[hsl(var(--gold))]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[hsl(var(--burgundy))]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Explora Nuestros{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))]">
              Juegos
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Sumérgete en un mundo de emoción con nuestra diversa selección de juegos de casino. 
            Cada juego ofrece una experiencia única con impresionantes estéticas anime.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {games.map((game, index) => {
            const Icon = game.icon;
            const isVisible = visibleCards.has(index);
            
            return (
              <div
                key={game.id}
                data-index={index}
                className={`game-card group relative rounded-2xl overflow-hidden transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--dark-gray))] to-[hsl(var(--black))]" />
                
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--dark-gray))] via-transparent to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full glass-card flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold transition-colors">
                    {game.name}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {game.description}
                  </p>

                  {/* Bet Range */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Mín:</span>
                      <span className="text-gold font-medium">${game.minBet}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Máx:</span>
                      <span className="text-gold font-medium">${game.maxBet.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={game.path}>
                    <Button
                      className={`w-full mt-4 bg-gradient-to-r ${game.color} text-white font-semibold group/btn overflow-hidden relative`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Jugar {game.name}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                    </Button>
                  </Link>
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border border-[hsl(var(--gold))]/20 group-hover:border-[hsl(var(--gold))]/50 transition-colors duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/games">
            <Button
              variant="outline"
              size="lg"
              className="border-[hsl(var(--gold))]/50 text-gold hover:bg-[hsl(var(--gold))]/10 px-8"
            >
              Ver Todos los Juegos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
