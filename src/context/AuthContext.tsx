/**
 * ============================================
 * CONTEXTO DE AUTENTICACIÓN - ANIME CASINO
 * ============================================
 * 
 * ¿QUÉ ES UN CONTEXTO EN REACT?
 * Un contexto es una forma de compartir datos entre componentes sin tener que
 * pasar props manualmente por cada nivel del árbol de componentes.
 * 
 * ¿PARA QUÉ SIRVE ESTE ARCHIVO?
 * Este archivo crea el AuthContext que maneja toda la lógica de autenticación
 * de usuarios: login, registro, logout y actualización a premium.
 * 
 * CONCEPTOS CLAVE:
 * - createContext: Crea el contexto
 * - useContext: Hook para acceder al contexto desde componentes
 * - Provider: Componente que provee el contexto a sus hijos
 */

import { createContext, useContext, useState, useCallback } from 'react';
import type { User, LoginCredentials, RegisterData } from '@/types';

/**
 * Interface AuthContextType - Define la estructura del contexto
 * 
 * Esta interface define qué datos y funciones estarán disponibles
 * en todo el árbol de componentes que usen este contexto.
 */
interface AuthContextType {
  user: User | null;                    // Datos del usuario actual
  isAuthenticated: boolean;             // Si hay sesión activa
  isLoading: boolean;                   // Si está cargando
  login: (credentials: LoginCredentials) => Promise<boolean>;      // Función de login
  register: (data: RegisterData) => Promise<boolean>;              // Función de registro
  logout: () => void;                   // Función de logout
  upgradeToPremium: () => Promise<boolean>;  // Función para actualizar a premium
}

/**
 * createContext - Crea el contexto de autenticación
 * 
 * El valor inicial es 'undefined' porque el contexto real
 * se provee mediante el AuthProvider.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider - Componente que provee el contexto a toda la aplicación
 * 
 * USO:
 * <AuthProvider>
 *   <App />  // Todos los componentes dentro pueden usar el contexto
 * </AuthProvider>
 * 
 * PROPS:
 * - children: Componentes hijos que tendrán acceso al contexto
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  // ============================================
  // ESTADOS DEL CONTEXTO
  // ============================================
  
  /**
   * user - Almacena los datos del usuario actual
   * Inicialmente es null porque no hay usuario logueado
   */
  const [user, setUser] = useState<User | null>(null);
  
  /**
   * isAuthenticated - Indica si hay una sesión activa
   * Se calcula automáticamente: true si user no es null
   */
  const isAuthenticated = user !== null;
  
  /**
   * isLoading - Indica si hay operaciones de autenticación en curso
   * Se usa para mostrar indicadores de carga en botones
   */
  const [isLoading, setIsLoading] = useState(false);

  // ============================================
  // FUNCIONES DE AUTENTICACIÓN
  // ============================================

  /**
   * login - Función para iniciar sesión
   * 
   * PARÁMETROS:
   * - credentials: Objeto con email y password
   * 
   * RETORNA:
   * - Promise<boolean>: true si el login fue exitoso, false si falló
   * 
   * FUNCIONAMIENTO:
   * 1. Muestra el estado de carga
   * 2. Simula una llamada a API con setTimeout
   * 3. Verifica las credenciales contra datos de demo
   * 4. Si son correctas, guarda el usuario en el estado
   * 5. Oculta el estado de carga
   * 
   * NOTA: En una app real, aquí se haría una llamada fetch() a un servidor
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    // Activar estado de carga
    setIsLoading(true);
    
    // Simular delay de red (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // CREDENCIALES DE DEMO
    // En una app real, esto se verificaría contra una base de datos
    
    // Verificar credenciales de administrador
    if (credentials.email === 'admin@animecasino.com' && credentials.password === 'admin') {
      const adminUser: User = {
        id: '1',
        username: 'Admin',
        email: 'admin@animecasino.com',
        role: 'admin',           // Rol de administrador
        isPremium: true,         // Tiene plan premium
        balance: 10000,          // Balance inicial alto
        createdAt: new Date(),
      };
      setUser(adminUser);        // Guardar usuario en el estado
      setIsLoading(false);       // Desactivar carga
      return true;               // Login exitoso
    }
    
    // Verificar credenciales de usuario normal
    if (credentials.email === 'user@animecasino.com' && credentials.password === 'user') {
      const normalUser: User = {
        id: '2',
        username: 'Jugador',
        email: 'user@animecasino.com',
        role: 'user',            // Rol normal
        isPremium: false,        // No tiene premium
        balance: 1000,           // Balance inicial estándar
        createdAt: new Date(),
      };
      setUser(normalUser);
      setIsLoading(false);
      return true;
    }
    
    // Si las credenciales no coinciden
    setIsLoading(false);
    return false;                // Login fallido
  }, []); // Array vacío = función no depende de variables externas

  /**
   * register - Función para registrar un nuevo usuario
   * 
   * PARÁMETROS:
   * - data: Objeto con username, email, password y role
   * 
   * RETORNA:
   * - Promise<boolean>: true si el registro fue exitoso
   * 
   * FUNCIONAMIENTO:
   * 1. Muestra estado de carga
   * 2. Simula llamada a API
   * 3. Crea un nuevo objeto User
   * 4. Guarda el usuario en el estado
   * 5. El usuario queda automáticamente logueado
   */
  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de red (1000ms)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Crear nuevo usuario con datos del formulario
    const newUser: User = {
      id: Date.now().toString(),  // ID único basado en timestamp
      username: data.username,
      email: data.email,
      role: data.role,
      // Si el rol es admin, automáticamente es premium
      isPremium: data.role === 'admin',
      // Balance inicial según el tipo de cuenta
      balance: data.role === 'admin' ? 5000 : 1000,
      createdAt: new Date(),
    };
    
    setUser(newUser);              // Guardar usuario
    setIsLoading(false);
    return true;
  }, []);

  /**
   * logout - Función para cerrar sesión
   * 
   * FUNCIONAMIENTO:
   * Simplemente limpia el estado del usuario a null
   */
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  /**
   * upgradeToPremium - Función para actualizar a plan premium
   * 
   * RETORNA:
   * - Promise<boolean>: true si la actualización fue exitosa
   * 
   * FUNCIONAMIENTO:
   * 1. Verifica que haya un usuario logueado
   * 2. Simula el proceso de pago
   * 3. Actualiza el usuario: isPremium = true, role = 'admin'
   */
  const upgradeToPremium = useCallback(async (): Promise<boolean> => {
    if (!user) return false;       // No hay usuario logueado
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Actualizar usuario con beneficios premium
    setUser({
      ...user,                     // Mantener datos existentes
      isPremium: true,             // Activar premium
      role: 'admin',               // Cambiar rol a admin
    });
    
    setIsLoading(false);
    return true;
  }, [user]); // Depende de 'user' porque lo usa en la función

  // ============================================
  // RENDERIZADO DEL PROVIDER
  // ============================================
  
  /**
   * AuthContext.Provider - Provee el contexto a los componentes hijos
   * 
   * El objeto 'value' contiene todos los datos y funciones que estarán
   * disponibles para los componentes que usen useAuthContext()
   */
  return (
    <AuthContext.Provider
      value={{
        user,              // Datos del usuario
        isAuthenticated,   // Estado de autenticación
        isLoading,         // Estado de carga
        login,             // Función login
        register,          // Función register
        logout,            // Función logout
        upgradeToPremium,  // Función upgrade
      }}
    >
      {children}           {/* Componentes hijos */}
    </AuthContext.Provider>
  );
}

/**
 * useAuthContext - Hook personalizado para acceder al contexto
 * 
 * USO:
 * const { user, login, logout } = useAuthContext();
 * 
 * ¿POR QUÉ USAR UN HOOK?
 * - Facilita el acceso al contexto
 * - Proporciona mensaje de error si se usa fuera del Provider
 * 
 * RETORNA:
 * - El objeto AuthContextType con todos los datos y funciones
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  
  // Verificar que el hook se use dentro del Provider
  if (context === undefined) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  
  return context;
}
