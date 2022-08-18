import { ShowBusiness } from '../../src/business/ShowBusiness';
import { BaseError } from '../../src/errors/BaseError';
import { IShowInputDTO } from '../../src/models/Show';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { HashManagerMock } from '../mocks/services/HashManagerMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { ShowDatabaseMock } from '../mocks/ShowDatabaseMock';

describe('ShowBusiness test', () => {
  const showBusiness = new ShowBusiness(
    new ShowDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test('successfully created show', async () => {
    const input: IShowInputDTO = {
      token: 'token-astrodev',
      band: 'Liniker e os Caramelows',
      startsAt: new Date('2022-12-06'),
    };

    const response = await showBusiness.createShow(input);

    // SE EU COLOCO UM EXPECT COM A ID DO ASTRODEV, DÁ ERRO
    // APESAR DA CONFERÊNCIA DO TOKEN ESTAR CERTA, ME RETORNA 'id-mock'?????????
    expect(response.message).toEqual('Show created successfully');
    expect(response.show.getBand()).toEqual('Liniker e os Caramelows');
  });

  test('returns error if token is invalid', async () => {
    expect.assertions(2);
    try {
      const input: IShowInputDTO = {
        token: 'invalid-token',
        band: 'Beyonce',
        startsAt: new Date('2022-12-06'),
      };

      await showBusiness.createShow(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid token');
        expect(error.statusCode).toEqual(400);
      }
    }
  });

  test('returns an error if name of band is missing', async () => {
    expect.assertions(2);
    try {
      const input: IShowInputDTO = {
        token: 'token-astrodev',
        band: '',
        startsAt: new Date('2022-12-06'),
      };

      await showBusiness.createShow(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Missing data: insert a band');
        expect(error.statusCode).toEqual(400);
      }
    }
  });

  test('returns an error if date is invalid', async () => {
    expect.assertions(2);
    try {
      const input: IShowInputDTO = {
        token: 'token-astrodev',
        band: 'Lady Gaga',
        startsAt: new Date('2022-12-01'),
      };

      await showBusiness.createShow(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid date');
        expect(error.statusCode).toEqual(400);
      }
    }
  });

  test('Returns an error if show already exists', async () => {
    expect.assertions(2);
    try {
      const input: IShowInputDTO = {
        token: 'token-astrodev',
        band: 'blink-182',
        startsAt: new Date('2022-12-05'),
      };

      await showBusiness.createShow(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('We already have this show');
        expect(error.statusCode).toEqual(409);
      }
    }
  });
});
