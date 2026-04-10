import { RazonCancelacion } from '../../common/enums/razon-cancelacion.enum';

export class CrearCancelacionDto {
    numeroPedido: number;
    montoTotal: number;
    razon: RazonCancelacion;
}