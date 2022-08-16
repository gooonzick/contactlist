import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const boxWraperStyle = { width: '100vw', height: '100vh' };
const boxStyle = {
  width: 'max-content',
  margin: '1rem auto',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.3)',
  textAlign: 'center',
};

function HomePage() {
  const navigate = useNavigate();
  return (
    <Box sx={boxWraperStyle}>
      <Box sx={boxStyle}>
        <Typography variant="h2">Храните свои контакты у нас</Typography>
        <Typography variant="h3">Удобно и всегда под рукой</Typography>
        <Button variant="contained" sx={{ marginTop: '0.4rem' }} onClick={() => navigate('/mycontacts')}>Попробовать</Button>
      </Box>
    </Box>
  );
}

export default HomePage;
