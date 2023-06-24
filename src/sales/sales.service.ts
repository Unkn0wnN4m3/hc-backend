import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
//import { ReturnSaleDto } from './dto/return-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private readonly salesRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    try {
      return await this.salesRepository.save(createSaleDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  /*
  async create(createSaleDto: CreateSaleDto): Promise<ReturnSaleDto> {
    try {
      const newSale = await this.salesRepository.save(createSaleDto);
      const saleDto: ReturnSaleDto = { employee: newSale.id };
      return saleDto;
    } catch (error) {
      throw new Error(error);
    }
  }
*/
  async findAll(): Promise<Sale[]> {
    return await this.salesRepository.find();
  }

  async findOne(id: string): Promise<Sale> {
    return await this.salesRepository.findOneBy({
      id,
    });
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale: Sale = await this.findOne(id);
    if (!sale) {
      throw new NotFoundException(`El objeto con el ID ${id} no existe`);
    }
    sale.completedAt = updateSaleDto.completedAt;
    return await this.salesRepository.save(sale);
  }

  async remove(id: string): Promise<void> {
    const deletedSale = await this.salesRepository.findOneBy({
      id,
    });
    await this.salesRepository.remove(deletedSale);
  }
}
