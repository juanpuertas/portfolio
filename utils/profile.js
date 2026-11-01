// Fuente única de verdad sobre Juan Puertas.
// La usan la UI (habilidades, experiencia) y el chatbot (contexto del asistente).

export const profile = {
    name: 'Juan Puertas',
    role: 'Full-Stack Web Developer & AI Automation',
    email: 'juanpuertas486@gmail.com',
    whatsapp: '+584145512273',
    github: 'https://github.com/juanpuertas',
    location: 'Venezuela',
    languages: ['Español (nativo)'],
    summary:
        'Desarrollador web con experiencia en aplicaciones empresariales, código revisado y pruebas automatizadas. ' +
        'Combina desarrollo full-stack con IA aplicada: creación de servidores MCP, agentes con memoria y automatización de procesos.',
    stats: [
        { value: '1+', label: 'Años de experiencia' },
        { value: '7', label: 'Proyectos para clientes' },
        { value: '1', label: 'Proyecto personal' },
    ],
};

export const experience = [
    {
        company: 'B y C Computación C.A.',
        start: '2023-07-09',
        end: null, // null = actualidad
        text:
            'Centro de Ayuda dinámico: aplicación web donde se crean centros de ayuda según las necesidades del usuario.\n' +
            'Centro de Soporte: gestión de tareas y asistencias para Call Center, con reportes de rendimiento y permisos específicos por usuario.\n' +
            'SAE Nóminas: sistema de creación y gestión de nóminas para instituciones educativas (CestaTickets, recibos automáticos, dashboard en tiempo real).\n' +
            'SAE Control de Acceso: control de asistencia con dashboard de estados, incidencias, balance de tiempo e integración con escáneres QR (móvil y tablet).',
    },
    {
        company: 'Vamos',
        start: '2025-11-30',
        end: null,
        text:
            'Desarrollo de las apps Vamos y VamosRestaurantes (dos aplicaciones distintas de la misma empresa).\n' +
            'VamosRestaurantes: gestión integral de restaurantes: configuración de tienda, reportes de ventas y analítica, y control de pedidos activos y completados en tiempo real.',
    },
    {
        company: 'VamosApp - Módulo de Viajes',
        start: '2026-01-01',
        end: '2026-01-30',
        text:
            'Nuevo módulo de viajes interurbanos: reserva de viajes entre ciudades, paradas intermedias, datos del conductor y comodidades del vehículo. ' +
            'Incluye reserva de asientos, precios dinámicos según punto de recogida/destino y manejo de equipaje.',
    },
];

export const technologies = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'MySQL', 'MongoDB', 'jQuery', 'GitHub',
];

// Habilidades de IA: se muestran en la sección "AI Engineering" y alimentan al chatbot.
export const aiSkills = [
    {
        id: 'mcp',
        title: 'MCP · Model Context Protocol',
        icon: 'hub',
        description:
            'Diseño y creación de servidores MCP (tools, resources y prompts) y conexión con distintos clientes y servicios, ' +
            'para que un modelo pueda actuar sobre sistemas reales de forma controlada.',
        tags: ['Servidores MCP', 'Tools & Resources', 'Integración de APIs', 'Auth y permisos'],
    },
    {
        id: 'brains',
        title: 'Agentes y "cerebros" de IA',
        icon: 'psychology',
        description:
            'Manejo de agentes con memoria, contexto y herramientas: orquestación de varios modelos, recuperación de conocimiento (RAG) ' +
            'y diseño de prompts del sistema para respuestas fiables.',
        tags: ['Agentes', 'Memoria y contexto', 'RAG', 'Prompt engineering'],
    },
    {
        id: 'automation',
        title: 'Optimización de procesos con IA',
        icon: 'bolt',
        description:
            'Identificación de tareas repetitivas y automatización con IA: clasificación, extracción de datos, generación de reportes ' +
            'y flujos que conectan sistemas internos con modelos de lenguaje.',
        tags: ['Automatización', 'Flujos de trabajo', 'Extracción de datos', 'Reportes'],
    },
];

export const projects = {
    work: [
        'Centro de Ayuda', 'Centro de Soporte', 'Vamos Restaurantes', 'VamosApp - Viajes',
        'SAE Nóminas', 'SAE Control de Acceso',
    ],
};

// Texto de contexto que recibe el modelo. Solo contiene información pública.
export function buildKnowledge() {
    const exp = experience
        .map((e) => `- ${e.company} (${e.start} → ${e.end ?? 'actualidad'}): ${e.text.replace(/\n/g, ' ')}`)
        .join('\n');
    const ai = aiSkills
        .map((s) => `- ${s.title}: ${s.description} [${s.tags.join(', ')}]`)
        .join('\n');
    return [
        `Nombre: ${profile.name}`,
        `Rol: ${profile.role}`,
        `Ubicación: ${profile.location}`,
        `Resumen: ${profile.summary}`,
        `Tecnologías: ${technologies.join(', ')}`,
        `Estadísticas: ${profile.stats.map((s) => `${s.value} ${s.label}`).join('; ')}`,
        `Experiencia:\n${exp}`,
        `Habilidades de IA:\n${ai}`,
        `Contacto: email ${profile.email}, WhatsApp ${profile.whatsapp}, GitHub ${profile.github}. También hay formulario en /contact.`,
    ].join('\n');
}

export default profile;
