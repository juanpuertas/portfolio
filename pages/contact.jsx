import React, { useState } from 'react';
import { Box, Button, Container, Grid2, TextField, Typography } from '@mui/material';
import { WhatsApp, Email } from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import { profile } from '@/utils/profile';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        const text = `Hola Juan, soy ${name.trim()}. ${message.trim()}`;
        const url = `https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Layout title="Contacto | Juan Puertas" pageDescription="Contacta a Juan Puertas para tu próximo proyecto web o de IA.">
            <Container maxWidth="sm" sx={{ pt: { xs: 6, md: 10 } }}>
                <Box component="form" onSubmit={handleSendMessage} className="glass" sx={{ p: { xs: 3, md: 5 }, borderRadius: 5 }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, textAlign: 'center', mb: 1 }}>
                        ¡<span className="gradient-text">Contáctame</span>!
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                        Cuéntame tu idea y hablemos por WhatsApp. También puedes preguntarle al asistente con IA (botón de chat).
                    </Typography>
                    <Grid2 container spacing={3}>
                        <Grid2 size={12}>
                            <TextField fullWidth required label="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} slotProps={{ htmlInput: { maxLength: 80 } }} />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField fullWidth required multiline rows={4} label="Mensaje" placeholder="Escribe aquí tu idea o consulta…" value={message} onChange={(e) => setMessage(e.target.value)} slotProps={{ htmlInput: { maxLength: 800 } }} />
                        </Grid2>
                        <Grid2 size={12} sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button type="submit" variant="contained" size="large" startIcon={<WhatsApp />}
                                sx={{ background: '#25D366', '&:hover': { background: '#1ebe57' } }}>
                                Enviar por WhatsApp
                            </Button>
                            <Button href={`mailto:${profile.email}`} variant="outlined" color="inherit" size="large" startIcon={<Email />} sx={{ borderColor: 'divider' }}>
                                Correo
                            </Button>
                        </Grid2>
                    </Grid2>
                </Box>
            </Container>
        </Layout>
    );
};

export default ContactPage;
