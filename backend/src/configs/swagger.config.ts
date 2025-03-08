import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Brain Agriculture Challenge')
  .setDescription('API para gestão de fazendas')
  .setVersion('1.0.0')
  .setContact(
    'Leandro Dias',
    'https://github.com/devleandrodias',
    'leandrodbdias@gmail.com',
  )
  .build();
