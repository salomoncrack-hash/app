import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/games', label: 'Juegos' },
    { path: '/about', label: 'Nosotros' },
    { path: '/contact', label: 'Contacto' },
  ];

  const supportLinks = [
    { path: '/faq', label: 'Preguntas Frecuentes' },
    { path: '/terms', label: 'Términos de Servicio' },
    { path: '/privacy', label: 'Política de Privacidad' },
    { path: '/support', label: 'Soporte' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-[hsl(var(--black))] border-t border-[hsl(var(--gold))]/20">
      {/* Animated border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold text-gold">
                Anime Casino
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Donde la elegancia se encuentra con la emoción. Experimenta la mezcla perfecta de arte anime y emoción de casino.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-gold hover:bg-[hsl(var(--gold))]/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-white">
              Soporte
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-white">
              Contáctanos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold mt-0.5" />
                <span className="text-white/60 text-sm">
                  soporte@animecasino.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold mt-0.5" />
                <span className="text-white/60 text-sm">
                  +58 (412) 6349-859
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5" />
                <span className="text-white/60 text-sm">
                  UPTM Seccion B T1 T1, Ciudad Merida
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © {currentYear} Obsidian Wolf Inc. Todos los derechos reservados. Solo para fines académicos.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/terms"
                className="text-white/40 hover:text-gold text-sm transition-colors"
              >
                Términos
              </Link>
              <Link
                to="/privacy"
                className="text-white/40 hover:text-gold text-sm transition-colors"
              >
                Privacidad
              </Link>
              <Link
                to="/cookies"
                className="text-white/40 hover:text-gold text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
