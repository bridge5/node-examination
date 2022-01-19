import { PlayerController } from '../player.controller';
import { playerValidExample } from '../../schema/player.schema';
import { playerIdParamValidExample } from '../../../../dto/playerIdParam.dto';
import * as _ from 'lodash';
import { ServerResponse } from 'http';

describe('PlayerController', () => {
  let playerController: PlayerController;
  let mockPlayerHandlerService;
  let generatePlayerController;

  beforeAll(() => {
    generatePlayerController = () =>
      new PlayerController(mockPlayerHandlerService);
  });

  beforeEach(() => {
    mockPlayerHandlerService = {};
  });

  describe('GET /:playerId', () => {
    const res = {
      set: jest.fn(),
      send: jest.fn(),
    } as any;
    it('should return player details by id', async () => {
      mockPlayerHandlerService = {
        queryPlayerById: jest.fn(() => playerValidExample),
      };
      playerController = generatePlayerController();
      await playerController.getPlayerById(playerIdParamValidExample, res);
      expect(mockPlayerHandlerService.queryPlayerById).toBeCalledWith(
        playerIdParamValidExample.playerId,
      );
    });
  });

  describe('POST /', () => {
    it('should return created player', async () => {
      mockPlayerHandlerService = {
        createPlayer: jest.fn(() => playerValidExample),
      };
      playerController = generatePlayerController();
      const result = await playerController.postPlayer(
        _.pick(playerValidExample, ['name', 'position']),
      );
      expect(mockPlayerHandlerService.createPlayer).toBeCalledWith(
        _.pick(playerValidExample, ['name', 'position']),
      );
      expect(result).toEqual(playerValidExample);
    });
  });

  describe('PUT /', () => {
    it('should return update player', async () => {
      mockPlayerHandlerService = {
        updatePlayer: jest.fn(),
      };
      playerController = generatePlayerController();
      const result = await playerController.putPlayer(
        _.pick(playerValidExample, ['id', 'name', 'position']),
      );
      expect(mockPlayerHandlerService.updatePlayer).toBeCalledWith(
        _.pick(playerValidExample, ['id', 'name', 'position']),
      );
      expect(result).toBeUndefined();
    });
  });

  describe('DELETE /', () => {
    it('should return delete player', async () => {
      mockPlayerHandlerService = {
        deletePlayerById: jest.fn(),
      };
      playerController = generatePlayerController();
      const result = await playerController.deletePlayerById(
        playerIdParamValidExample,
      );
      expect(mockPlayerHandlerService.deletePlayerById).toBeCalledWith(
        playerIdParamValidExample.playerId,
      );
      expect(result).toBeUndefined();
    });
  });
});
