import React from 'react';
import Link from 'next/link';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { Email, GitHub, WhatsApp } from '@mui/icons-material';
import { profile } from '@/utils/profile';

const Footer = () => (
    <Box component="footer" sx={{ mt: 12, borderTop: '1px solid', borderColor: 'divider', py: 6 }}>
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" className="gradient-text" sx={{ fontWeight: 700 }}>JuamPi</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 360 }}>
                        Desarrollo web e IA aplicada: MCP, agentes y automatización.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton aria-label="Correo" component="a" href={`mailto:${profile.email}`}><Email /></IconButton>
                    <IconButton aria-label="GitHub" component="a" href={profile.github} target="_blank" rel="noopener noreferrer"><GitHub /></IconButton>
                    <IconButton aria-label="WhatsApp" component="a" href={`https://wa.me/${profile.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer"><WhatsApp /></IconButton>
                </Box>
                <Button component={Link} href="/contact" variant="contained" color="primary">Hablemos</Button>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 5 }}>
                © {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.
            </Typography>
        </Container>
    </Box>
);

export default Footer;
