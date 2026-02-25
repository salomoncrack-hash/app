import { useRef, useEffect, useState } from 'react';
import { Shield, Gift, Headphones, CreditCard, Gamepad2, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Seguro y Justo',
    description: 'Priorizamos tu seguridad con encriptación avanzada y algoritmos de juego justo. Cada juego es verificable.',
    color: 'from-green-500 to-green-700',
  },
  {
    icon: Gift,
    title: 'Recompensas Emocionantes',
    description: 'Disfruta de generosos bonos, promociones y recompensas de fidelidad que te mantendrán volviendo por más.',
    color: 'from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))]',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Nuestro equipo de soporte dedicado está disponible las 24 horas para ayudarte con cualquier pregunta.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: CreditCard,
    title: 'Pagos Fáciles',
    description: 'Depósitos y retiros rápidos y seguros con múltiples opciones de pago para elegir.',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: Gamepad2,
    title: 'Juegos Exclusivos',
    description: 'Juega juegos de casino únicos con temática anime que no encontrarás en ningún otro lugar.',
    color: 'from-[hsl(var(--burgundy))] to-[hsl(var(--burgundy-dark))]',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Únete a una vibrante comunidad de amantes del anime y el casino de todo el mundo.',
    color: 'from-pink-500 to-pink-700',
  },
];

export function WhyChooseUsSection() {
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

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--black))] via-[hsl(var(--dark-gray))] to-[hsl(var(--black))]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Por Qué Elegirnos a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))]">
              Nosotros?
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Descubre por qué Anime Casino es el destino definitivo para entusiastas del anime y el casino.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.has(index);
            
            return (
              <div
                key={index}
                data-index={index}
                className={`feature-card group relative p-8 rounded-2xl transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0 rotate-0'
                    : 'opacity-0 translate-y-12 rotate-[-5deg]'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--dark-gray))]/80 to-[hsl(var(--black))]/80 backdrop-blur-sm border border-white/5" />
                
                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Text */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-gold transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[hsl(var(--gold))]/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[hsl(var(--gold))]/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
