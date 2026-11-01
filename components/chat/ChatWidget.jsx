import React, { useEffect, useRef, useState } from 'react';
import { Box, Fab, IconButton, InputBase, Paper, Typography, Chip, Zoom, CircularProgress } from '@mui/material';
import { SmartToy, Close, Send } from '@mui/icons-material';

const WELCOME = '¡Hola! Soy el asistente de Juan. Pregúntame por su experiencia, proyectos, habilidades de IA (MCP, agentes) o cómo contactarlo.';
const SUGGESTIONS = ['¿Qué experiencia tiene?', '¿Sabe crear servidores MCP?', '¿Cómo lo contacto?'];
const MAX = 600;

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
    const endRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading, open]);
    useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const send = async (text) => {
        const content = text.trim().slice(0, MAX);
        if (!content || loading) return;
        const next = [...messages, { role: 'user', content }];
        setMessages(next);
        setInput('');
        setLoading(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // El saludo inicial no se envía: la API exige que empiece con "user".
                body: JSON.stringify({ messages: next.slice(1) }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error');
            setMessages([...next, { role: 'assistant', content: data.reply }]);
        } catch (e) {
            setMessages([...next, { role: 'assistant', content: e.message === 'Failed to fetch' ? 'No pude conectar. Intenta de nuevo.' : e.message }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Zoom in={open} unmountOnExit>
                <Paper
                    role="dialog"
                    aria-label="Chat con el asistente de Juan"
                    className="glass"
                    elevation={0}
                    sx={{
                        position: 'fixed', zIndex: 1300, right: { xs: 8, sm: 24 }, bottom: { xs: 88, sm: 96 },
                        width: { xs: 'calc(100vw - 16px)', sm: 380 }, height: { xs: '70vh', sm: 520 }, maxHeight: 'calc(100vh - 110px)',
                        display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 4,
                        boxShadow: '0 30px 80px -20px rgba(0,0,0,.8)', transformOrigin: 'bottom right',
                    }}
                >
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider', background: 'linear-gradient(135deg,rgba(255,45,111,.18),rgba(108,123,255,.18))' }}>
                        <SmartToy color="primary" />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">Asistente de Juan</Typography>
                            <Typography variant="caption" color="text.secondary">Respuestas con IA sobre su perfil</Typography>
                        </Box>
                        <IconButton size="small" aria-label="Cerrar chat" onClick={() => setOpen(false)}><Close fontSize="small" /></IconButton>
                    </Box>

                    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.25 }} aria-live="polite">
                        {messages.map((m, i) => (
                            <Box
                                key={i}
                                sx={{
                                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%',
                                    px: 1.75, py: 1, borderRadius: 3, fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                    ...(m.role === 'user'
                                        ? { background: 'linear-gradient(135deg,#ff2d6f,#ff6a3d)', color: '#fff', borderBottomRightRadius: 4 }
                                        : { background: 'rgba(255,255,255,.06)', borderBottomLeftRadius: 4 }),
                                }}
                            >
                                {/* Texto plano: React escapa el contenido, sin HTML del modelo */}
                                {m.content}
                            </Box>
                        ))}
                        {loading && <CircularProgress size={18} sx={{ alignSelf: 'flex-start', ml: 1 }} aria-label="Escribiendo" />}
                        {messages.length === 1 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {SUGGESTIONS.map((s) => <Chip key={s} label={s} size="small" variant="outlined" onClick={() => send(s)} clickable />)}
                            </Box>
                        )}
                        <div ref={endRef} />
                    </Box>

                    <Box
                        component="form"
                        onSubmit={(e) => { e.preventDefault(); send(input); }}
                        sx={{ p: 1.5, display: 'flex', gap: 1, borderTop: '1px solid', borderColor: 'divider' }}
                    >
                        <InputBase
                            inputRef={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu pregunta…"
                            inputProps={{ maxLength: MAX, 'aria-label': 'Mensaje' }}
                            sx={{ flex: 1, px: 1.5, borderRadius: 3, background: 'rgba(255,255,255,.05)', fontSize: 14 }}
                        />
                        <IconButton type="submit" color="primary" disabled={loading || !input.trim()} aria-label="Enviar"><Send /></IconButton>
                    </Box>
                </Paper>
            </Zoom>
            <Fab
                color="primary"
                aria-label={open ? 'Cerrar chat' : 'Abrir chat con el asistente'}
                onClick={() => setOpen((o) => !o)}
                sx={{ position: 'fixed', right: { xs: 16, sm: 24 }, bottom: { xs: 16, sm: 24 }, zIndex: 1300, background: 'linear-gradient(135deg,#ff2d6f,#6c7bff)' }}
            >
                {open ? <Close /> : <SmartToy />}
            </Fab>
        </>
    );
};

export default ChatWidget;
