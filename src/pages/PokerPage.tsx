import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coins, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

// Card types
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

interface Card {
  suit: string;
  rank: string;
  value: number;
}

// Generate deck
const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  suits.forEach((suit) => {
    ranks.forEach((rank, index) => {
      deck.push({ suit, rank, value: index + 2 });
    });
  });
  return deck;
};

// Shuffle deck
const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Evaluate hand (simplified)
const evaluateHand = (hand: Card[]): { name: string; multiplier: number } => {
  const values = hand.map((c) => c.value).sort((a, b) => b - a);
  const suits = hand.map((c) => c.suit);
  
  const isFlush = suits.every((s) => s === suits[0]);
  const isStraight = values.every((v, i) => i === 0 || v === values[i - 1] - 1);
  const valueCounts: Record<number, number> = {};
  values.forEach((v) => {
    valueCounts[v] = (valueCounts[v] || 0) + 1;
  });
  const counts = Object.values(valueCounts);
  
  if (isFlush && isStraight && values[0] === 14) {
    return { name: '¡Escalera Real!', multiplier: 100 };
  }
  if (isFlush && isStraight) {
    return { name: '¡Escalera de Color!', multiplier: 50 };
  }
  if (counts.includes(4)) {
    return { name: '¡Póker!', multiplier: 25 };
  }
  if (counts.includes(3) && counts.includes(2)) {
    return { name: '¡Full House!', multiplier: 15 };
  }
  if (isFlush) {
    return { name: '¡Color!', multiplier: 10 };
  }
  if (isStraight) {
    return { name: '¡Escalera!', multiplier: 8 };
  }
  if (counts.includes(3)) {
    return { name: '¡Trío!', multiplier: 5 };
  }
  if (counts.filter((c) => c === 2).length === 2) {
    return { name: '¡Doble Par!', multiplier: 3 };
  }
  if (counts.includes(2)) {
    return { name: '¡Par!', multiplier: 2 };
  }
  if (values[0] >= 11) {
    return { name: 'Carta Alta (J+)', multiplier: 1 };
  }
  return { name: 'Sin Ganancia', multiplier: 0 };
};

export function PokerPage() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  
  const [balance, setBalance] = useState(user?.balance || 1000);
  const [bet, setBet] = useState(10);
  const [deck, setDeck] = useState<Card[]>([]);
  const [hand, setHand] = useState<Card[]>([]);
  const [isDealing, setIsDealing] = useState(false);
  const [result, setResult] = useState<{ name: string; multiplier: number } | null>(null);
  const [heldCards, setHeldCards] = useState<Set<number>>(new Set());
  const [gamePhase, setGamePhase] = useState<'bet' | 'deal' | 'draw'>('bet');

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Por favor inicia sesión para jugar');
      navigate('/login');
    }
    setDeck(shuffleDeck(generateDeck()));
  }, [isAuthenticated, navigate]);

  const deal = () => {
    if (bet > balance) {
      toast.error('Saldo insuficiente');
      return;
    }

    setIsDealing(true);
    setBalance((prev) => prev - bet);
    setHeldCards(new Set());
    setResult(null);

    // Deal 5 cards
    const newDeck = shuffleDeck(generateDeck());
    const newHand = newDeck.slice(0, 5);
    setDeck(newDeck.slice(5));
    
    setTimeout(() => {
      setHand(newHand);
      setIsDealing(false);
      setGamePhase('deal');
    }, 500);
  };

  const toggleHold = (index: number) => {
    if (gamePhase !== 'deal') return;
    
    const newHeld = new Set(heldCards);
    if (newHeld.has(index)) {
      newHeld.delete(index);
    } else {
      newHeld.add(index);
    }
    setHeldCards(newHeld);
  };

  const draw = () => {
    setIsDealing(true);
    
    setTimeout(() => {
      const newHand = hand.map((card, i) => {
        if (heldCards.has(i)) return card;
        return deck[Math.floor(Math.random() * deck.length)];
      });
      
      setHand(newHand);
      const evalResult = evaluateHand(newHand);
      setResult(evalResult);
      
      if (evalResult.multiplier > 0) {
        const winnings = bet * evalResult.multiplier;
        setBalance((prev) => prev + winnings);
        toast.success(`${evalResult.name} ¡Ganaste $${winnings}!`);
      } else {
        toast.error('No hay mano ganadora - ¡inténtalo de nuevo!');
      }
      
      setIsDealing(false);
      setGamePhase('bet');
    }, 500);
  };

  const reset = () => {
    setHand([]);
    setResult(null);
    setHeldCards(new Set());
    setGamePhase('bet');
    setDeck(shuffleDeck(generateDeck()));
  };

  const getCardColor = (suit: string) => {
    return suit === '♥' || suit === '♦' ? 'text-[hsl(var(--burgundy))]' : 'text-white';
  };

  return (
    <div className="min-h-screen w-full bg-[hsl(var(--black))] pt-20">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Juegos
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <Coins className="w-5 h-5 text-gold" />
              <span className="text-gold font-bold">{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Póker <span className="text-gold">Anime</span>
            </h1>
            <p className="text-white/60">Video Póker - ¡Mantén cartas y roba para la mejor mano!</p>
          </div>

          {/* Game Table */}
          <div className="bg-gradient-to-b from-[hsl(var(--burgundy-dark))] to-[hsl(var(--black))] rounded-3xl p-8 shadow-2xl border-4 border-[hsl(var(--gold))]/30">
            {/* Cards Display */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-8 flex-wrap">
              {hand.length === 0 ? (
                // Empty slots
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-24 sm:w-24 sm:h-36 rounded-xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center"
                  >
                    <span className="text-white/20 text-2xl">?</span>
                  </div>
                ))
              ) : (
                // Cards
                hand.map((card, i) => (
                  <button
                    key={i}
                    onClick={() => toggleHold(i)}
                    disabled={gamePhase !== 'deal'}
                    className={`relative w-16 h-24 sm:w-24 sm:h-36 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                      heldCards.has(i)
                        ? 'bg-gradient-to-b from-gold to-[hsl(var(--gold-dark))] transform -translate-y-4 shadow-lg shadow-gold/50'
                        : 'bg-white transform hover:-translate-y-1'
                    } ${isDealing ? 'animate-pulse' : ''}`}
                  >
                    <span className={`text-2xl sm:text-4xl font-bold ${getCardColor(card.suit)}`}>
                      {card.rank}
                    </span>
                    <span className="text-xl sm:text-3xl">{card.suit}</span>
                    
                    {/* Hold Label */}
                    {heldCards.has(i) && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-black text-xs font-bold">
                        MANTENER
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Result Display */}
            {result && (
              <div className="text-center mb-6">
                <div className={`inline-block px-6 py-3 rounded-full ${
                  result.multiplier > 0 
                    ? 'bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))]' 
                    : 'bg-white/10'
                }`}>
                  <span className={`font-bold text-xl ${result.multiplier > 0 ? 'text-black' : 'text-white'}`}>
                    {result.name}
                    {result.multiplier > 0 && ` (+${result.multiplier}x)`}
                  </span>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-4">
              {/* Bet Amount */}
              {gamePhase === 'bet' && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setBet(Math.max(1, bet - 5))}
                    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-gold/20 transition-colors"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <span className="text-white/60 text-sm">APUESTA</span>
                    <div className="text-2xl font-bold text-gold">${bet}</div>
                  </div>
                  <button
                    onClick={() => setBet(Math.min(balance, bet + 5))}
                    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-gold/20 transition-colors"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Quick Bet Buttons */}
              {gamePhase === 'bet' && (
                <div className="flex gap-2 justify-center">
                  {[5, 10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBet(amount)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        bet === amount
                          ? 'bg-gold text-black'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {gamePhase === 'bet' && (
                  <Button
                    onClick={deal}
                    disabled={isDealing || bet > balance}
                    className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-bold py-6 px-12 text-xl disabled:opacity-50"
                  >
                    REPARTIR
                  </Button>
                )}
                
                {gamePhase === 'deal' && (
                  <Button
                    onClick={draw}
                    disabled={isDealing}
                    className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-bold py-6 px-12 text-xl disabled:opacity-50"
                  >
                    ROBAR
                  </Button>
                )}
                
                {(gamePhase === 'deal' || result) && (
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-4"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Payout Table */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-white mb-4 text-center">Pagos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {[
                { hand: 'Escalera Real', payout: '100x' },
                { hand: 'Escalera de Color', payout: '50x' },
                { hand: 'Póker', payout: '25x' },
                { hand: 'Full House', payout: '15x' },
                { hand: 'Color', payout: '10x' },
                { hand: 'Escalera', payout: '8x' },
                { hand: 'Trío', payout: '5x' },
                { hand: 'Doble Par', payout: '3x' },
                { hand: 'Par (J+)', payout: '2x' },
              ].map((item) => (
                <div
                  key={item.hand}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5"
                >
                  <span className="text-white/80">{item.hand}</span>
                  <span className="text-gold font-bold">{item.payout}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
