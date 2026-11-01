# Portafolio · Juan Puertas

Next.js 14 (pages router) + MUI 6. Diseño oscuro con glassmorphism, sección de IA (MCP, agentes, automatización) y chatbot que responde sobre el perfil.

## Desarrollo

```bash
yarn install
cp .env.example .env.local   # opcional: añade DEEPSEEK_API_KEY
yarn dev
```

## Chatbot

- UI: `components/chat/ChatWidget.jsx`; API: `pages/api/chat.js`.
- Conocimiento: `utils/profile.js` (editar ahí experiencia, habilidades y contacto; la UI y el bot lo comparten).
- Con `DEEPSEEK_API_KEY` usa DeepSeek (modelo configurable con `DEEPSEEK_MODEL`). Sin clave, responde en modo local por palabras clave.
- La clave solo vive en el servidor; nunca llega al navegador.

## Seguridad

- Cabeceras: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy (`next.config.mjs`).
- API del chat: solo POST, comprobación de origen, validación y límites de tamaño, rate limit por IP (en memoria; usar Redis/Upstash si hay varias instancias), respuestas del modelo renderizadas como texto plano, errores internos sin filtrar al cliente.
- Enlaces externos con `rel="noopener noreferrer"`.
