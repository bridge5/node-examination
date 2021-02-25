

import { Entity, Column } from 'typeorm';

import { MongoEntity } from 'src/core';


@Entity('com_player')
export class PlayerEntity extends MongoEntity {
    @Column()
    name: string;
    @Column()
    position: string;
}
