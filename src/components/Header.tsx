/**
 * ============================================
 * COMPONENTE HEADER - BARRA DE NAVEGACIÓN
 * ============================================
 * 
 * ¿QUÉ ES ESTE COMPONENTE?
 * El Header es la barra de navegación superior que aparece en todas
 * las páginas de la aplicación (excepto login y registro).
 * 
 * FUNCIONALIDADES:
 * 1. Logo clickeable que lleva al inicio
 * 2. Enlaces de navegación (Inicio, Juegos, Nosotros, Contacto)
 * 3. Indicador visual de la página actual
 * 4. Balance del usuario (cuando está autenticado)
 * 5. Menú de usuario con opción de logout
 * 6. Botones de Login/Registro (cuando NO está autenticado)
 * 7. Menú hamburguesa para móviles
 * 8. Efecto de cristal al hacer scroll
 * 
 * CONCEPTOS DE REACT APLICADOS:
 * - useState: Para controlar el estado del menú móvil y el scroll
 * - useEffect: Para detectar cuando el usuario hace scroll
 * - useLocation: Para saber en qué página estamos
 * - useAuthContext: Para acceder a los datos del usuario
 * - Renderizado condicional: Mostrar diferentes UI según autenticación
 * - Responsive design: Adaptarse a diferentes tamaños de pantalla
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Coins, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';

/**
 * Componente Header - Barra de navegación principal
 * 
 * NO RECIBE PROPS - Obtiene todos los datos del contexto de autenticación
 */
export function Header() {
  
  // ============================================
  // ESTADOS LOCALES
  // ============================================
  
  /**
   * isScrolled - Indica si el usuario ha hecho scroll
   * 
   * Se usa para cambiar el estilo del header:
   * - false: Header transparente (en la parte superior)
   * - true: Header con efecto glass (después de hacer scroll)
   */
  const [isScrolled, setIsScrolled] = useState(false);
  
  /**
   * isMobileMenuOpen - Controla el menú móvil
   * 
   * En pantallas pequeñas, el menú se oculta y se muestra
   * con un botón hamburguesa.
   * - false: Menú cerrado
   * - true: Menú abierto
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ============================================
  // DATOS DEL CONTEXTO
  // ============================================
  
  /**
   * useAuthContext - Hook personalizado que nos da acceso a:
   * - user: Datos del usuario logueado (null si no hay sesión)
   * - isAuthenticated: Booleano que indica si hay sesión
   * - logout: Función para cerrar sesión
   */
  const { user, isAuthenticated, logout } = useAuthContext();
  
  /**
   * useLocation - Hook de React Router
   * 
   * Nos da información sobre la URL actual.
   * Lo usamos para resaltar el enlace de la página activa.
   */
  const location = useLocation();

  // ============================================
  // EFECTOS (useEffect)
  // ============================================
  
  /**
   * useEffect - Detectar scroll del usuario
   * 
   * Este efecto se ejecuta UNA VEZ cuando el componente se monta.
   * Agrega un "event listener" al evento 'scroll' de la ventana.
   * 
   * FUNCIONAMIENTO:
   * 1. Cuando el usuario hace scroll, se ejecuta handleScroll
   * 2. Si scrollY > 100px, isScrolled = true
   * 3. Si scrollY <= 100px, isScrolled = false
   * 
   * LIMPIEZA:
   * El return () => removeEventListener limpia el listener
   * cuando el componente se desmonta (evita memory leaks)
   */
  useEffect(() => {
    /**
     * handleScroll - Función que se ejecuta al hacer scroll
     */
    const handleScroll = () => {
      // window.scrollY es la cantidad de píxeles desplazados verticalmente
      setIsScrolled(window.scrollY > 100);
    };

    // Agregar el event listener
    // { passive: true } mejora el rendimiento en móviles
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Función de limpieza (se ejecuta al desmontar el componente)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Array vacío = ejecutar solo al montar

  // ============================================
  // DATOS DE NAVEGACIÓN
  // ============================================
  
  /**
   * navLinks - Array con los enlaces de navegación
   * 
   * Cada objeto tiene:
   * - path: La ruta URL (ej: '/games')
   * - label: El texto que se muestra (ej: 'Juegos')
   * 
   * VENTAJA DE USAR UN ARRAY:
   * Si queremos agregar/quitar enlaces, solo modificamos este array
   * y el componente se actualiza automáticamente.
   */
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/games', label: 'Juegos' },
    { path: '/about', label: 'Nosotros' },
    { path: '/contact', label: 'Contacto' },
  ];

  /**
   * isActive - Función que determina si un enlace está activo
   * 
   * PARÁMETROS:
   * - path: La ruta del enlace
   * 
   * RETORNA:
   * - true si la ruta actual coincide con el path
   * - false si no coincide
   * 
   * USO:
   * Se usa para aplicar estilos diferentes al enlace activo
   */
  const isActive = (path: string) => location.pathname === path;

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    /**
     * Elemento <header> - Contenedor principal
     * 
     * CLASES DE TAILWIND EXPLICADAS:
     * - fixed: Posición fija (no se mueve al hacer scroll)
     * - top-0 left-0 right-0: Se extiende por todo el ancho superior
     * - z-50: Capa 50 (muy alta) para estar encima de todo
     * - transition-all duration-500: Transición suave de 500ms para todos los cambios
     * 
     * CLASES CONDICIONALES:
     * Si isScrolled es true:
     *   - glass: Efecto de cristal (definido en index.css)
     *   - border-b: Borde inferior
     * Si isScrolled es false:
     *   - bg-transparent: Fondo transparente
     */
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass border-b border-[hsl(var(--gold))]/30'
          : 'bg-transparent'
      }`}
    >
      {/* Contenedor con padding horizontal */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* 
          Contenedor flex que distribuye los elementos:
          - Logo a la izquierda
          - Navegación en el centro
          - Botones a la derecha
        */}
        <div className="flex items-center justify-between h-20">
          
          {/* ============================================
              LOGO
              ============================================ */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            {/* 
              Texto del logo
              - font-display: Fuente Cinzel Decorative
              - text-2xl: Tamaño de texto 1.5rem (24px)
              - font-bold: Negrita
              - text-gold: Color dorado
              - group-hover:text-gold-light: Cambia a dorado claro al pasar el mouse
            */}
            <span className="font-display text-2xl font-bold text-gold group-hover:text-gold-light transition-colors duration-300">
              Anime Casino
            </span>
            
            {/* 
              Línea decorativa debajo del logo
              - Se expande al pasar el mouse (group-hover:scale-x-100)
              - scale-x-0: Inicialmente invisible (escala 0 en X)
            */}
            <div className="w-8 h-0.5 bg-gradient-to-r from-[hsl(var(--gold))] to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>

          {/* ============================================
              NAVEGACIÓN DE ESCRITORIO
              ============================================
              
              - hidden md:flex: Oculto en móvil, visible en tablet/desktop
              - items-center gap-8: Elementos centrados con espacio de 2rem
          */}
          <nav className="hidden md:flex items-center gap-8">
            
            {/* Mapeamos el array navLinks para crear los enlaces */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  // Clases condicionales según si el enlace está activo
                  isActive(link.path)
                    ? 'text-gold'           // Activo: color dorado
                    : 'text-white/80 hover:text-gold'  // Inactivo: blanco con transparencia
                }`}
              >
                {link.label}
                
                {/* 
                  Punto indicador debajo del enlace activo
                  - absolute: Posición absoluta respecto al enlace
                  * -bottom-1: 4px debajo del texto
                  * left-1/2: Centrado horizontalmente
                  * w-1 h-1: Tamaño 4x4px
                  * rounded-full: Forma circular
                  
                  El punto aparece solo si el enlace está activo:
                  * isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                */}
                <span
                  className={`absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-gold transform -translate-x-1/2 transition-all duration-300 ${
                    isActive(link.path) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* ============================================
              SECCIÓN DERECHA (USUARIO O BOTONES)
              ============================================ */}
          
          {/* 
            Contenedor de la derecha
            - hidden md:flex: Solo visible en tablet/desktop
          */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* ----------------------------------------
                CASO 1: USUARIO AUTENTICADO
                ---------------------------------------- */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                
                {/* Balance del usuario */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                  {/* Icono de monedas de Lucide */}
                  <Coins className="w-4 h-4 text-gold" />
                  {/* Muestra el balance formateado con separadores de miles */}
                  <span className="text-sm font-medium text-gold">
                    {user.balance.toLocaleString()}
                  </span>
                </div>

                {/* Menú de usuario */}
                <div className="flex items-center gap-3">
                  
                  {/* Icono de corona si es premium */}
                  {user.isPremium && (
                    <Crown className="w-5 h-5 text-gold animate-pulse" />
                  )}
                  
                  {/* Avatar y nombre de usuario */}
                  <div className="flex items-center gap-2">
                    {/* Círculo con inicial del usuario */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--burgundy))] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {user.username}
                    </span>
                  </div>
                  
                  {/* Botón de cerrar sesión */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            ) : (
              
              /* ----------------------------------------
                 CASO 2: USUARIO NO AUTENTICADO
                 ---------------------------------------- */
              <div className="flex items-center gap-3">
                {/* Botón de iniciar sesión */}
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-white/80 hover:text-gold hover:bg-white/5"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                
                {/* Botón de registrarse (más destacado) */}
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold hover:shadow-lg hover:shadow-[hsl(var(--gold))]/30 transition-all duration-300">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ============================================
              BOTÓN MENÚ MÓVIL
              ============================================
              
              - md:hidden: Solo visible en móvil (oculto en tablet/desktop)
              - p-2: Padding de 8px
          */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gold transition-colors"
          >
            {/* 
              Icono condicional:
              - Si el menú está abierto: muestra X (cerrar)
              - Si el menú está cerrado: muestra Menu (hamburguesa)
            */}
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* ============================================
            MENÚ MÓVIL (DESPLEGABLE)
            ============================================ */}
        
        {/* 
          Contenedor del menú móvil
          - overflow-hidden: Oculta contenido que se desborda
          - transition-all duration-500: Animación suave
          
          Altura condicional:
          - Si isMobileMenuOpen: max-h-96 (altura máxima 384px)
          - Si no: max-h-0 (colapsado)
        */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          {/* Línea separadora */}
          <nav className="flex flex-col gap-4 pt-4 border-t border-white/10">
            
            {/* Enlaces de navegación móvil */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                // Cierra el menú al hacer clic en un enlace
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-gold'
                    : 'text-white/80 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* 
              Botones de autenticación móvil
              Solo se muestran si NO hay usuario autenticado
            */}
            {!isAuthenticated && (
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-black font-semibold">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
