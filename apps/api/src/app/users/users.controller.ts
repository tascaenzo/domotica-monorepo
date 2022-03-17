import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { DeleteResponseInterface } from '@domotica/shared/interfaces';
import { CONTROLLER_BASE_PATH, RESOURCE, RESPONSE_STATUS } from '@domotica/shared/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller(CONTROLLER_BASE_PATH.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResponseInterface> {
    const deleted = await this.usersService.remove(id);

    if (!deleted) {
      throw new NotFoundException({ status: RESPONSE_STATUS.ERROR });
    }

    return {
      status: RESPONSE_STATUS.SUCCESS,
      resorce: RESOURCE.USER,
      id: deleted.id,
    };
  }
}
