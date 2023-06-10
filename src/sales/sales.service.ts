import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = new Sale();
    sale.day = createSaleDto.day;
    sale.month = createSaleDto.month;
    sale.year = createSaleDto.year;
    sale.employee = sale.employee;

    return await this.salesRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return await this.salesRepository.find();
  }

  async findOne(id: string): Promise<Sale> {
    return await this.salesRepository.findOneBy({
      id,
    });
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    return await this.salesRepository.update(id, updateSaleDto);
  }

  async remove(id: string): Promise<void> {
    const deletedSale = await this.salesRepository.findOneBy({
      id,
    });
    await this.salesRepository.remove(deletedSale);
  }
}
