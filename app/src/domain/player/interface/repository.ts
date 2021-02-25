import { PlayerEntity } from "../repository";


export interface QueryOne {
    id: string;
}
export interface QueryMany {
    // 题目无需查多
}
export abstract class AbcPlayerQueryRepo {
    abstract fetchOne(query:QueryOne): Promise<PlayerEntity | undefined>;
    abstract fetchMany(): Promise<PlayerEntity[]>;
}


export interface CreateBO {
    name: string;
    position: string;
}
export abstract class AbcPlayerSaveRepo {
    abstract save(create: CreateBO): Promise<PlayerEntity | undefined>;
    abstract modify(origin: PlayerEntity, target: PlayerEntity): Promise<PlayerEntity>;
    abstract delete(id: string): Promise<boolean>;
}
