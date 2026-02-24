import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coins, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

// Slot symbols
const symbols = ['🍒', '🍋', '🍇', '💎', '7️⃣', '🎰', '⭐', '🔔'];

// Payouts for different combinations
const payouts: Record<string, number> = {
  '7️⃣7️⃣7️⃣': 50,
  '💎💎💎': 30,
  '🎰🎰🎰': 20,
  '⭐⭐⭐': 15,
  '🔔🔔🔔': 10,
  '🍇🍇🍇': 8,
  '🍒🍒🍒': 5,
  '🍋🍋🍋': 3,
};

// Check for partial matches
const getPayout = (reels: string[]): number => {
  const combination = reels.join('');
  
  // Full match
  if (payouts[combination]) {
    return payouts[combination];
  }
  
  // Two matching symbols
  if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
    // Find the matching symbol
    let matchSymbol = reels[0];
    if (reels[1] === reels[2]) matchSymbol = reels[1];
    
    // Partial payout for 2 matches
    const fullPayout = payouts[`${matchSymbol}${matchSymbol}${matchSymbol}`];
    if (fullPayout) {
      return Math.floor(fullPayout / 3);
    }
  }
  
  return 0;
};

export function SlotsPage() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  
  const [balance, setBalance] = useState(user?.balance || 1000);
  const [bet, setBet] = useState(10);
  const [reels, setReels] = useState(['🎰', '🎰', '🎰']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [win, setWin] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Por favor inicia sesión para jugar');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const spin = () => {
    if (bet > balance) {
      toast.error('Saldo insuficiente');
      return;
    }

    setIsSpinning(true);
    setWin(0);
    setBalance((prev) => prev - bet);
    setSpinCount((prev) => prev + 1);

    // Animate reels
    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      spins++;

      if (spins >= maxSpins) {
        clearInterval(interval);
        
        // Final result - weighted random for better gameplay
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        
        // Small chance to force a win if haven't won in a while
        if (spinCount > 5 && Math.random() < 0.3) {
          const winningSymbol = symbols[Math.floor(Math.random() * 4)]; // Favor lower paying symbols
          finalReels[0] = winningSymbol;
          finalReels[1] = winningSymbol;
          finalReels[2] = winningSymbol;
        }
        
        setReels(finalReels);
        
        const payout = getPayout(finalReels);
        if (payout > 0) {
          const winnings = bet * payout;
          setWin(winnings);
          setBalance((prev) => prev + winnings);
          toast.success(`¡Ganaste $${winnings}! 🎉`);
          setSpinCount(0);
        } else {
          toast.error('No hay coincidencia - ¡inténtalo de nuevo!');
        }
        
        setIsSpinning(false);
      }
    }, 100);
  };

  const reset = () => {
    setReels(['🎰', '🎰', '🎰']);
    setWin(0);
    setSpinCount(0);
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
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Tragaperras <span className="text-gold">Anime</span>
            </h1>
            <p className="text-white/60">¡Hace coincidir símbolos para ganar grande!</p>
          </div>

          {/* Slot Machine */}
          <div className="relative bg-gradient-to-b from-[hsl(var(--burgundy-dark))] to-[hsl(var(--black))] rounded-3xl p-8 shadow-2xl border-4 border-[hsl(var(--gold))]/30">
            {/* Top Decoration */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${isSpinning ? 'animate-pulse bg-gold' : 'bg-gold/50'}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            {/* Reels Display */}
            <div className="bg-[hsl(var(--black))] rounded-2xl p-6 mb-6 border-2 border-[hsl(var(--gold))]/20">
              <div className="grid grid-cols-3 gap-4">
                {reels.map((symbol, i) => (
                  <div
                    key={i}
                    className={`aspect-square bg-gradient-to-b from-[hsl(var(--dark-gray))] to-[hsl(var(--black))] rounded-xl flex items-center justify-center text-6xl shadow-inner border border-white/10 ${
                      isSpinning ? 'animate-pulse' : ''
                    }`}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </div>

            {/* Win Display */}
            {win > 0 && (
              <div className="text-center mb-6 animate-bounce">
                <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))]">
                  <span className="text-black font-bold text-xl">
                    ¡Ganaste ${win}! 🎉
                  </span>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-4">
              {/* Bet Amount */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setBet(Math.max(1, bet - 5))}
                  disabled={isSpinning}
                  className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-gold/20 transition-colors disabled:opacity-50"
                >
                  -
                </button>
                <div className="text-center">
                  <span className="text-white/60 text-sm">APUESTA</span>
                  <div className="text-2xl font-bold text-gold">${bet}</div>
                </div>
                <button
                  onClick={() => setBet(Math.min(balance, bet + 5))}
                  disabled={isSpinning}
                  className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-gold/20 transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>

              {/* Quick Bet Buttons */}
              <div className="flex gap-2 justify-center">
                {[5, 10, 25, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBet(amount)}
                    disabled={isSpinning}
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

              {/* Spin Button */}
              <div className="flex gap-4">
                <Button
                  onClick={spin}
                  disabled={isSpinning || bet > balance}
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-bold py-8 text-2xl disabled:opacity-50 hover:shadow-lg hover:shadow-[hsl(var(--gold))]/30 transition-all"
                >
                  {isSpinning ? '...' : 'GIRAR'}
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  disabled={isSpinning}
                  className="border-white/20 text-white hover:bg-white/10 px-4"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Payout Table */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-white mb-4 text-center">Pagos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(payouts).map(([combo, payout]) => (
                <div
                  key={combo}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5"
                >
                  <span className="text-lg">{combo}</span>
                  <span className="text-gold font-bold">{payout}x</span>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs text-center mt-4">
              2 símbolos coincidentes pagan 1/3 del pago completo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
