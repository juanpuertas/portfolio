import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import ChatWidget from '../chat/ChatWidget';

const Layout = ({ children, title, pageDescription }) => {
    // Animación de aparición al hacer scroll
    useEffect(() => {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach((el) => el.classList.add('visible'));
            return;
        }
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [children]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <link rel="icon" type="image/png" href="/meta.png" />
            </Head>
            <Navbar />
            <Box component="main" sx={{ minHeight: '70vh' }}>{children}</Box>
            <Footer />
            <ChatWidget />
        </>
    );
};

export default Layout;
