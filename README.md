# 🎰 Anime Casino - Guía de Aprendizaje

Este proyecto es una aplicación web de casino con temática anime, desarrollada con **React**, **TypeScript**, **Tailwind CSS** y **Vite**.

---

## 📚 Índice

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación y Ejecución](#instalación-y-ejecución)
4. [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
5. [Componentes Principales](#componentes-principales)
6. [Sistema de Autenticación](#sistema-de-autenticación)
7. [Juegos Implementados](#juegos-implementados)
8. [Estilos y Diseño](#estilos-y-diseño)

---

## 📁 Estructura del Proyecto

```
/mnt/okcomputer/output/app/
├── public/                    # Archivos estáticos (imágenes, fuentes)
│   ├── hero-character.png     # Imagen principal del personaje anime
│   ├── game-roulette.jpg      # Imagen del juego de ruleta
│   ├── game-poker.jpg         # Imagen del juego de póker
│   ├── game-slots.jpg         # Imagen del juego de tragaperras
│   ├── about-image.jpg        # Imagen de la sección "Nosotros"
│   ├── faq-image.jpg          # Imagen de la sección FAQ
│   └── avatar-*.jpg           # Avatares de usuarios de testimonios
│
├── src/                       # Código fuente de la aplicación
│   ├── components/            # Componentes reutilizables de UI
│   │   ├── Header.tsx         # Barra de navegación superior
│   │   └── Footer.tsx         # Pie de página
│   │
│   ├── sections/              # Secciones de la página principal
│   │   ├── HeroSection.tsx    # Sección de bienvenida (banner principal)
│   │   ├── GamesSection.tsx   # Sección que muestra los juegos disponibles
│   │   ├── WhyChooseUsSection.tsx  # Sección de características/ventajas
│   │   ├── TestimonialsSection.tsx # Sección de testimonios de usuarios
│   │   └── CTASection.tsx     # Sección de llamada a la acción (registro)
│   │
│   ├── pages/                 # Páginas completas de la aplicación
│   │   ├── HomePage.tsx       # Página de inicio
│   │   ├── LoginPage.tsx      # Página de inicio de sesión
│   │   ├── RegisterPage.tsx   # Página de registro
│   │   ├── GamesPage.tsx      # Página de listado de juegos
│   │   ├── RoulettePage.tsx   # Página del juego de ruleta
│   │   ├── PokerPage.tsx      # Página del juego de póker
│   │   └── SlotsPage.tsx      # Página del juego de tragaperras
│   │
│   ├── context/               # Contextos de React (estado global)
│   │   └── AuthContext.tsx    # Contexto de autenticación de usuarios
│   │
│   ├── hooks/                 # Custom Hooks de React
│   │   └── useAuth.ts         # Hook para manejar la autenticación
│   │
│   ├── types/                 # Definiciones de tipos TypeScript
│   │   └── index.ts           # Interfaces y tipos de datos
│   │
│   ├── components/ui/         # Componentes de UI de shadcn/ui
│   │   ├── button.tsx         # Componente Botón
│   │   ├── input.tsx          # Componente Input
│   │   ├── dialog.tsx         # Componente Dialog/Modal
│   │   └── ...                # Otros componentes UI
│   │
│   ├── App.tsx                # Componente principal de la aplicación
│   ├── main.tsx               # Punto de entrada de la aplicación
│   └── index.css              # Estilos globales y variables CSS
│
├── index.html                 # Archivo HTML principal
├── vite.config.ts             # Configuración de Vite
├── tailwind.config.js         # Configuración de Tailwind CSS
├── tsconfig.json              # Configuración de TypeScript
└── package.json               # Dependencias del proyecto
```

---

## 🛠 Tecnologías Utilizadas

### 1. **React** (Biblioteca principal)
- **¿Qué es?** Biblioteca de JavaScript para construir interfaces de usuario.
- **¿Para qué sirve?** Permite crear componentes reutilizables que se actualizan automáticamente cuando cambian los datos.
- **Ejemplo en este proyecto:** Los componentes `Header`, `Footer`, `HeroSection`, etc.

### 2. **TypeScript** (Superset de JavaScript)
- **¿Qué es?** JavaScript con tipos estáticos.
- **¿Para qué sirve?** Ayuda a detectar errores antes de ejecutar el código y facilita el autocompletado.
- **Ejemplo:** `interface User { id: string; username: string; }`

### 3. **Vite** (Herramienta de construcción)
- **¿Qué es?** Un "build tool" moderno y rápido.
- **¿Para qué sirve?** Compila el código, inicia el servidor de desarrollo y optimiza para producción.
- **Comandos:**
  - `npm run dev` - Inicia servidor de desarrollo
  - `npm run build` - Compila para producción

### 4. **Tailwind CSS** (Framework de CSS)
- **¿Qué es?** Framework de utilidades CSS.
- **¿Para qué sirve?** Permite escribir estilos directamente en las clases HTML sin necesidad de archivos CSS separados.
- **Ejemplo:** `className="bg-black text-white p-4 rounded-lg"`

### 5. **shadcn/ui** (Biblioteca de componentes)
- **¿Qué es?** Colección de componentes UI reutilizables construidos con Tailwind.
- **¿Para qué sirve?** Proporciona componentes como botones, inputs, modales, etc., ya estilizados.

### 6. **React Router DOM** (Enrutamiento)
- **¿Qué es?** Biblioteca para manejar la navegación entre páginas.
- **¿Para qué sirve?** Permite crear una SPA (Single Page Application) donde el usuario puede navegar sin recargar la página.
- **Ejemplo:** `<Link to="/games">Juegos</Link>`

### 7. **Lucide React** (Iconos)
- **¿Qué es?** Biblioteca de iconos SVG.
- **¿Para qué sirve?** Proporciona iconos vectoriales que se pueden personalizar con CSS.
- **Ejemplo:** `<User className="w-5 h-5" />`

---

## 🚀 Instalación y Ejecución

### Paso 1: Instalar dependencias
```bash
cd /mnt/okcomputer/output/app
npm install
```

### Paso 2: Iniciar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Paso 3: Compilar para producción
```bash
npm run build
```
Los archivos compilados se guardan en la carpeta `dist/`

---

## 🏗 Arquitectura de la Aplicación

### Flujo de Datos

```
Usuario
   ↓
[React Router] → Determina qué página mostrar
   ↓
[Página] → Renderiza componentes y secciones
   ↓
[Componentes] → Usan hooks y contextos
   ↓
[Contextos] → Proveen estado global (ej: usuario autenticado)
   ↓
[Hooks] → Lógica reutilizable
```

### Conceptos Clave

#### 1. **Componentes Funcionales**
Los componentes en React son funciones que retornan JSX (HTML-like).

```tsx
// Ejemplo de componente simple
function Saludo({ nombre }: { nombre: string }) {
  return <h1>¡Hola, {nombre}!</h1>;
}
```

#### 2. **Props (Propiedades)**
Son los "argumentos" que se pasan a los componentes.

```tsx
// Uso del componente
<Saludo nombre="Juan" />
```

#### 3. **State (Estado)**
Datos que pueden cambiar y causar que el componente se actualice.

```tsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0); // Estado inicial: 0
  
  return (
    <button onClick={() => setContador(contador + 1)}>
      Clics: {contador}
    </button>
  );
}
```

#### 4. **Hooks**
Funciones especiales de React que permiten usar estado y otras características.

- `useState` - Manejar estado
- `useEffect` - Ejecutar código cuando cambian dependencias
- `useContext` - Acceder a contextos

#### 5. **Context API**
Sistema para compartir datos entre componentes sin pasar props manualmente.

```tsx
// Crear contexto
const AuthContext = createContext(null);

// Proveer contexto
<AuthContext.Provider value={datos}>
  <App />
</AuthContext.Provider>

// Usar contexto
const datos = useContext(AuthContext);
```

---

## 🧩 Componentes Principales

### 1. **Header.tsx** - Barra de Navegación

**¿Qué hace?**
- Muestra el logo de la aplicación
- Contiene los enlaces de navegación (Inicio, Juegos, Nosotros, Contacto)
- Muestra el balance del usuario cuando está autenticado
- Cambia de apariencia al hacer scroll (efecto glassmorphism)

**Conceptos aplicados:**
- `useState` para controlar el menú móvil
- `useEffect` para detectar el scroll
- `useLocation` de React Router para saber en qué página estamos
- Renderizado condicional según si el usuario está autenticado

### 2. **Footer.tsx** - Pie de Página

**¿Qué hace?**
- Muestra información de la empresa
- Enlaces rápidos a páginas importantes
- Información de contacto
- Redes sociales

### 3. **HeroSection.tsx** - Sección Principal

**¿Qué hace?**
- Es la primera sección que ve el usuario
- Muestra el título principal con animaciones
- Contiene botones de llamada a la acción
- Muestra estadísticas impresionantes
- Tiene efectos visuales (partículas flotantes, gradientes)

**Conceptos aplicados:**
- `useRef` para acceder al elemento DOM
- Eventos del mouse para efectos 3D
- Animaciones CSS personalizadas

### 4. **GamesSection.tsx** - Sección de Juegos

**¿Qué hace?**
- Muestra tarjetas con los juegos disponibles
- Cada tarjeta tiene imagen, descripción y botón para jugar
- Animaciones al hacer scroll (aparición progresiva)

**Conceptos aplicados:**
- `IntersectionObserver` para detectar cuando elementos entran en pantalla
- Animaciones de entrada con delays escalonados

---

## 🔐 Sistema de Autenticación

### Archivos involucrados:
- `src/context/AuthContext.tsx`
- `src/hooks/useAuth.ts`
- `src/types/index.ts`

### ¿Cómo funciona?

1. **Tipos de datos** (`types/index.ts`):
```typescript
interface User {
  id: string;           // Identificador único
  username: string;     // Nombre de usuario
  email: string;        // Correo electrónico
  role: 'user' | 'admin';  // Tipo de usuario
  isPremium: boolean;   // Si tiene plan premium
  balance: number;      // Dinero disponible
}
```

2. **Contexto de Autenticación** (`AuthContext.tsx`):
   - Provee el estado del usuario a toda la aplicación
   - Contiene funciones: `login`, `register`, `logout`, `upgradeToPremium`
   - Usa datos de demostración (mock data)

3. **Hook personalizado** (`useAuth.ts`):
   - Encapsula la lógica de autenticación
   - Facilita reutilizar la lógica en diferentes componentes

### Flujo de Login:
```
Usuario ingresa credenciales
        ↓
Se llama a la función login()
        ↓
Se validan credenciales (mock)
        ↓
Se actualiza el estado del usuario
        ↓
Se redirige a la página principal
```

---

## 🎮 Juegos Implementados

### 1. **Ruleta** (`RoulettePage.tsx`)

**¿Cómo funciona?**
- Muestra una rueda de ruleta animada con SVG
- El usuario selecciona el monto de apuesta
- El usuario elige una opción de apuesta (Rojo, Negro, Par, Impar, etc.)
- Al hacer clic en "GIRAR", la rueda gira con animación CSS
- Se determina el resultado aleatoriamente
- Se calcula si ganó o perdió según la apuesta

**Lógica importante:**
```typescript
// Números de la ruleta con sus colores
const rouletteNumbers = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' },
  { number: 15, color: 'black' },
  // ... más números
];

// Cálculo de la rotación
const degreesPerNumber = 360 / 37; // 37 números en total
const targetRotation = 360 * 5 + (360 - winningIndex * degreesPerNumber);
```

### 2. **Póker** (`PokerPage.tsx`)

**¿Cómo funciona?**
- Video póker estilo "Jacks or Better"
- Se reparten 5 cartas
- El usuario puede "mantener" (hold) las cartas que quiere conservar
- Al hacer clic en "ROBAR", se reemplazan las cartas no mantenidas
- Se evalúa la mano final y se calcula la ganancia

**Evaluación de manos:**
```typescript
// Función que determina qué mano tiene el jugador
function evaluateHand(hand: Card[]): { name: string; multiplier: number } {
  // Verifica: Escalera Real, Escalera de Color, Póker, Full House, etc.
  // Retorna el nombre de la mano y el multiplicador de ganancia
}
```

### 3. **Tragaperras** (`SlotsPage.tsx`)

**¿Cómo funciona?**
- Muestra 3 carretes con símbolos
- El usuario selecciona el monto de apuesta
- Al hacer clic en "GIRAR", los carretes giran con animación
- Se detienen en símbolos aleatorios
- Si hay coincidencias, se calcula la ganancia según la tabla de pagos

**Tabla de pagos:**
```typescript
const payouts = {
  '7️⃣7️⃣7️⃣': 50,  // Tres 7s = 50x la apuesta
  '💎💎💎': 30,   // Tres diamantes = 30x
  '🎰🎰🎰': 20,   // Tres casinos = 20x
  // ... más combinaciones
};
```

---

## 🎨 Estilos y Diseño

### Variables CSS (`index.css`)

Las variables CSS permiten definir colores y valores reutilizables:

```css
:root {
  /* Colores principales */
  --gold: 38 45% 65%;           /* Dorado principal */
  --gold-light: 42 60% 85%;     /* Dorado claro */
  --burgundy: 355 40% 32%;      /* Vinotinto */
  --black: 0 0% 4%;             /* Negro */
  
  /* Uso: hsl(var(--gold)) */
}
```

### Clases de Utilidad Tailwind

Tailwind proporciona clases predefinidas:

```html
<!-- Ejemplos de clases Tailwind -->
<div class="bg-black text-white p-4 rounded-lg shadow-lg">
  <!-- bg-black: fondo negro -->
  <!-- text-white: texto blanco -->
  <!-- p-4: padding de 1rem -->
  <!-- rounded-lg: bordes redondeados -->
  <!-- shadow-lg: sombra grande -->
</div>
```

### Efectos Especiales

1. **Glassmorphism** (efecto vidrio):
```css
.glass {
  background: hsl(var(--black) / 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--gold) / 0.2);
}
```

2. **Gradientes**:
```css
.gradient-gold {
  background: linear-gradient(135deg, 
    hsl(var(--gold-light)) 0%, 
    hsl(var(--gold)) 50%, 
    hsl(var(--gold-dark)) 100%
  );
}
```

3. **Animaciones**:
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

---

## 📖 Conceptos de React Explicados

### JSX
JSX es una extensión de JavaScript que permite escribir HTML dentro de JavaScript:

```tsx
// JSX
const elemento = <h1 className="titulo">Hola Mundo</h1>;

// Se convierte en:
const elemento = React.createElement('h1', { className: 'titulo' }, 'Hola Mundo');
```

### Componentes
Los componentes son bloques de construcción reutilizables:

```tsx
// Componente funcional
function Tarjeta({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  return (
    <div className="tarjeta">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
}

// Uso
<Tarjeta titulo="Mi Título" descripcion="Mi descripción" />
```

### Eventos
Manejo de interacciones del usuario:

```tsx
function Boton() {
  const handleClick = () => {
    alert('¡Botón clickeado!');
  };
  
  return <button onClick={handleClick}>Clickeame</button>;
}
```

### Renderizado Condicional
Mostrar diferentes contenidos según condiciones:

```tsx
function Saludo({ usuario }: { usuario: User | null }) {
  if (usuario) {
    return <h1>Bienvenido, {usuario.nombre}</h1>;
  }
  
  return <h1>Por favor inicia sesión</h1>;
}

// O con operador ternario
function Saludo2({ usuario }: { usuario: User | null }) {
  return (
    <h1>
      {usuario ? `Bienvenido, ${usuario.nombre}` : 'Por favor inicia sesión'}
    </h1>
  );
}
```

### Listas y Keys
Renderizar listas de elementos:

```tsx
function ListaDeJuegos({ juegos }: { juegos: Game[] }) {
  return (
    <ul>
      {juegos.map((juego) => (
        <li key={juego.id}> {/* Key único para cada elemento */}
          {juego.nombre}
        </li>
      ))}
    </ul>
  );
}
```

---

## 🎯 Ejercicios de Aprendizaje

### Ejercicio 1: Modificar el Hero
Cambia el texto del HeroSection para mostrar tu nombre.

### Ejercicio 2: Agregar un Nuevo Juego
Crea una nueva página de juego siguiendo el patrón de los existentes.

### Ejercicio 3: Cambiar Colores
Modifica las variables CSS en `index.css` para usar diferentes colores.

### Ejercicio 4: Agregar Validación
Agrega validación de email en el formulario de registro.

---

## 📚 Recursos de Aprendizaje

- [Documentación de React](https://react.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

---

## ❓ Preguntas Frecuentes

**¿Por qué usar TypeScript en lugar de JavaScript?**
TypeScript ayuda a detectar errores antes de ejecutar el código y facilita el mantenimiento de proyectos grandes.

**¿Qué es un "Hook" en React?**
Es una función especial que permite "enganchar" funcionalidades de React (como estado) a componentes funcionales.

**¿Por qué usar Tailwind CSS?**
Permite desarrollar más rápido sin escribir CSS personalizado, y mantiene consistencia en el diseño.

**¿Qué es el "estado" en React?**
Son datos que, cuando cambian, hacen que el componente se vuelva a renderizar automáticamente.

---

¡Feliz aprendizaje! 🚀
