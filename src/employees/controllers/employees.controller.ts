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
import { EmployeesService } from '../services/employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { EmployeeAccess } from 'src/auth/decorators/employee.decorator';
/*
import { HasRoles } from './entities/roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
*/

@Controller({ path: 'employees', version: '1' })
//@UseGuards(AuthGuard, RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // @AdminAccess()
  @Post('employee')
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  // @AdminAccess()
  @Post('admin')
  createAdmin(@Body() body: CreateAdminDto) {
    return this.employeesService.createAdmin(body);
  }

  @AdminAccess()
  @Get('all')
  findAll() {
    return this.employeesService.findAll();
  }

  @EmployeeAccess()
  @Get(':employeeId')
  findOne(@Param('employeeId') id: string) {
    return this.employeesService.findOne(id);
  }

  @EmployeeAccess()
  @Patch(':employeeId')
  update(
    @Param('employeeId') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @AdminAccess()
  @Delete(':employeeId')
  remove(@Param('employeeId') id: string) {
    return this.employeesService.remove(id);
  }
}
