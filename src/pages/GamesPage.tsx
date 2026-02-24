import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dices, CircleDot, Lock, Users, Spade } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';

const games = [
  {
    id: 'roulette',
    name: 'Ruleta',
    description: 'Experimenta la emoción clásica de la ruleta con un toque moderno. Coloca tus apuestas y observa girar la rueda en nuestro hermoso juego animado.',
    image: '/game-roulette.jpg',
    icon: CircleDot,
    path: '/games/roulette',
    minBet: 1,
    maxBet: 1000,
    color: 'from-[hsl(var(--burgundy))] to-[hsl(var(--burgundy-dark))]',
    players: 1247,
  },
  {
    id: 'poker',
    name: 'Póker',
    description: 'Pon a prueba tus habilidades en nuestras mesas de póker. Ya seas principiante o profesional, nuestras mesas ofrecen algo para todos.',
    image: '/game-poker.jpg',
    icon: Spade,
    path: '/games/poker',
    minBet: 5,
    maxBet: 5000,
    color: 'from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))]',
    players: 892,
  },
  {
    id: 'slots',
    name: 'Tragaperras',
    description: 'Gira los carretes y gana grande con nuestros emocionantes juegos de tragaperras. Disfruta de gráficos impresionantes y emocionantes bonificaciones.',
    image: '/game-slots.jpg',
    icon: Dices,
    path: '/games/slots',
    minBet: 0.5,
    maxBet: 100,
    color: 'from-purple-600 to-purple-900',
    players: 2156,
  },
];

const privateRooms = [
  { id: 1, name: 'Sala VIP Ruleta', game: 'roulette', players: 8, maxPlayers: 10, owner: 'Admin' },
  { id: 2, name: 'Póker Alto Nivel', game: 'poker', players: 5, maxPlayers: 8, owner: 'JugadorUno' },
  { id: 3, name: 'Club de Tragaperras', game: 'slots', players: 12, maxPlayers: 20, owner: 'MaestroSlots' },
];

export function GamesPage() {
  const { user, isAuthenticated } = useAuthContext();
  const [activeTab, setActiveTab] = useState<'all' | 'private'>('all');

  const canCreateRoom = user?.role === 'admin' || user?.isPremium;

  return (
    <div className="min-h-screen w-full bg-[hsl(var(--black))] pt-20">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--burgundy-dark))]/30 to-transparent" />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Nuestros{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))]">
                Juegos
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Elige entre nuestra selección de emocionantes juegos de casino, cada uno con únicas estéticas de temática anime y jugabilidad emocionante.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-gold text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Todos los Juegos
          </button>
          <button
            onClick={() => setActiveTab('private')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'private'
                ? 'bg-gold text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <Lock className="w-4 h-4" />
            Salas Privadas
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'all' ? (
            /* All Games Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => {
                const Icon = game.icon;
                
                return (
                  <div
                    key={game.id}
                    className="group relative rounded-2xl overflow-hidden glass-card hover:border-gold/50 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
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

                      {/* Players Badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full glass-card">
                        <Users className="w-4 h-4 text-gold" />
                        <span className="text-sm text-white">{game.players} jugando</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold transition-colors">
                        {game.name}
                      </h3>
                      
                      <p className="text-white/60 text-sm leading-relaxed">
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
                            Jugar Ahora
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Private Rooms */
            <div className="space-y-8">
              {isAuthenticated && canCreateRoom && (
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold">
                    Crear Sala Privada
                  </Button>
                </div>
              )}

              {!isAuthenticated && (
                <div className="text-center py-12 glass-card rounded-2xl">
                  <Lock className="w-12 h-12 text-gold/50 mx-auto mb-4" />
                  <h3 className="font-display text-xl text-white mb-2">Inicia sesión para ver salas privadas</h3>
                  <p className="text-white/60 mb-4">Crea una cuenta o inicia sesión para unirte a salas de juego privadas</p>
                  <div className="flex gap-4 justify-center">
                    <Link to="/login">
                      <Button variant="outline" className="border-gold/50 text-gold">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-gold text-black">
                        Crear Cuenta
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {isAuthenticated && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {privateRooms.map((room) => (
                    <div
                      key={room.id}
                      className="glass-card rounded-xl p-6 space-y-4 hover:border-gold/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-lg font-bold text-white">{room.name}</h3>
                          <p className="text-white/60 text-sm">por {room.owner}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-gold" />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-white/40" />
                          <span className="text-white/60">
                            {room.players} / {room.maxPlayers}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full bg-white/5 hover:bg-gold/20 text-gold border border-gold/30">
                        Unirse a la Sala
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {isAuthenticated && !canCreateRoom && (
                <div className="glass-card rounded-xl p-6 text-center">
                  <p className="text-white/60 mb-4">
                    Actualiza al plan de Dueño de Sala para crear tus propias salas privadas
                  </p>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold">
                      Actualizar a $5/mes
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
