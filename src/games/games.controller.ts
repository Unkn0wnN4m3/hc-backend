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
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { EmployeeAccess } from 'src/auth/decorators/employee.decorator';

@Controller({ path: 'games', version: '1' })
@UseGuards(AuthGuard, RolesGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @AdminAccess()
  @Post('agergar')
  async create(@Body() body: CreateGameDto) {
    return await this.gamesService.create(body);
  }

  @AdminAccess()
  @Get('all')
  findAll() {
    return this.gamesService.findAll();
  }

  @EmployeeAccess()
  @Get(':gameId')
  findOne(@Param('gameId') id: string) {
    return this.gamesService.findOneGame(id);
  }

  @AdminAccess()
  @Patch(':gameId')
  update(@Param('gameId') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @AdminAccess()
  @Delete(':gameIdd')
  remove(@Param('gameId') id: string) {
    return this.gamesService.remove(id);
  }
}
