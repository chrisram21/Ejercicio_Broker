// src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api/v1')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,          // Ignora campos no declarados
            forbidNonWhitelisted: true, // Lanza error si llegan campos extra
            transform: true           // Transforma tipos automáticamente
        })
    )

    const port = process.env.PORT ?? 3000
    await app.listen(port)
    console.log(`🚀 Microservicio de pedidos corriendo en: http://localhost:${port}/api/v1`)
}
bootstrap()