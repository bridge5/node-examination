

import {
    Post, Get, Put, Delete, Controller,
    Param, Injectable, Body,
} from '@nestjs/common';
import {
    AbcPlayerQueryRepo, AbcPlayerSaveRepo,
} from '../interface/repository';
import { CreatePlayerDto } from './dto';


/**
 * 一般个人不使用RESTful规范，取而代之为GraphQL
 */
@Controller()
export class PlayerController {
    constructor(
        private readonly saveRepo: AbcPlayerSaveRepo,
        private readonly queryRepo: AbcPlayerQueryRepo,
    ) { }
    @Post('/player')
    async create(@Body() dto: CreatePlayerDto) {
        console.log('create');
        return await this.saveRepo.save(dto); // 此处能根据前端封装好的response解析util定义相应的result格式response。
    }
    @Put('/player')
    async update() {
        console.log('update');
    }
    @Get('/player/:id')
    async find(@Param('id') id: string) {
        console.log('find->', id);
    }
    @Delete('/player/:id')
    async delete(@Param('id') id: string) {
        console.log('delete->', id);
    }
}
