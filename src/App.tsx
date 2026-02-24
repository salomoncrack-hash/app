/**
 * ============================================
 * COMPONENTE PRINCIPAL - ANIME CASINO
 * ============================================
 * 
 * ¿QUÉ ES App.tsx?
 * Este es el componente raíz de la aplicación. Es el primer componente
 * que se renderiza y contiene toda la estructura de la aplicación.
 * 
 * RESPONSABILIDADES:
 * 1. Configurar el enrutamiento (React Router)
 * 2. Proveer el contexto de autenticación
 * 3. Configurar notificaciones (Toaster)
 * 4. Definir las rutas de la aplicación
 * 
 * FLUJO DE LA APLICACIÓN:
 * App.tsx
 *   ├── AuthProvider (Contexto de autenticación)
 *   │     └── Router (Enrutador)
 *   │           ├── Routes (Rutas)
 *   │           │     ├── /login (LoginPage)
 *   │           │     ├── /register (RegisterPage)
 *   │           │     └── /* (Rutas con Header y Footer)
 *   │           │           ├── / (HomePage)
 *   │           │           ├── /games (GamesPage)
 *   │           │           ├── /games/roulette (RoulettePage)
 *   │           │           ├── /games/poker (PokerPage)
 *   │           │           └── /games/slots (SlotsPage)
 *   │           └── Toaster (Notificaciones)
 */

// ============================================
// IMPORTACIONES
// ============================================

/**
 * BrowserRouter - Componente de React Router que habilita el enrutamiento
 * 
 * ¿Qué hace? Permite que la aplicación tenga múltiples "páginas" sin
 * recargar el navegador (Single Page Application - SPA).
 * 
 * Alternativas: HashRouter (usa # en la URL), MemoryRouter (para pruebas)
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 * Toaster - Componente de notificaciones de la biblioteca Sonner
 * 
 * ¿Qué hace? Muestra mensajes emergentes (toast) para notificar al usuario
 * sobre acciones exitosas, errores, etc.
 */
import { Toaster } from 'sonner';

/**
 * AuthProvider - Contexto de autenticación personalizado
 * 
 * ¿Qué hace? Provee el estado de autenticación a toda la aplicación.
 * Ver src/context/AuthContext.tsx para más detalles.
 */
import { AuthProvider } from '@/context/AuthContext';

/**
 * Header - Barra de navegación superior
 * 
 * ¿Qué hace? Muestra el logo, enlaces de navegación y datos del usuario.
 * Aparece en todas las páginas excepto login y registro.
 */
import { Header } from '@/components/Header';

/**
 * Footer - Pie de página
 * 
 * ¿Qué hace? Muestra información de contacto, enlaces útiles y copyright.
 * Aparece en todas las páginas excepto login y registro.
 */
import { Footer } from '@/components/Footer';

/**
 * Páginas de la aplicación
 * 
 * Cada página es un componente que representa una ruta completa.
 * Se importan desde la carpeta src/pages/
 */
import { HomePage } from '@/pages/HomePage';           // Página de inicio
import { LoginPage } from '@/pages/LoginPage';         // Página de login
import { RegisterPage } from '@/pages/RegisterPage';   // Página de registro
import { GamesPage } from '@/pages/GamesPage';         // Página de juegos
import { RoulettePage } from '@/pages/RoulettePage';   // Juego de ruleta
import { PokerPage } from '@/pages/PokerPage';         // Juego de póker
import { SlotsPage } from '@/pages/SlotsPage';         // Juego de tragaperras

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

/**
 * App - Componente raíz de la aplicación
 * 
 * ESTRUCTURA:
 * 1. AuthProvider envuelve todo para proveer autenticación
 * 2. Router habilita el enrutamiento
 * 3. Toaster muestra notificaciones
 * 4. Routes define las rutas disponibles
 */
function App() {
  return (
    /**
     * AuthProvider - Provee el contexto de autenticación
     * 
     * Todos los componentes dentro pueden acceder a:
     * - user: Datos del usuario
     * - isAuthenticated: Si hay sesión
     * - login, register, logout: Funciones de autenticación
     */
    <AuthProvider>
      {/* Router - Habilita la navegación entre páginas */}
      <Router>
        {/**
         * Contenedor principal con estilos base:
         * - min-h-screen: Altura mínima = altura de la pantalla
         * - w-full: Ancho completo
         * - bg-[hsl(var(--black))]: Fondo negro
         * - text-white: Texto blanco
         */}
        <div className="min-h-screen w-full bg-[hsl(var(--black))] text-white">
          
          {/* 
            Toaster - Sistema de notificaciones
            
            PROPIEDADES:
            - position="top-center": Las notificaciones aparecen arriba centrado
            - toastOptions: Configuración visual de las notificaciones
          */}
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                background: 'hsl(var(--dark-gray))',  // Fondo oscuro
                color: 'white',                        // Texto blanco
                border: '1px solid hsl(var(--gold) / 0.3)',  // Borde dorado
              },
            }}
          />
          
          {/* 
            Routes - Define las rutas de la aplicación
            
            Cada Route tiene:
            - path: La URL que activa la ruta
            - element: El componente que se renderiza
          */}
          <Routes>
            
            {/* ============================================
                RUTAS DE AUTENTICACIÓN (Sin Header/Footer)
                ============================================ */}
            
            {/**
             * Ruta: /login
             * Página de inicio de sesión
             * No tiene Header ni Footer para enfocar al usuario en el formulario
             */}
            <Route path="/login" element={<LoginPage />} />
            
            {/**
             * Ruta: /register
             * Página de registro
             * Tampoco tiene Header ni Footer
             */}
            <Route path="/register" element={<RegisterPage />} />
            
            {/* ============================================
                RUTAS PRINCIPALES (Con Header y Footer)
                ============================================ */}
            
            {/**
             * Ruta: /* (comodín)
             * Captura todas las rutas que no coincidan con las anteriores
             * Incluye Header y Footer
             */}
            <Route
              path="/*"
              element={
                <>
                  {/* Header - Barra de navegación */}
                  <Header />
                  
                  {/* Sub-rutas dentro de las rutas con Header/Footer */}
                  <Routes>
                    {/**
                     * Ruta: /
                     * Página de inicio (Home)
                     * Muestra Hero, juegos, características, testimonios, CTA
                     */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/**
                     * Ruta: /games
                     * Página de listado de juegos
                     * Muestra todos los juegos disponibles y salas privadas
                     */}
                    <Route path="/games" element={<GamesPage />} />
                    
                    {/**
                     * Ruta: /games/roulette
                     * Juego de ruleta
                     */}
                    <Route path="/games/roulette" element={<RoulettePage />} />
                    
                    {/**
                     * Ruta: /games/poker
                     * Juego de póker
                     */}
                    <Route path="/games/poker" element={<PokerPage />} />
                    
                    {/**
                     * Ruta: /games/slots
                     * Juego de tragaperras
                     */}
                    <Route path="/games/slots" element={<SlotsPage />} />
                  </Routes>
                  
                  {/* Footer - Pie de página */}
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// ============================================
// EXPORTACIÓN
// ============================================

/**
 * Exportamos App como default para que sea el punto de entrada
 * Ver src/main.tsx para ver cómo se usa
 */
export default App;
