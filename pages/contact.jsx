import React, { useState } from 'react';
import { Box, Button, Container, Grid2, TextField, Typography } from '@mui/material';
import Layout from '@/components/layout/Layout';
import { WhatsApp } from '@mui/icons-material';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        const phoneNumber = '+584145512273';
        // Mensaje predeterminado en español
        const defaultMessage = `Hola Juan, soy ${name}. ${message}`;
        const encodedMessage = encodeURIComponent(defaultMessage);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Layout title="Portfolio - Contact Me" pageDescription="Contact page for Juan Puertas">
            <Container maxWidth="md" sx={{ mt: 10, mb: 10, minHeight: '60vh' }}>
                <Box
                    component="form"
                    onSubmit={handleSendMessage}
                    sx={{
                        backgroundColor: '#1d1c22',
                        p: 5,
                        borderRadius: 2,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Typography variant="h2" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
                        ¡Contáctame!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#aaa', mb: 4, textAlign: 'center' }}>
                        Envíame un mensaje directo a mi WhatsApp y hablemos sobre tu próximo proyecto.
                    </Typography>

                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Tu Nombre"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: '#555' },
                                        '&:hover fieldset': { borderColor: '#888' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    },
                                    '& .MuiInputLabel-root': { color: '#aaa' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Mensaje"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                placeholder="Escribe aquí tu idea o consulta..."
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: '#555' },
                                        '&:hover fieldset': { borderColor: '#888' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    },
                                    '& .MuiInputLabel-root': { color: '#aaa' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                startIcon={<WhatsApp />}
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#25D366',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': {
                                        backgroundColor: '#1ebe57',
                                    }
                                }}
                            >
                                Enviar WhatsApp
                            </Button>
                        </Grid2>
                    </Grid2>
                </Box>
            </Container>
        </Layout>
    );
};

export default ContactPage;
