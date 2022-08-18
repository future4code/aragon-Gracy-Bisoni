import { ShowBusiness } from '../../src/business/ShowBusiness';
import { BaseError } from '../../src/errors/BaseError';
import { IBuyTicketInputDTO, ITicketDB } from '../../src/models/Show';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { HashManagerMock } from '../mocks/services/HashManagerMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { ShowDatabaseMock } from '../mocks/ShowDatabaseMock';

describe('Testing ShowBusiness', () => {
  const showBusiness = new ShowBusiness(
    new ShowDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test('Successfully ticket buy', async () => {
    const input: IBuyTicketInputDTO = {
      token: 'token-mock',
      showId: '201',
    };

    const response = await showBusiness.buyTicket(input);

    expect(response.message).toEqual('Ticket bougth successfully!');
  });

  test('returns error if showId is not found', async () => {
    expect.assertions(2);
    try {
      const input: IBuyTicketInputDTO = {
        token: 'token-mock',
        showId: '205',
      };

      await showBusiness.buyTicket(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual('Show not found');
      }
    }
  });

  test('returns error if you already have ticket for this show', async () => {
    expect.assertions(2);
    try {
      const input: IBuyTicketInputDTO = {
        token: 'token-astrodev',
        showId: '201',
      };

      await showBusiness.buyTicket(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(409);
        expect(error.message).toEqual(
          'You already bought tickets for this show'
        );
      }
    }
  });

  test('returns error if token is missing or invalid', async () => {
    expect.assertions(2);
    try {
      const input: IBuyTicketInputDTO = {
        token: 'token-astrodev2',
        showId: '201',
      };

      await showBusiness.buyTicket(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual('Missing token');
      }
    }
  });
});
