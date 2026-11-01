// Opciones del planificador de proyectos. La API valida contra estas listas (allowlist).
export const projectTypes = [
    { id: 'web', label: 'Sitio / aplicación web' },
    { id: 'ecommerce', label: 'Tienda en línea' },
    { id: 'system', label: 'Sistema de gestión (nóminas, inventario, reportes…)' },
    { id: 'mobile', label: 'App móvil' },
    { id: 'ai-agent', label: 'Agente / asistente con IA' },
    { id: 'mcp', label: 'Servidor MCP / integración de IA con mis sistemas' },
    { id: 'automation', label: 'Automatizar procesos con IA' },
    { id: 'other', label: 'Otro' },
];

export const featureOptions = [
    'Login y usuarios con roles', 'Panel de administración', 'Pagos en línea', 'Reportes y gráficos',
    'Notificaciones (correo / WhatsApp)', 'Chatbot con IA', 'Integración con APIs externas',
    'Carga y descarga de archivos', 'Reservas / citas', 'Multi-idioma',
];

export const budgets = [
    { id: 'low', label: 'Ajustado' },
    { id: 'mid', label: 'Medio' },
    { id: 'high', label: 'Amplio' },
    { id: 'unknown', label: 'No lo sé aún' },
];

export const timelines = [
    { id: 'asap', label: 'Lo antes posible' },
    { id: '1-3m', label: '1–3 meses' },
    { id: 'flexible', label: 'Flexible' },
];

export const labelOf = (list, id) => list.find((x) => x.id === id)?.label;
