import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as mockingoose from 'mockingoose';
import {
  generateSequentialTests,
  mockGenericApp,
  playerTestModel,
} from '../../helper/e2e.helper';
import { PlayerModule } from '../../../src/modules/player/player.module';
import { PlayerHandlerService } from '../../../src/modules/player/services/player.handler.service';
import { playerValidExample } from '../../../src/modules/player/schema/player.schema';
import { UpdatePlayerService } from '../../../src/modules/player/services/updatePlayer.service';
import { QueryPlayerService } from '../../../src/modules/player/services/queryPlayer.service';

const path = '/player';

describe(`PUT ${path}`, () => {
  let app: INestApplication;
  let playerHandlerService;
  let queryPlayerService: QueryPlayerService;
  let updatePlayerService: UpdatePlayerService;
  let mockFunctionGroup;

  beforeAll(async () => {
    const appModule = (
      await mockGenericApp({
        module: {
          imports: [PlayerModule],
        },
      })
    ).createNestApplication();
    playerHandlerService = appModule.get<PlayerHandlerService>(
      'PlayerHandlerService',
    );
    queryPlayerService =
      appModule.get<QueryPlayerService>('QueryPlayerService');
    updatePlayerService = appModule.get<UpdatePlayerService>(
      'UpdatePlayerService',
    );
    mockFunctionGroup = {
      spyHandlerUpdatePlayer: jest
        .spyOn(playerHandlerService, 'updatePlayer')
        .mockName('spyHandlerUpdatePlayer'),
      spyFindOne: jest
        .spyOn(queryPlayerService, 'findOne')
        .mockName('spyFindOne'),
      spyUpdate: jest
        .spyOn(updatePlayerService, 'update')
        .mockName('spyUpdate'),
    };
    app = await appModule.init();
  });

  describe('success cases', () => {
    it('should update player', async () => {
      mockingoose(playerTestModel).toReturn(playerValidExample, 'findOne');
      mockingoose(playerTestModel).toReturn(null, 'findOneAndUpdate');
      const response = await request(app.getHttpServer())
        .put(path)
        .send(playerValidExample);
      expect(response.status).toEqual(HttpStatus.OK);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        snapshots: ['spyHandlerUpdatePlayer', 'spyFindOne', 'spyUpdate'],
      });
    });
  });

  describe('fail cases', () => {
    it('should throw Validation Error if request is incorrect', async () => {
      const response = await request(app.getHttpServer()).put(path).send({});
      expect(response.status).toEqual(405);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        notCalled: ['spyHandlerUpdatePlayer', 'spyFindOne', 'spyUpdate'],
      });
    });
    it('should throw NotFoundErrorException if player is not fount', async () => {
      mockingoose(playerTestModel).toReturn(null, 'findOne');
      const response = await request(app.getHttpServer())
        .put(path)
        .send(playerValidExample);
      expect(response.status).toEqual(HttpStatus.NOT_FOUND);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        snapshots: ['spyHandlerUpdatePlayer', 'spyFindOne'],
        notCalled: ['spyUpdate'],
      });
    });
  });

  afterEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
});
