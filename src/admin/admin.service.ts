import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      return await this.adminRepository.save(createAdminDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Admin[]> {
    try {
      return await this.adminRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Admin[]> {
    try {
      return await this.adminRepository.findBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      return await this.adminRepository.update(id, updateAdminDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    try {
      const admin = await this.adminRepository.findOneBy({ id });
      return await this.adminRepository.remove(admin);
    } catch (error) {
      throw new Error(error);
    }
  }
}
