import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getStatus(): { status: string; message: string } {
        return {
            status: 'ok',
            message: 'Microservicio de pedidos activo',
        }
    }
}
