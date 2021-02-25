

import {
    Column, ObjectIdColumn,
    SaveOptions, DeepPartial, MongoRepository
} from 'typeorm';
import { ObjectID } from 'bson';


class BaseEntity {
    @Column({ type: 'float' })
    created_at: number;
    @Column({ type: 'float' })
    updated_at: number;
    @Column({ type: 'float', nullable: true })
    expired_at?: number;
    @Column({ type: 'float', nullable: true })
    deleted_at?: number;
}

export class MongoEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID
}

const createTime = () => {
    return (new Date()).valueOf();
}

const getNewEntity = (entity: any) => {
    const created_at = entity.created_at ? entity.created_at : createTime();
    return {
        ...entity, created_at,
        updated_at: createTime(),
    }
}

export class BaseMongo<T> extends MongoRepository<T> {
    async save<U extends DeepPartial<T>>(
        entityOrEntities: U, options?: SaveOptions,
    ) {
        const result = entityOrEntities instanceof Array ?
            entityOrEntities.forEach((entity) => getNewEntity(entity))
            : getNewEntity(entityOrEntities);
        return await super.save(result, options);
    }
}

