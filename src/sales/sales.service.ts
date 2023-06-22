import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

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

  async findAll(): Promise<Sale[]> {
    return await this.salesRepository.find();
  }

  async findOne(id: string): Promise<Sale> {
    return await this.salesRepository.findOneBy({
      id,
    });
  }

  async update(updateSaleDto: UpdateSaleDto) {
    return await this.salesRepository.update(updateSaleDto.id, {
      completedAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    const deletedSale = await this.salesRepository.findOneBy({
      id,
    });
    await this.salesRepository.remove(deletedSale);
  }
}
