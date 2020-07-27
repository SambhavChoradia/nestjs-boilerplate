import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CoreModule } from './core/core.module';
import { Logger } from './core/logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(CoreModule)
    app.useLogger(app.get(Logger));
    app.setGlobalPrefix('/api/v1');

    // Swagger Module
    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('App Title')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('Title')
        .addServer('http://127.0.0.1:3000')
        .build();

    app.enableCors();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    new Logger().log('running on port 3000');
}
// Start Application
bootstrap().then().catch();
