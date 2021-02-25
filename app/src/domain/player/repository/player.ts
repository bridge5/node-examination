

import { EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PlayerEntity } from './entity';
import { BaseMongo } from 'src/core';
import {
    AbcPlayerQueryRepo, AbcPlayerSaveRepo,
    CreateBO, QueryOne,
} from '../interface/repository';


@EntityRepository(PlayerEntity)
export class PlayerRepository extends BaseMongo<PlayerEntity> { }


@Injectable()
export class PlayerQueryRepo extends AbcPlayerQueryRepo {
    constructor(
        @InjectRepository(PlayerEntity, 'mongo')
        private readonly repo: PlayerRepository,
    ) { super(); }
    async fetchOne(query: QueryOne): Promise<PlayerEntity> {
        const { id } = query;
        return await this.repo.findOne(id);
    }
    async fetchMany(): Promise<PlayerEntity[]> {
        // 题目无此需求
        return [];
    }
}

@Injectable()
export class PlayerSaveRepo extends AbcPlayerSaveRepo {
    constructor(
        @InjectRepository(PlayerEntity, 'mongo')
        private readonly repo: PlayerRepository,
    ) { super(); }
    async save(create: CreateBO): Promise<PlayerEntity> {
        return await this.repo.save(create);
    }
    modify(origin: PlayerEntity, target: PlayerEntity): Promise<PlayerEntity> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<boolean> {
        return !!await this.repo.delete(id);
    }

}
