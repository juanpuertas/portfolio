import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';

const font = 'var(--font-inter), system-ui, -apple-system, Segoe UI, sans-serif';
const display = 'var(--font-display), var(--font-inter), system-ui, sans-serif';

export const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: { main: '#ff2d6f' },
      secondary: { main: '#6c7bff' },
      info: { main: '#22d3ee' },
      background: { default: '#0b0b10', paper: '#14141c' },
      text: { primary: '#f4f4f8', secondary: '#a1a1b5' },
      divider: 'rgba(255,255,255,0.08)',
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: font,
      h1: { fontFamily: display, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08 },
      h2: { fontFamily: display, fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontFamily: display, fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontFamily: display, fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: { body: { backgroundColor: '#0b0b10' } },
      },
      MuiLink: { defaultProps: { underline: 'none' } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 12, padding: '10px 22px', transition: 'all .25s ease' },
          containedPrimary: {
            background: 'linear-gradient(135deg,#ff2d6f,#ff6a3d)',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 30px -10px rgba(255,45,111,.7)' },
          },
        },
      },
      MuiTextField: { defaultProps: { variant: 'outlined' } },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.03)' } },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
    },
  },
  esES
);
