import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EmployeeAccess } from 'src/auth/decorators/employee.decorator';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';

@Controller({ path: 'sales', version: '1' })
@UseGuards(AuthGuard, RolesGuard)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @EmployeeAccess()
  @Post('agregar')
  async create(@Body() createSaleDto: CreateSaleDto) {
    return await this.salesService.create(createSaleDto);
  }

  //verificar la accesibilidad
  @EmployeeAccess()
  @Patch(':saleId')
  update(@Param('saleId') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }
  // ENDPOINT QUE RECIBA EL ID DE LA VENTA, QUE LE ASIGNE EL TIMESTAMP FINAL PARA TERMINARLO
  // POSIBLEMENTE DEVOLVER OTRO ID, O LLAMAR AL CREATE

  @AdminAccess()
  @Get('all')
  findAll() {
    return this.salesService.findAll();
  }

  @AdminAccess()
  @Get(':saleId')
  findOne(@Param('saleId') id: string) {
    return this.salesService.findOne(id);
  }

  @AdminAccess()
  @Delete(':saleId')
  remove(@Param('saleId') id: string) {
    return this.salesService.remove(id);
  }
}
