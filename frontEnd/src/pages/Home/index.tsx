import TaskBoard from "../../components/TaskBoard";
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h2" component="h2" align="center" gutterBottom>
          Gerenciador de Tarefas
        </Typography>
        <TaskBoard />
      </Box>
    </Container>
  );
};

export default Home;