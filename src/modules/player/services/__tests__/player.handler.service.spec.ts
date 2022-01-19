import { PlayerHandlerService } from '../player.handler.service';
import { PLAYER_STATUS, playerValidExample } from '../../schema/player.schema';
import * as _ from 'lodash';
import { NotFoundErrorException } from '../../../../exceptions/notFoundError.exception';
import { playerIdParamValidExample } from '../../../../dto/playerIdParam.dto';

describe('PlayerHandlerService', () => {
  let playerHandlerService: PlayerHandlerService;
  let mockQueryPlayerService;
  let mockUpdatePlayerService;
  let generatePlayerHandlerService;

  beforeAll(() => {
    generatePlayerHandlerService = () =>
      new PlayerHandlerService(mockUpdatePlayerService, mockQueryPlayerService);
  });

  beforeEach(() => {
    mockQueryPlayerService = {};
    mockUpdatePlayerService = {};
  });

  describe('createPlayer', () => {
    it('should create Player', async () => {
      mockUpdatePlayerService = {
        create: jest.fn(() => playerValidExample),
      };
      playerHandlerService = generatePlayerHandlerService();
      const result = await playerHandlerService.createPlayer(
        playerValidExample,
      );
      expect(mockUpdatePlayerService.create).toHaveBeenCalledWith({
        docs: playerValidExample,
      });
      expect(result).toEqual(playerValidExample);
    });
  });

  describe('updatePlayer', () => {
    it('should update Player', async () => {
      mockQueryPlayerService = {
        findOne: jest.fn(() => playerValidExample),
      };
      mockUpdatePlayerService = {
        update: jest.fn(),
      };
      playerHandlerService = generatePlayerHandlerService();
      const result = await playerHandlerService.updatePlayer(
        _.pick(playerValidExample, ['id', 'name', 'position']),
      );
      expect(mockQueryPlayerService.findOne).toHaveBeenCalledWith({
        filter: {
          _id: playerValidExample.id,
          status: PLAYER_STATUS.published,
        },
      });
      expect(mockUpdatePlayerService.update).toHaveBeenCalledWith({
        conditions: { _id: playerValidExample.id },
        update: _.pick(playerValidExample, ['name', 'position']),
      });
      expect(result).toBeUndefined();
    });
    it('should throw NotFoundError if Player not found', async () => {
      mockQueryPlayerService = {
        findOne: jest.fn(),
      };
      mockUpdatePlayerService = {
        update: jest.fn(),
      };
      playerHandlerService = generatePlayerHandlerService();
      let error;
      try {
        await playerHandlerService.updatePlayer(
          _.pick(playerValidExample, ['id', 'name', 'position']),
        );
      } catch (e) {
        error = e;
      }
      expect(mockQueryPlayerService.findOne).toHaveBeenCalledWith({
        filter: {
          _id: playerValidExample.id,
          status: PLAYER_STATUS.published,
        },
      });
      expect(mockUpdatePlayerService.update).not.toBeCalled();
      expect(error).toBeInstanceOf(NotFoundErrorException);
    });
  });

  describe('queryPlayerById', () => {
    it('should query Player by id', async () => {
      mockQueryPlayerService = {
        findOne: jest.fn(() => playerValidExample),
      };
      playerHandlerService = generatePlayerHandlerService();
      const result = await playerHandlerService.queryPlayerById(
        playerIdParamValidExample.playerId,
      );
      expect(mockQueryPlayerService.findOne).toHaveBeenCalledWith({
        filter: {
          _id: playerIdParamValidExample.playerId,
          status: PLAYER_STATUS.published,
        },
      });
      expect(result).toEqual(playerValidExample);
    });
    it('should throw NotFoundError if Player not found', async () => {
      mockQueryPlayerService = {
        findOne: jest.fn(),
      };
      playerHandlerService = generatePlayerHandlerService();
      let error;
      try {
        await playerHandlerService.queryPlayerById(
          playerIdParamValidExample.playerId,
        );
      } catch (e) {
        error = e;
      }
      expect(mockQueryPlayerService.findOne).toHaveBeenCalledWith({
        filter: {
          _id: playerIdParamValidExample.playerId,
          status: PLAYER_STATUS.published,
        },
      });
      expect(error).toBeInstanceOf(NotFoundErrorException);
    });
  });

  describe('deletePlayerById', () => {
    it('should update Player', async () => {
      mockQueryPlayerService = {
        findOne: jest.fn(() => playerValidExample),
      };
      mockUpdatePlayerService = {
        update: jest.fn(),
      };
      playerHandlerService = generatePlayerHandlerService();
      const result = await playerHandlerService.deletePlayerById(
        playerIdParamValidExample.playerId,
      );
      expect(mockQueryPlayerService.findOne).toHaveBeenCalledWith({
        filter: {
          _id: playerIdParamValidExample.playerId,
          status: PLAYER_STATUS.published,
        },
      });
      expect(mockUpdatePlayerService.update).toHaveBeenCalledWith({
        conditions: { _id: playerIdParamValidExample.playerId },
        update: { status: PLAYER_STATUS.delete },
      });
      expect(result).toBeUndefined();
    });
    it('should throw NotFoundError if Player not found', async () => {
      mockQueryPlayerService = {
        findOne: jest.fn(),
      };
      mockUpdatePlayerService = {
        update: jest.fn(),
      };
      playerHandlerService = generatePlayerHandlerService();
      let error;
      try {
        await playerHandlerService.deletePlayerById(
          playerIdParamValidExample.playerId,
        );
      } catch (e) {
        error = e;
      }
      expect(mockQueryPlayerService.findOne).toHaveBeenCalledWith({
        filter: {
          _id: playerIdParamValidExample.playerId,
          status: PLAYER_STATUS.published,
        },
      });
      expect(mockUpdatePlayerService.update).not.toBeCalled();
      expect(error).toBeInstanceOf(NotFoundErrorException);
    });
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });
});
