import React, { useState } from 'react'
import { Box, Typography, Modal } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

const SwiperProjects = ({listProjects, title}) => {
    const [currentImage, setCurrentImage] = useState(listProjects[0]);
    const [modalImage, setModalImage] = useState(null);
    //console.log('imagen actual', currentImage)
    const handleSlideChange = (swiper) => {
        const currentIndex = swiper.activeIndex;
        setCurrentImage(listProjects[currentIndex]);
    };
    return (
        <Box sx={{ mt: 10 }} className="reveal">
            <Typography variant="h2" textAlign='center' sx={{ fontSize: { xs: 26, md: 36 }, mb: 4 }}>
                {title}
            </Typography>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                onSlideChange={handleSlideChange}
                className="mySwiper"
                style={{ width: 'min(620px, 100%)', aspectRatio: '16 / 10', height: 'auto' }}
            >
                {listProjects.map((project, index) => (
                    <SwiperSlide 
                        key={index} 
                        style={{
                            borderRadius: 10,
                            overflow: 'hidden',
                            background: '#14141c',
                            border: '1px solid rgba(255,255,255,0.08)'
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
                                loading="lazy"
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
                                    backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', // Fondo semi-transparente para mejorar la legibilidad
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