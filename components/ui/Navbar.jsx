import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Grid, Typography } from '@mui/material'

const Navbar = () => {
    const { asPath, push } = useRouter();
    return (
        <Grid container display='flex' justifyContent='center' mt={3.5}>
            <Grid item xs={12} sm={12} md={11} lg={11} xl={10}>
                <Box
                    sx={{
                        backgroundColor: '#1d1c22',
                        p: 2,
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Typography variant='h4' color='primary' ml={2} onClick={() => { push('/') }} sx={{ cursor: 'pointer' }}>JuamPi</Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, gap: 1 }}>
                        <Button
                            variant='text'
                            onClick={() => push('/')}
                            sx={{ color: 'primary.main' }}
                        >
                            Home
                        </Button>
                        <Button
                            variant='text'
                            onClick={() => push('/contact')}
                            sx={{ color: 'primary.main' }}
                        >
                            Contact Me
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Navbar