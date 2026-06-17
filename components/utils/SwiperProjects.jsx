import React, { useState } from 'react'
import { Box, Typography, useTheme, Modal } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

const SwiperProjects = ({listProjects, title}) => {
    const [currentImage, setCurrentImage] = useState(listProjects[0]);
    const [modalImage, setModalImage] = useState(null);
    const theme = useTheme();
    //console.log('imagen actual', currentImage)
    const handleSlideChange = (swiper) => {
        const currentIndex = swiper.activeIndex;
        setCurrentImage(listProjects[currentIndex]);
    };
    return (
        <Box mt={5}>
            <Typography variant="subtitle1" textAlign='center' sx={{ color: '#fff', fontSize: 32, mb: 2 }}>
                {title}
            </Typography>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                onSlideChange={handleSlideChange}
                className="mySwiper"
                style={{
                    width: theme.breakpoints.down('sm') ? '300px' : '620px',
                    height: theme.breakpoints.down('sm') ? '200px' : '320px',
                    //margin: '0px'
                }}
            >
                {listProjects.map((project, index) => (
                    <SwiperSlide 
                        key={index} 
                        style={{
                            borderRadius: 10,
                            overflow: 'hidden' // Asegura que la imagen no sobresalga del borde redondeado
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                position: 'relative'
                            }}
                        >
                            <Box
                                component="img"
                                src={project.imagePath}
                                alt={project.name}
                                onClick={() => setModalImage(project.imagePath)}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain', // Esto asegura que toda la imagen sea visible
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    cursor: 'pointer' // Para indicar que es clicable
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    position: 'relative', // Cambiado de 'absolute' a 'relative'
                                    zIndex: 1, // Asegura que el texto esté sobre la imagen
                                    p: 1,
                                    color: '#fff',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente para mejorar la legibilidad
                                    width: '100%'
                                }}
                            >
                                {project.name}
                            </Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Modal
                open={!!modalImage}
                onClose={() => setModalImage(null)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    component="img"
                    src={modalImage}
                    alt="Vista en grande"
                    sx={{
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        objectFit: 'contain',
                        outline: 'none',
                        boxShadow: 24,
                        borderRadius: 2
                    }}
                />
            </Modal>
        </Box>
    );
}

export default SwiperProjects