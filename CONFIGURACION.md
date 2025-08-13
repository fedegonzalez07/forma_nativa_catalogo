# Configuración de Forma Nativa

## Variables de Entorno

Para que la aplicación funcione correctamente, necesitas configurar las siguientes variables de entorno:

### 1. Crear archivo `.env.local`

Crea un archivo llamado `.env.local` en la raíz del proyecto con el siguiente contenido:

\`\`\`env
# Resend API Key - Obtén tu API key en https://resend.com
RESEND_API_KEY=re_tu_api_key_aqui

# Email configuration
FROM_EMAIL=pedidos@tudominio.com
TO_EMAIL=tu-email@gmail.com
\`\`\`

### 2. Configurar Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Obtén tu API key desde el dashboard
4. Reemplaza `re_tu_api_key_aqui` con tu API key real

### 3. Configurar Emails

- `FROM_EMAIL`: El email desde el cual se enviarán los pedidos
- `TO_EMAIL`: El email donde recibirás las notificaciones de pedidos

### 4. Para Producción

Si despliegas en Vercel, Netlify u otro servicio, configura estas variables en el panel de configuración del servicio.

## Estructura del Proyecto

\`\`\`
forma_nativa_catalogo/
├── app/
│   ├── api/send-order/route.ts  # API para enviar pedidos
│   └── page.tsx                 # Página principal
├── components/                  # Componentes UI
├── data/
│   └── products.ts             # Datos de productos
├── interfaces/
│   └── index.ts                # Interfaces TypeScript
└── public/
    └── logo.png                # Logo de la marca
\`\`\`

## Funcionalidades

- ✅ Catálogo de productos con filtros por categoría
- ✅ Carrito de compras funcional
- ✅ Formulario de pedido con validación
- ✅ Envío de emails automático con Resend
- ✅ Diseño responsive y moderno
- ✅ Logo de Forma Nativa integrado

## Comandos Disponibles

\`\`\`bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
\`\`\`
