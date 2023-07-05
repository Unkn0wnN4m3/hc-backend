import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { EmployeeAccess } from 'src/auth/decorators/employee.decorator';

@Controller({ path: 'tickets', version: '1' })
//@UseGuards(AuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('one')
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  //@EmployeeAccess()
  @Post('many')
  createTickets(
    @Body(new ParseArrayPipe({ items: CreateTicketDto }))
    tickets: CreateTicketDto[],
  ) {
    if (Array.isArray(tickets)) {
      tickets.forEach((ticket) => {
        this.ticketsService.createTicket(ticket);
      });
    }
  }

  @AdminAccess()
  @Get('all')
  findAll() {
    return this.ticketsService.findAll();
  }

  @AdminAccess()
  @Get(':ticketId')
  findOne(@Param('ticketId') id: string) {
    return this.ticketsService.findOne(id);
  }

  @AdminAccess()
  @Patch(':ticketId')
  update(
    @Param('ticketId') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @AdminAccess()
  @Delete(':ticketId')
  remove(@Param('ticketId') id: string) {
    return this.ticketsService.remove(id);
  }
}
