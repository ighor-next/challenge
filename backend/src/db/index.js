import { Sequelize } from 'sequelize';

const dbName = String(process.env.DATABASE_NAME);
const dbUser = String(process.env.DATABASE_USERNAME);
const dbPassword = String(process.env.DATABASE_PASSWORD) || '';
const dbPort = process.env.DATABASE_PORT
  ? Number(process.env.DATABASE_PORT)
  : 3307;

// const dbName = 'challenge';
// const dbUser = 'root';
// const dbPassword = '';
// const dbPort = 3307;

const options = {
  host: 'localhost',
  port: dbPort,
  dialect: 'mysql',
  logging: msg => console.log(`[Sequelize] ${msg}`),
  define: {
    underscored: true, // Usa snake_case para nomes de colunas
    underscoredAll: true, // Usa snake_case para nomes de tabelas
    freezeTableName: true, // Evita pluralização automática
    timestamps: true, // Adiciona created_at e updated_at
  },
};
const sequelize = new Sequelize(dbName, dbUser, dbPassword, options);

export default sequelize;
