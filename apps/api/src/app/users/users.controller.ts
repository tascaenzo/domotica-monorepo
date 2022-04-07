import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { DeleteResponseInterface } from '@domotica/shared/interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CONTROLLER_BASE_PATH,
  RESOURCE,
  RESPONSE_STATUS,
} from '@domotica/shared/enums';

@Controller(CONTROLLER_BASE_PATH.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    return new UserDto(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();

    return users.map((user) => new UserDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return new UserDto(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const user = await this.usersService.update(id, updateUserDto);

    if (!user) throw new NotFoundException('User not found');

    return new UserDto(user);
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
