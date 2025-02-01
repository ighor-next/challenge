import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para o frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Permite requisições do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite o envio de credenciais (cookies, headers de autenticação)
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
