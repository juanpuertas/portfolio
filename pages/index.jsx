import React from 'react';
import Link from 'next/link';
import { Box, Button, Chip, Container, Grid2, Typography } from '@mui/material';
import { ArrowForward, SmartToy } from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import Scene from '@/components/scene/Scene';
import ListTecnhologies from '@/components/ui/ListTecnhologies';
import AiSkills from '@/components/ui/AiSkills';
import ExperenceWork from '@/components/utils/ExperenceWork';
import SwiperProjects from '@/components/utils/SwiperProjects';
import projectsWork from '@/utils/ListProjectsWork';
import projectsPersonal from '@/utils/ListProjectsPersonal';
import { profile } from '@/utils/profile';

const IndexPage = () => (
    <Layout title="Juan Puertas | Desarrollador Web & IA" pageDescription="Portafolio de Juan Puertas: desarrollo web full-stack, servidores MCP, agentes de IA y automatización de procesos.">
        <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 } }}>
            <Grid2 container spacing={4} alignItems="center">
                <Grid2 size={{ xs: 12, md: 7 }}>
                    <Chip label="Disponible para nuevos proyectos" color="primary" variant="outlined" size="small" sx={{ mb: 3 }} />
                    <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 64 } }}>
                        Hola, soy <span className="gradient-text">{profile.name}</span>
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: { xs: 22, md: 30 }, mt: 1, color: 'text.secondary', fontWeight: 500 }}>
                        Desarrollo web · MCP · Agentes de IA
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 3, maxWidth: 560, fontSize: 17, lineHeight: 1.7 }}>
                        {profile.summary}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
                        <Button component={Link} href="/planner" variant="contained" color="primary" endIcon={<ArrowForward />}>
                            Planifica tu proyecto con IA
                        </Button>
                        <Button component={Link} href="/#ai" variant="outlined" color="inherit" startIcon={<SmartToy />} sx={{ borderColor: 'divider' }}>
                            Ver habilidades de IA
                        </Button>
                    </Box>
                    <Grid2 container spacing={2} sx={{ mt: 6 }}>
                        {profile.stats.map((item) => (
                            <Grid2 size={{ xs: 4 }} key={item.label}>
                                <Typography variant="h3" className="gradient-text" sx={{ fontSize: { xs: 28, md: 40 } }}>{item.value}</Typography>
                                <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 5 }}>
                    <Scene />
                </Grid2>
            </Grid2>

            <ListTecnhologies />
            <AiSkills />
            <ExperenceWork />
            <Box id="projects" sx={{ scrollMarginTop: 100 }}>
                <SwiperProjects title="Proyectos para clientes" listProjects={projectsWork} />
                <SwiperProjects title="Proyectos personales" listProjects={projectsPersonal} />
            </Box>
        </Container>
    </Layout>
);

export default IndexPage;
