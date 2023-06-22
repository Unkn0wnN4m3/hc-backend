import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller({ path: 'sales', version: '1' })
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return await this.salesService.create(createSaleDto);
  }

  @Patch()
  update(@Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(updateSaleDto);
  }
  // ENDPOINT QUE RECIBA EL ID DE LA VENTA, QUE LE ASIGNE EL TIMESTAMP FINAL PARA TERMINARLO
  // POSIBLEMENTE DEVOLVER OTRO ID, O LLAMAR AL CREATE

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
