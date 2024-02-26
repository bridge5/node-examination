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
import * as _ from 'lodash';

const path = '/player';

describe(`POST ${path}`, () => {
  let app: INestApplication;
  let playerHandlerService;
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
    updatePlayerService = appModule.get<UpdatePlayerService>(
      'UpdatePlayerService',
    );
    mockFunctionGroup = {
      spyHandlerCreatePlayer: jest
        .spyOn(playerHandlerService, 'createPlayer')
        .mockName('spyHandlerCreatePlayer'),
      spyCreate: jest
        .spyOn(updatePlayerService, 'create')
        .mockName('spyCreate'),
    };
    app = await appModule.init();
  });

  describe('success cases', () => {
    it('should create player', async () => {
      mockingoose(playerTestModel).toReturn(playerValidExample, 'save');
      const response = await request(app.getHttpServer())
        .post(path)
        .send(_.pick(playerValidExample, ['name', 'position']));
      expect(response.status).toEqual(HttpStatus.CREATED);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        snapshots: ['spyHandlerCreatePlayer', 'spyCreate'],
      });
    });
  });

  describe('fail cases', () => {
    it('should throw Validation Error if request is incorrect', async () => {
      const response = await request(app.getHttpServer()).post(path).send({});
      expect(response.status).toEqual(405);
      generateSequentialTests({
        mockFunctionGroup,
        apiResponse: response,
        notCalled: ['spyHandlerCreatePlayer', 'spyCreate'],
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
