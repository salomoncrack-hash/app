import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Sara M.',
    avatar: 'public/avatar-1.jpg',
    rating: 5,
    quote: '¡Anime Casino es el mejor! Los juegos son divertidos, las recompensas son increíbles y la comunidad es muy acogedora. Nunca me había divertido tanto jugando juegos de casino en línea.',
    role: 'Jugadora VIP',
  },
  {
    id: 2,
    name: 'Juan D.',
    avatar: 'public/avatar-2.jpg',
    rating: 5,
    quote: 'Me encanta la temática anime y la variedad de juegos. ¡El soporte al cliente también es de primera! Me ayudaron con todo lo que necesitaba en minutos.',
    role: 'Jugador Regular',
  },
  {
    id: 3,
    name: 'Emily R.',
    avatar: 'public/avatar-3.jpg',
    rating: 5,
    quote: 'La experiencia de casino más emocionante que he tenido. ¡Los personajes anime la hacen tan única y los gráficos son absolutamente impresionantes!',
    role: 'Miembro Premium',
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(var(--black))]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(var(--gold))]/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Lo Que Dicen Nuestros{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))]">
              Jugadores
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Escucha a nuestra comunidad de jugadores sobre sus experiencias en Anime Casino.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main Card */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="relative p-8 md:p-12 rounded-3xl glass-card">
                    {/* Quote Icon */}
                    <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center">
                      <Quote className="w-6 h-6 text-black" />
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      {/* Rating */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-gold text-gold"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-white/80 text-lg md:text-xl leading-relaxed italic font-accent">
                        "{testimonial.quote}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[hsl(var(--gold))]/30"
                        />
                        <div>
                          <h4 className="font-display text-lg font-bold text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-gold text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full border-[hsl(var(--gold))]/30 text-gold hover:bg-[hsl(var(--gold))]/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-gold'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border-[hsl(var(--gold))]/30 text-gold hover:bg-[hsl(var(--gold))]/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
