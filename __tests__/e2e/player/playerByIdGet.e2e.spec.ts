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
import { QueryPlayerService } from '../../../src/modules/player/services/queryPlayer.service';
import { playerIdParamValidExample } from '../../../src/dto/playerIdParam.dto';
import { playerValidExample } from '../../../src/modules/player/schema/player.schema';

const path = `/player/${playerIdParamValidExample.playerId}`;

describe(`GET ${path}`, () => {
  let app: INestApplication;
  let playerHandlerService;
  let queryPlayerService: QueryPlayerService;
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
    mockFunctionGroup = {
      spyHandlerQueryPlayerById: jest
        .spyOn(playerHandlerService, 'queryPlayerById')
        .mockName('spyHandlerQueryPlayerById'),
      spyFindOne: jest
        .spyOn(queryPlayerService, 'findOne')
        .mockName('spyFindOne'),
    };
    app = await appModule.init();
  });

  describe('success cases', () => {
    it('should return player details response', async () => {
      mockingoose(playerTestModel).toReturn(playerValidExample, 'findOne');
      const response = await request(app.getHttpServer()).get(path);
      expect(response.status).toEqual(HttpStatus.OK);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        snapshots: ['spyHandlerQueryPlayerById', 'spyFindOne'],
        textSnapshot: true,
      });
    });
  });

  describe('fail cases', () => {
    it('should throw Validation Error if player id is incorrect', async () => {
      const response = await request(app.getHttpServer()).get('/player/aaa');
      expect(response.status).toEqual(405);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        notCalled: ['spyHandlerQueryPlayerById', 'spyFindOne'],
      });
    });

    it('should throw NotFoundErrorException if player is not fount', async () => {
      mockingoose(playerTestModel).toReturn(null, 'findOne');
      const response = await request(app.getHttpServer()).get(path);
      expect(response.status).toEqual(HttpStatus.NOT_FOUND);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        snapshots: ['spyHandlerQueryPlayerById', 'spyFindOne'],
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
