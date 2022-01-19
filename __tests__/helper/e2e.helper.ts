import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import { GenericE2ETestModule } from './genericE2eTest.module';
import { PlayerSchema } from '../../src/modules/player/schema/player.schema';

export const playerTestModel = mongoose.model('player', PlayerSchema);

const mockLoggerService = {
  errorLog: jest.fn(),
  infoLog: jest.fn(),
  auditLog: jest.fn(),
  debuglog: jest.fn(),
};

interface MockGenericAppInterface {
  module?: {
    imports?: any[];
    controllers?: any[];
    providers?: any[];
  };
  overrideProviderCall?: any;
}

export const mockGenericApp = async ({
  module,
  overrideProviderCall,
}: MockGenericAppInterface) => {
  const moduleBuilder = Test.createTestingModule({
    imports: [GenericE2ETestModule.register(module)],
  })
    .overrideProvider(getModelToken('player'))
    .useValue(playerTestModel);

  if (overrideProviderCall) {
    overrideProviderCall(moduleBuilder);
  }

  const compiledApp: TestingModule = await moduleBuilder.compile();
  return compiledApp;
};

export const generateSequentialTests = ({
  mockFunctionGroup,
  snapshots = [],
  notCalled = [],
  calledTimes = [],
  apiResponse,
  textSnapshot = false,
}: {
  mockFunctionGroup: {
    [key: string]: any;
  };
  snapshots?: string[];
  notCalled?: string[];
  calledTimes?: { mockFunction: string; times: number }[];
  apiResponse: any;
  textSnapshot?: boolean;
}): void => {
  _.forEach(calledTimes, ({ mockFunction, times }) => {
    expect(_.get(mockFunctionGroup, mockFunction)).toBeCalledTimes(times);
  });
  _.forEach(snapshots, (mockFunction) => {
    expect(_.get(mockFunctionGroup, mockFunction)).toMatchSnapshot();
  });
  _.forEach(notCalled, (mockFunction) => {
    expect(_.get(mockFunctionGroup, mockFunction)).not.toBeCalled();
  });
  if (apiResponse)
    void (textSnapshot
      ? expect(apiResponse.text).toMatchSnapshot()
      : expect(apiResponse.body).toMatchSnapshot());
};
