# QuickBet Movies

Una aplicación moderna de descubrimiento de películas construida con las mejores prácticas de desarrollo web.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15.4.4 (App Router)
- **Frontend**: React 19
- **Gestión de Estado/Peticiones**: TanStack Query (React Query)
- **Cliente HTTP**: Axios
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui
- **Lenguaje**: TypeScript
- **Gestión de Paquetes**: Yarn
- **Linting**: ESLint + Prettier

## 📁 Estructura del Proyecto

El proyecto sigue la metodología **Atomic Design** para una organización escalable y mantenible:

```
src/
├── app/                    # Next.js App Router (páginas y layouts)
├── components/
│   ├── atoms/             # Componentes básicos (botones, inputs, labels)
│   ├── molecules/         # Combinaciones de atoms (formularios simples, cards)
│   ├── organisms/         # Componentes complejos (headers, footers, secciones)
│   ├── templates/         # Layouts y plantillas de página
│   └── ui/               # Componentes de shadcn/ui
├── providers/            # Providers de React (Query, Theme, etc.)
├── services/             # Lógica de peticiones HTTP y servicios externos
├── hooks/                # Custom hooks de React
├── utils/                # Funciones utilitarias
├── types/                # Definiciones de TypeScript
├── lib/                  # Configuraciones y utilidades de librerías
└── constants/            # Constantes de la aplicación
```

## 🛠️ Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd quickbet-movies
   ```

2. **Instalar dependencias**

   ```bash
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus variables
   ```

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
yarn dev

# Construir para producción
yarn build

# Iniciar servidor de producción
yarn start

# Linting
yarn lint
yarn lint:fix

# Formateo de código
yarn format
yarn format:check
```

## 🏗️ Arquitectura

### Servicios HTTP

- **API Service**: Cliente Axios configurado con interceptors
- **Tipado**: Respuestas tipadas con TypeScript
- **Error Handling**: Manejo centralizado de errores HTTP

### Gestión de Estado

- **React Query**: Para state server (queries y mutations)
- **Custom Hooks**: Wrappers personalizados para queries comunes

### Componentes

- **Atomic Design**: Jerarquía clara de componentes
- **shadcn/ui**: Componentes base accesibles y customizables
- **Tailwind CSS**: Styling utility-first con variables CSS personalizadas

## 🎨 Guía de Estilos

El proyecto utiliza:

- **Tailwind CSS v4** con configuración en CSS
- **Prettier** para formateo automático
- **ESLint** para calidad de código
- **Variables CSS** para temas y colores

## 📦 Dependencias Principales

### Producción

- `next`: Framework de React
- `react` & `react-dom`: Librería de UI
- `@tanstack/react-query`: State management para server state
- `axios`: Cliente HTTP
- `tailwindcss`: Framework CSS
- `class-variance-authority`: Manejo de variantes de componentes
- `clsx` & `tailwind-merge`: Utilidades para clases CSS

### Desarrollo

- `typescript`: Tipado estático
- `eslint`: Linting
- `prettier`: Formateo de código
- `@types/*`: Definiciones de tipos

## 🚀 Próximos Pasos

Una vez completado el setup, puedes comenzar a:

1. Implementar la lógica de negocio específica
2. Crear servicios para APIs externas
3. Desarrollar componentes específicos del dominio
4. Configurar autenticación y autorización
5. Implementar tests unitarios e integración

## 📝 Notas de Desarrollo

- El proyecto está configurado para usar **App Router** de Next.js
- **React Query DevTools** están habilitadas en desarrollo
- **TypeScript strict mode** está activado
- Los **path aliases** están configurados (`@/` apunta a `src/`)

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
