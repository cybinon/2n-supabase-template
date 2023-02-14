import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoCustomAdapter } from './io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useWebSocketAdapter(new IoCustomAdapter(app));
  if (process.env.SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Api Documentation')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
        },
        'user-jwt-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  console.log(process.env.APP_NAME);

  await app.listen(4000);
}
bootstrap();
