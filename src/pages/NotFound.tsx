import { Container, Typography, Box } from '@mui/material';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box >
        <Typography variant="h2" align="center" gutterBottom>
          Something wrong, please try again 🥲
        </Typography>
      </Box>
    </Container>
  );
};
export default NotFound;
