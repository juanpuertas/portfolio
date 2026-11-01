import React, { useState } from 'react';
import { Alert, Box, Button, Chip, CircularProgress, Container, MenuItem, TextField, Typography } from '@mui/material';
import { AutoAwesome, WhatsApp } from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import { profile } from '@/utils/profile';
import { projectTypes, featureOptions, budgets, timelines, labelOf } from '@/utils/planOptions';

const Section = ({ title, items, icon }) =>
    items?.length ? (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{icon} {title}</Typography>
            <Box component="ul" sx={{ m: 0, pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                {items.map((x, i) => <li key={i}>{x}</li>)}
            </Box>
        </Box>
    ) : null;

const PlannerPage = () => {
    const [form, setForm] = useState({ type: '', description: '', features: [], budget: 'unknown', timeline: 'flexible' });
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [plan, setPlan] = useState(null);

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const toggle = (f) =>
        setForm({ ...form, features: form.features.includes(f) ? form.features.filter((x) => x !== f) : [...form.features, f] });

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error');
            setPlan(data.plan);
        } catch (err) {
            setError(err.message === 'Failed to fetch' ? 'No pude conectar. Intenta de nuevo.' : err.message);
        } finally {
            setLoading(false);
        }
    };

    const sendWhatsApp = () => {
        const text = [
            `Hola Juan, soy ${name.trim() || 'un cliente'}. Usé el planificador de tu portafolio.`,
            `Tipo: ${labelOf(projectTypes, form.type)}`,
            `Funciones: ${form.features.join(', ') || 'por definir'}`,
            `Presupuesto: ${labelOf(budgets, form.budget)} · Plazo: ${labelOf(timelines, form.timeline)}`,
            `Idea: ${form.description}`,
        ].join('\n');
        window.open(`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <Layout title="Planifica tu proyecto | Juan Puertas" pageDescription="Cuéntame qué necesitas y la IA te sugiere funcionalidades, tecnologías y fases para tu proyecto.">
            <Container maxWidth="md" sx={{ pt: { xs: 6, md: 10 } }}>
                <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>Planificador con IA</Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 48 }, mb: 1 }}>
                    Cuéntame qué <span className="gradient-text">necesitas</span>
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
                    Responde unas preguntas y la IA te sugerirá funcionalidades, tecnologías y fases. Es una guía orientativa; luego lo afinamos juntos.
                </Typography>

                <Box component="form" onSubmit={submit} className="glass" sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, display: 'grid', gap: 3 }}>
                    <TextField select required label="¿Qué quieres construir?" value={form.type} onChange={set('type')}>
                        {projectTypes.map((t) => <MenuItem key={t.id} value={t.id}>{t.label}</MenuItem>)}
                    </TextField>

                    <TextField required multiline rows={4} label="Describe tu idea" placeholder="Ej: Quiero una app para que mis clientes reserven citas y reciban recordatorios…"
                        value={form.description} onChange={set('description')} slotProps={{ htmlInput: { maxLength: 800, minLength: 10 } }}
                        helperText={`${form.description.length}/800`} />

                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Funciones que te interesan</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {featureOptions.map((f) => (
                                <Chip key={f} label={f} clickable onClick={() => toggle(f)} aria-pressed={form.features.includes(f)}
                                    color={form.features.includes(f) ? 'primary' : 'default'} variant={form.features.includes(f) ? 'filled' : 'outlined'} />
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <TextField select label="Presupuesto" value={form.budget} onChange={set('budget')}>
                            {budgets.map((b) => <MenuItem key={b.id} value={b.id}>{b.label}</MenuItem>)}
                        </TextField>
                        <TextField select label="Plazo" value={form.timeline} onChange={set('timeline')}>
                            {timelines.map((t) => <MenuItem key={t.id} value={t.id}>{t.label}</MenuItem>)}
                        </TextField>
                    </Box>

                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" color="primary" size="large" disabled={loading || !form.type}
                        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AutoAwesome />}>
                        {loading ? 'Analizando…' : 'Generar sugerencias'}
                    </Button>
                </Box>

                {plan && (
                    <Box className="glass" sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, mt: 4 }} aria-live="polite">
                        <Typography variant="h4" sx={{ fontSize: 26, mb: 1 }}>Tu plan sugerido</Typography>
                        {/* Texto plano: React escapa todo lo devuelto por el modelo */}
                        <Typography color="text.secondary">{plan.resumen}</Typography>
                        <Section title="Funcionalidades recomendadas" items={plan.funcionalidades} icon="✅" />
                        <Section title="Tecnologías" items={plan.tecnologias} icon="🧱" />
                        <Section title="Fases" items={plan.fases} icon="🗺️" />
                        <Section title="Dónde la IA aportaría valor" items={plan.oportunidades_ia} icon="🤖" />
                        <Section title="Preguntas para definir mejor el alcance" items={plan.preguntas} icon="❓" />
                        <Alert severity="info" sx={{ mt: 3 }}>
                            Sugerencias orientativas generadas con IA. Costos y plazos reales los confirma Juan contigo.
                        </Alert>
                        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                            <TextField size="small" label="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} slotProps={{ htmlInput: { maxLength: 80 } }} />
                            <Button variant="contained" startIcon={<WhatsApp />} onClick={sendWhatsApp}
                                sx={{ background: '#25D366', '&:hover': { background: '#1ebe57' } }}>
                                Enviar esto a Juan
                            </Button>
                        </Box>
                    </Box>
                )}
            </Container>
        </Layout>
    );
};

export default PlannerPage;
