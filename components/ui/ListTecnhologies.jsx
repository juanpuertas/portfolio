import React from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import technologies from '@/utils/ListTecnhologies';

const ListTecnhologies = () => (
    <Box sx={{ mt: 10 }} className="reveal">
        <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>Stack</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, mb: 4 }}>Tecnologías</Typography>
        <Grid2 container spacing={2}>
            {technologies.map((tech) => (
                <Grid2 key={tech.name} size={{ xs: 4, sm: 3, md: 1.5 }}>
                    <Box className="glass card-hover" sx={{ p: 2, borderRadius: 3, display: 'grid', placeItems: 'center' }}>
                        <Box component="img" src={tech.imagePath} alt={tech.name} loading="lazy" sx={{ width: '100%', height: 56, objectFit: 'contain' }} />
                    </Box>
                </Grid2>
            ))}
        </Grid2>
    </Box>
);

export default ListTecnhologies;
