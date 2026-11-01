import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Container, Drawer, IconButton, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Menu as MenuIcon, Close } from '@mui/icons-material';

const links = [
    { label: 'Inicio', href: '/' },
    { label: 'IA', href: '/#ai' },
    { label: 'Experiencia', href: '/#experience' },
    { label: 'Proyectos', href: '/#projects' },
    { label: 'Planificador', href: '/planner' },
    { label: 'Contacto', href: '/contact' },
];

const Navbar = () => {
    const { asPath } = useRouter();
    const [open, setOpen] = useState(false);
    return (
        <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1100, pt: 2 }}>
            <Container maxWidth="lg">
                <Box
                    component="nav"
                    aria-label="Principal"
                    className="glass"
                    sx={{ px: 3, py: 1.25, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <Typography component={Link} href="/" variant="h5" className="gradient-text" sx={{ fontWeight: 700 }}>
                        JuamPi
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
                        {links.map((l) => (
                            <Button
                                key={l.href}
                                component={Link}
                                href={l.href}
                                color="inherit"
                                aria-current={asPath === l.href ? 'page' : undefined}
                                sx={{ color: asPath === l.href ? 'primary.main' : 'text.secondary', '&:hover': { color: 'text.primary', background: 'transparent' } }}
                            >
                                {l.label}
                            </Button>
                        ))}
                        <Button href="/CVJuanPuertas.pdf" target="_blank" rel="noopener noreferrer" variant="contained" color="primary" size="small" sx={{ ml: 1 }}>
                            Descargar CV
                        </Button>
                    </Box>
                    <IconButton aria-label="Abrir menú" onClick={() => setOpen(true)} sx={{ display: { md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Container>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 260, p: 2 } }}>
                <IconButton aria-label="Cerrar menú" onClick={() => setOpen(false)} sx={{ alignSelf: 'flex-end' }}>
                    <Close />
                </IconButton>
                <List>
                    {links.map((l) => (
                        <ListItemButton key={l.href} component={Link} href={l.href} onClick={() => setOpen(false)}>
                            <ListItemText primary={l.label} />
                        </ListItemButton>
                    ))}
                    <ListItemButton component="a" href="/CVJuanPuertas.pdf" target="_blank" rel="noopener noreferrer">
                        <ListItemText primary="Descargar CV" />
                    </ListItemButton>
                </List>
            </Drawer>
        </Box>
    );
};

export default Navbar;
