import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

// Roulette numbers with colors
const rouletteNumbers = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' }, { number: 15, color: 'black' },
  { number: 19, color: 'red' }, { number: 4, color: 'black' },
  { number: 21, color: 'red' }, { number: 2, color: 'black' },
  { number: 25, color: 'red' }, { number: 17, color: 'black' },
  { number: 34, color: 'red' }, { number: 6, color: 'black' },
  { number: 27, color: 'red' }, { number: 13, color: 'black' },
  { number: 36, color: 'red' }, { number: 11, color: 'black' },
  { number: 30, color: 'red' }, { number: 8, color: 'black' },
  { number: 23, color: 'red' }, { number: 10, color: 'black' },
  { number: 5, color: 'red' }, { number: 24, color: 'black' },
  { number: 16, color: 'red' }, { number: 33, color: 'black' },
  { number: 1, color: 'red' }, { number: 20, color: 'black' },
  { number: 14, color: 'red' }, { number: 31, color: 'black' },
  { number: 9, color: 'red' }, { number: 22, color: 'black' },
  { number: 18, color: 'red' }, { number: 29, color: 'black' },
  { number: 7, color: 'red' }, { number: 28, color: 'black' },
  { number: 12, color: 'red' }, { number: 35, color: 'black' },
  { number: 3, color: 'red' }, { number: 26, color: 'black' },
];

const betOptions = [
  { label: 'Rojo', type: 'color', value: 'red', payout: 2 },
  { label: 'Negro', type: 'color', value: 'black', payout: 2 },
  { label: 'Par', type: 'parity', value: 'even', payout: 2 },
  { label: 'Impar', type: 'parity', value: 'odd', payout: 2 },
  { label: '1-18', type: 'range', value: '1-18', payout: 2 },
  { label: '19-36', type: 'range', value: '19-36', payout: 2 },
];

export function RoulettePage() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  
  const [balance, setBalance] = useState(user?.balance || 1000);
  const [bet, setBet] = useState(10);
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<typeof rouletteNumbers[0] | null>(null);
  const [history, setHistory] = useState<typeof rouletteNumbers[0][]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Por favor inicia sesión para jugar');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const spin = () => {
    if (!selectedBet) {
      toast.error('Por favor selecciona una apuesta');
      return;
    }
    
    if (bet > balance) {
      toast.error('Saldo insuficiente');
      return;
    }

    setIsSpinning(true);
    setBalance((prev) => prev - bet);
    
    // Random result
    const winningNumber = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
    const winningIndex = rouletteNumbers.indexOf(winningNumber);
    
    // Calculate rotation (360 / 37 = ~9.73 degrees per number)
    const degreesPerNumber = 360 / 37;
    const targetRotation = 360 * 5 + (360 - winningIndex * degreesPerNumber) + Math.random() * degreesPerNumber;
    
    setRotation((prev) => prev + targetRotation);
    
    setTimeout(() => {
      setResult(winningNumber);
      setHistory((prev) => [winningNumber, ...prev].slice(0, 10));
      
      // Check win
      let won = false;
      let winnings = 0;
      
      const betOption = betOptions.find((b) => b.label === selectedBet);
      if (betOption) {
        switch (betOption.type) {
          case 'color':
            won = winningNumber.color === betOption.value;
            break;
          case 'parity':
            if (winningNumber.number === 0) {
              won = false;
            } else {
              won = betOption.value === 'even' 
                ? winningNumber.number % 2 === 0 
                : winningNumber.number % 2 === 1;
            }
            break;
          case 'range':
            won = betOption.value === '1-18' 
              ? winningNumber.number >= 1 && winningNumber.number <= 18
              : winningNumber.number >= 19 && winningNumber.number <= 36;
            break;
        }
        
        if (won) {
          winnings = bet * betOption.payout;
          setBalance((prev) => prev + winnings);
          toast.success(`¡Ganaste $${winnings}!`);
        } else {
          toast.error('¡Más suerte la próxima vez!');
        }
      }
      
      setIsSpinning(false);
      setSelectedBet(null);
    }, 4000);
  };

  const reset = () => {
    setSelectedBet(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen w-full bg-[hsl(var(--black))] pt-20">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Roulette Wheel */}
            <div className="flex flex-col items-center">
              <h1 className="font-display text-3xl font-bold text-white mb-8">
                Ruleta <span className="text-gold">Anime</span>
              </h1>
              
              {/* Wheel Container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-8 border-[hsl(var(--gold))]/30 shadow-2xl shadow-[hsl(var(--gold))]/20" />
                
                {/* Wheel */}
                <div
                  className="absolute inset-2 rounded-full overflow-hidden transition-transform duration-[4000ms] ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {rouletteNumbers.map((num, i) => {
                      const angle = (360 / 37) * i;
                      return (
                        <g key={num.number} transform={`rotate(${angle} 50 50)`}>
                          <path
                            d="M50 50 L50 5 A45 45 0 0 1 54.8 5.2 Z"
                            fill={num.color === 'red' ? '#722f37' : num.color === 'black' ? '#1a1a1a' : '#2d5a27'}
                            stroke="#d4a574"
                            strokeWidth="0.3"
                          />
                          <text
                            x="52"
                            y="18"
                            fill="white"
                            fontSize="4"
                            textAnchor="middle"
                            transform="rotate(4.86 52 18)"
                          >
                            {num.number}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                
                {/* Center */}
                <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center shadow-lg">
                  <span className="font-display text-2xl font-bold text-black">★</span>
                </div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                  <div className="w-4 h-8 bg-gold clip-triangle" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
                </div>
              </div>

              {/* Result Display */}
              {result && !isSpinning && (
                <div className="mt-8 text-center">
                  <p className="text-white/60 mb-2">Resultado:</p>
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold ${
                      result.color === 'red'
                        ? 'bg-[hsl(var(--burgundy))] text-white'
                        : result.color === 'black'
                        ? 'bg-[hsl(var(--dark-gray))] text-white border-2 border-white/20'
                        : 'bg-green-700 text-white'
                    }`}
                  >
                    {result.number}
                  </div>
                </div>
              )}
            </div>

            {/* Betting Area */}
            <div className="space-y-6">
              {/* Bet Amount */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Monto de Apuesta</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setBet(Math.max(1, bet - 10))}
                    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-gold/20 transition-colors"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-gold">${bet}</span>
                  </div>
                  <button
                    onClick={() => setBet(Math.min(balance, bet + 10))}
                    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-gold/20 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-2 mt-4 justify-center">
                  {[10, 25, 50, 100].map((amount) => (
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
              </div>

              {/* Bet Options */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Coloca tu Apuesta</h3>
                <div className="grid grid-cols-2 gap-3">
                  {betOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setSelectedBet(option.label)}
                      disabled={isSpinning}
                      className={`p-4 rounded-xl font-bold transition-all duration-300 ${
                        selectedBet === option.label
                          ? 'bg-gold text-black scale-105'
                          : option.label === 'Rojo'
                          ? 'bg-[hsl(var(--burgundy))] text-white hover:opacity-90'
                          : option.label === 'Negro'
                          ? 'bg-[hsl(var(--dark-gray))] text-white border border-white/20 hover:opacity-90'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {option.label}
                      <span className="block text-xs font-normal opacity-70 mt-1">
                        Paga {option.payout}x
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={spin}
                  disabled={isSpinning || !selectedBet}
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-bold py-6 text-lg disabled:opacity-50"
                >
                  {isSpinning ? 'Girando...' : 'GIRAR'}
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  disabled={isSpinning}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-display text-sm font-bold text-white/60 mb-4">Resultados Recientes</h3>
                  <div className="flex gap-2 flex-wrap">
                    {history.map((num, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          num.color === 'red'
                            ? 'bg-[hsl(var(--burgundy))] text-white'
                            : num.color === 'black'
                            ? 'bg-[hsl(var(--dark-gray))] text-white border border-white/20'
                            : 'bg-green-700 text-white'
                        }`}
                      >
                        {num.number}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
