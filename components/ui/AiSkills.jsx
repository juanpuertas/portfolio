import React from 'react';
import { Box, Chip, Grid2, Typography } from '@mui/material';
import { Hub, Psychology, Bolt } from '@mui/icons-material';
import { aiSkills } from '@/utils/profile';

const icons = { hub: <Hub fontSize="large" />, psychology: <Psychology fontSize="large" />, bolt: <Bolt fontSize="large" /> };

const AiSkills = () => (
    <Box id="ai" sx={{ mt: 14, scrollMarginTop: 100 }} className="reveal">
        <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>AI Engineering</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, mb: 1 }}>IA que trabaja de verdad</Typography>
        <Typography color="text.secondary" sx={{ mb: 5, maxWidth: 620 }}>
            Conecto modelos de lenguaje con sistemas reales: servidores MCP, agentes con memoria y procesos automatizados.
        </Typography>
        <Grid2 container spacing={3}>
            {aiSkills.map((s) => (
                <Grid2 key={s.id} size={{ xs: 12, md: 4 }}>
                    <Box className="glass card-hover" sx={{ p: 3.5, borderRadius: 4, height: '100%' }}>
                        <Box sx={{ width: 56, height: 56, borderRadius: 3, display: 'grid', placeItems: 'center', color: '#fff', mb: 2.5, background: 'linear-gradient(135deg,#ff2d6f,#6c7bff)' }}>
                            {icons[s.icon]}
                        </Box>
                        <Typography variant="h5" sx={{ mb: 1.5, fontSize: 20 }}>{s.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2.5 }}>{s.description}</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {s.tags.map((t) => <Chip key={t} label={t} size="small" variant="outlined" />)}
                        </Box>
                    </Box>
                </Grid2>
            ))}
        </Grid2>
    </Box>
);

export default AiSkills;
