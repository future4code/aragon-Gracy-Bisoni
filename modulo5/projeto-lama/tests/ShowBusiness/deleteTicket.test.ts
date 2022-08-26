import { ShowBusiness } from '../../src/business/ShowBusiness';
import { BaseError } from '../../src/errors/BaseError';
import { IDeleteTicketInputDTO } from '../../src/models/Show';
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

  test('successfully deleted ticket', async () => {
    const input: IDeleteTicketInputDTO = {
      token: 'token-mock',
      ticketId: '304',
    };

    const response = await showBusiness.deleteTicket(input);

    expect(response.message).toEqual('Ticket deleted successfuly!');
  });

  test('returns error if ticket not found', async () => {
    expect.assertions(2);
    try {
      const input: IDeleteTicketInputDTO = {
        token: 'token-mock',
        ticketId: '306',
      };

      await showBusiness.deleteTicket(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual(
          "You didn't bougth tickets for this show"
        );
      }
    }
  });

  test('Returns error if token is missing', async () => {
    expect.assertions(2);
    try {
      const input: IDeleteTicketInputDTO = {
        token: '',
        ticketId: '306',
      };

      await showBusiness.deleteTicket(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual('Missing/invalid token');
      }
    }
  });

  test('returns error if ticketId is missing', async () => {
    expect.assertions(2);
    try {
      const input: IDeleteTicketInputDTO = {
        token: 'token-mock',
        ticketId: '',
      };

      await showBusiness.deleteTicket(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual(
          'Missing params: insert a valid ticket id'
        );
      }
    }
  });
});
