import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Crown, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'admin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  
  const { register, upgradeToPremium } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (!agreeTerms) {
      toast.error('Por favor acepta los términos y condiciones');
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
    
    if (success) {
      toast.success('¡Cuenta creada exitosamente!');
      navigate('/');
    } else {
      toast.error('Error al crear la cuenta');
    }
    
    setIsSubmitting(false);
  };

  const handleUpgradeToPremium = async () => {
    const success = await upgradeToPremium();
    if (success) {
      toast.success('¡Actualizado a Premium! Ahora puedes crear salas privadas.');
      setShowPremiumDialog(false);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--black))] via-[hsl(var(--dark-gray))] to-[hsl(var(--burgundy-dark))]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--gold))]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsl(var(--burgundy))]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="glass-card rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--gold))]/10 mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs text-gold">Comienza Ahora</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white">
              Crear Cuenta
            </h1>
            <p className="text-white/60 text-sm">
              Únete a Anime Casino y comienza tu aventura de juego
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'user' })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.role === 'user'
                  ? 'border-gold bg-[hsl(var(--gold))]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <User className={`w-6 h-6 mx-auto mb-2 ${formData.role === 'user' ? 'text-gold' : 'text-white/40'}`} />
              <p className={`text-sm font-medium ${formData.role === 'user' ? 'text-gold' : 'text-white/60'}`}>
                Jugador Gratis
              </p>
              <p className="text-xs text-white/40 mt-1">$0 / mes</p>
            </button>
            
            <button
              type="button"
              onClick={() => setShowPremiumDialog(true)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.role === 'admin'
                  ? 'border-gold bg-[hsl(var(--gold))]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <Crown className={`w-6 h-6 mx-auto mb-2 ${formData.role === 'admin' ? 'text-gold' : 'text-white/40'}`} />
              <p className={`text-sm font-medium ${formData.role === 'admin' ? 'text-gold' : 'text-white/60'}`}>
                Dueño de Sala
              </p>
              <p className="text-xs text-white/40 mt-1">$5 / mes</p>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/80">
                Nombre de Usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Tu nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/80">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1 border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
              />
              <Label htmlFor="terms" className="text-white/60 text-sm cursor-pointer leading-relaxed">
                Acepto los{' '}
                <Link to="/terms" className="text-gold hover:text-gold-light">Términos de Servicio</Link>
                {' '}y la{' '}
                <Link to="/privacy" className="text-gold hover:text-gold-light">Política de Privacidad</Link>
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold py-6 hover:shadow-lg hover:shadow-[hsl(var(--gold))]/30 transition-all duration-300"
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="text-gold hover:text-gold-light font-medium transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Premium Dialog */}
      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent className="glass-card border-[hsl(var(--gold))]/30 text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gold flex items-center gap-2">
              <Crown className="w-6 h-6" />
              Actualizar a Dueño de Sala
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Obtén beneficios premium y crea salas de juego privadas
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-gold">$5</p>
              <p className="text-white/60 text-sm">por mes</p>
            </div>
            
            <ul className="space-y-2">
              {[
                'Crear salas de juego privadas',
                'Invitar amigos exclusivamente',
                'Herramientas de gestión de sala',
                'Soporte premium',
                'Insignias especiales',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-white/80">
                  <Check className="w-4 h-4 text-gold" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPremiumDialog(false)}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpgradeToPremium}
              className="flex-1 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold"
            >
              Actualizar Ahora
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
