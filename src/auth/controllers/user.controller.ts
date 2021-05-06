import { Controller, Post, Body, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { AddUserInput } from '../../redirection/inputs/add-user.input';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(@Body() addUserInput: AddUserInput) {
    let user = await this.userService.addUser(addUserInput);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:userId')
  async deleteOffer( @Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
