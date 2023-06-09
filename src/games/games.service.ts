import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = new Game();
    game.name = createGameDto.name;
    game.price = createGameDto.price;
    game.schedule = createGameDto.schedule;

    return await this.gameRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: string): Promise<Game> {
    return await this.gameRepository.findOneBy({
      id,
    });
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<any> {
    return await this.gameRepository.update(id, updateGameDto);
  }

  async remove(id: string): Promise<Game> {
    const game = await this.gameRepository.findOneBy({
      id,
    });

    return await this.gameRepository.remove(game);
  }
}
