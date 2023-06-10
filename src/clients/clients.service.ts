import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = new Client();
    client.fistName = createClientDto.firstName;
    client.lastName = createClientDto.lastName;
    client.email = createClientDto.email;
    client.dni = createClientDto.dni;
    client.phoneNumber = createClientDto.phoneNumber;

    return await this.clientsRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find();
  }

  async findOne(id: string): Promise<Client> {
    return await this.clientsRepository.findOneBy({
      id,
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientsRepository.update(id, updateClientDto);
  }

  async remove(id: number): Promise<void> {
    const deletedClient = await this.clientsRepository.findOneBy({
      id,
    });
    await this.clientsRepository.remove(deletedClient);
  }
}
