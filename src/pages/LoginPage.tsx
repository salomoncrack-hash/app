import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await login({ email, password });
    
    if (success) {
      toast.success('¡Bienvenido de vuelta!');
      navigate('/');
    } else {
      toast.error('Credenciales inválidas. Prueba admin@animecasino.com / admin o user@animecasino.com / user');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--black))] via-[hsl(var(--dark-gray))] to-[hsl(var(--burgundy-dark))]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[hsl(var(--gold))]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[hsl(var(--burgundy))]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Floating Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-20 h-28 glass-card rounded-lg flex items-center justify-center animate-float opacity-20">
          <span className="text-4xl">♠️</span>
        </div>
        <div className="absolute bottom-20 right-20 w-20 h-28 glass-card rounded-lg flex items-center justify-center animate-float opacity-20" style={{ animationDelay: '1s' }}>
          <span className="text-4xl">♥️</span>
        </div>
        <div className="absolute top-1/3 right-10 w-16 h-24 glass-card rounded-lg flex items-center justify-center animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <span className="text-3xl">♦️</span>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass-card rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--gold))]/10 mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs text-gold">Bienvenido de Vuelta</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white">
              Iniciar Sesión
            </h1>
            <p className="text-white/60 text-sm">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <Label htmlFor="remember" className="text-white/60 text-sm cursor-pointer">
                  Recordarme
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-gold text-sm hover:text-gold-light transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold py-6 hover:shadow-lg hover:shadow-[hsl(var(--gold))]/30 transition-all duration-300"
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
            <p className="text-xs text-white/40 text-center">Credenciales de Demo:</p>
            <div className="text-xs text-white/60 text-center space-y-1">
              <p>Admin: admin@animecasino.com / admin</p>
              <p>Usuario: user@animecasino.com / user</p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[hsl(var(--dark-gray))] text-white/40">
                o
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              ¿No tienes una cuenta?{' '}
              <Link
                to="/register"
                className="text-gold hover:text-gold-light font-medium transition-colors"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
