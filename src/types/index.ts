/**
 * ============================================
 * TIPOS DE DATOS - ANIME CASINO
 * ============================================
 * 
 * Este archivo define todas las interfaces y tipos de TypeScript
 * que se usan en toda la aplicación. Los tipos ayudan a:
 * 1. Definir la estructura de los datos
 * 2. Detectar errores antes de ejecutar
 * 3. Facilitar el autocompletado en el editor
 */

/**
 * Interface User - Representa un usuario del sistema
 * 
 * PROPIEDADES:
 * - id: Identificador único del usuario (string)
 * - username: Nombre de usuario para mostrar (string)
 * - email: Correo electrónico del usuario (string)
 * - role: Tipo de usuario - puede ser 'user' (normal) o 'admin' (premium)
 * - isPremium: Indica si el usuario tiene plan de pago (boolean)
 * - balance: Dinero disponible para jugar (number)
 * - createdAt: Fecha de creación de la cuenta (Date)
 * 
 * EJEMPLO DE USO:
 * const usuario: User = {
 *   id: '123',
 *   username: 'Juan',
 *   email: 'juan@email.com',
 *   role: 'user',
 *   isPremium: false,
 *   balance: 1000,
 *   createdAt: new Date()
 * };
 */
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isPremium: boolean;
  balance: number;
  createdAt: Date;
}

/**
 * Interface GameRoom - Representa una sala de juego privada
 * 
 * PROPIEDADES:
 * - id: Identificador único de la sala
 * - name: Nombre de la sala
 * - type: Tipo de juego ('roulette', 'poker', 'slots')
 * - ownerId: ID del usuario que creó la sala
 * - ownerName: Nombre del dueño de la sala
 * - isPrivate: Si la sala es privada (siempre true)
 * - maxPlayers: Máximo número de jugadores permitidos
 * - currentPlayers: Cantidad actual de jugadores en la sala
 * - createdAt: Fecha de creación de la sala
 */
export interface GameRoom {
  id: string;
  name: string;
  type: 'roulette' | 'poker' | 'slots';
  ownerId: string;
  ownerName: string;
  isPrivate: boolean;
  maxPlayers: number;
  currentPlayers: number;
  createdAt: Date;
}

/**
 * Interface Game - Representa un juego disponible en el casino
 * 
 * PROPIEDADES:
 * - id: Identificador único del juego
 * - name: Nombre del juego
 * - description: Descripción del juego
 * - image: Ruta de la imagen del juego
 * - path: Ruta URL para acceder al juego
 * - minBet: Apuesta mínima permitida
 * - maxBet: Apuesta máxima permitida
 */
export interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
  minBet: number;
  maxBet: number;
}

/**
 * Interface AuthState - Estado de autenticación de la aplicación
 * 
 * PROPIEDADES:
 * - user: Datos del usuario actual (null si no hay sesión)
 * - isAuthenticated: Indica si hay un usuario logueado
 * - isLoading: Indica si está cargando la autenticación
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Interface LoginCredentials - Datos necesarios para iniciar sesión
 * 
 * PROPIEDADES:
 * - email: Correo electrónico del usuario
 * - password: Contraseña del usuario
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interface RegisterData - Datos necesarios para registrarse
 * 
 * PROPIEDADES:
 * - username: Nombre de usuario elegido
 * - email: Correo electrónico
 * - password: Contraseña
 * - role: Tipo de cuenta ('user' gratis o 'admin' premium)
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

/**
 * Interface PremiumPlan - Plan de suscripción premium
 * 
 * PROPIEDADES:
 * - id: Identificador del plan
 * - name: Nombre del plan
 * - price: Precio en dólares
 * - duration: Duración de la suscripción
 * - features: Lista de características incluidas
 */
export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}
