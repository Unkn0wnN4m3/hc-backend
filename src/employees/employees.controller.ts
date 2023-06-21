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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
/*
import { HasRoles } from './entities/roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
*/

@Controller({ path: 'employees', version: '1' })
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  // NOTE: Only a user with "Admin" role can access to this endpoint
  /* TODO REIMPLMENTAR
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.Admin)*/
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
