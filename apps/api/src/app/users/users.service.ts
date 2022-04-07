import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { Logger } from '../logger';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly logger: Logger
  ) {}

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email, deletedAt: null });

      if (user && (await compare(password, user.password))) {
        const userObj = user.toObject();

        delete userObj.password;
        userObj.id = user.id;

        return userObj;
      }

      return null;
    } catch (error) {
      this.logger.error({
        message: error,
        context: UsersService.name,
        save: true,
      });

      return null;
    }
  }

  async create(dto: CreateUserDto): Promise<User | null> {
    try {
      dto.password = await hash(dto.password, 10);
      const user = (await this.userModel.create(dto)).toObject();

      delete user['password'];

      return user;
    } catch (error) {
      this.logger.error({
        message: error,
        context: UsersService.name,
        save: true,
      });

      return null;
    }
  }

  async findAll(): Promise<User[] | null> {
    try {
      return this.userModel.find({ deletedAt: null }, { password: 0 }).sort({
        createdAt: -1,
      });
    } catch (error) {
      this.logger.error({
        message: error,
        context: UsersService.name,
        save: true,
      });

      return null;
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ _id: id });

      if (!user) return null;

      return user.toJSON();
    } catch (error) {
      this.logger.error({
        message: error,
        context: UsersService.name,
        save: true,
      });

      return null;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    try {
      return this.userModel.findOneAndUpdate({ _id: id }, dto, {
        new: true,
      });
    } catch (error) {
      this.logger.error({
        message: error,
        context: UsersService.name,
        save: true,
      });

      return null;
    }
  }

  async remove(id: string): Promise<User | null> {
    try {
      return this.userModel.findOneAndUpdate(
        { _id: id },
        { deletedAt: new Date() }
      );
    } catch (error) {
      this.logger.error({
        message: error,
        context: UsersService.name,
        save: true,
      });

      return null;
    }
  }
}
