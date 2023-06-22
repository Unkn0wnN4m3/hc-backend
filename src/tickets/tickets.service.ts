import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
// CUIDADO QUE DEVULEVE VALORES, PERO NO SE USAN
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketsRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return await this.ticketsRepository.save(createTicketDto);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketsRepository.find();
  }

  async findOne(id: string): Promise<Ticket> {
    return await this.ticketsRepository.findOneBy({
      id,
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<any> {
    return await this.ticketsRepository.update(id, updateTicketDto);
  }

  async remove(id: string): Promise<void> {
    const deletedTicket = await this.ticketsRepository.findOneBy({
      id,
    });
    await this.ticketsRepository.remove(deletedTicket);
  }
}
