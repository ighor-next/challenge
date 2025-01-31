import sequelize from './src/db/index.js';
import { User, Task } from './src/models/index.js';

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
    console.log(process.env.DATABASE_NAME);
  }
})();
