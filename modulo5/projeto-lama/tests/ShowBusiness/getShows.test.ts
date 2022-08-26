import { ShowBusiness } from '../../src/business/ShowBusiness';
import { BaseError } from '../../src/errors/BaseError';
import { IGetShowsInputDTO } from '../../src/models/Show';
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

  test('Succeeded get shows', async () => {
    const input: IGetShowsInputDTO = {
      token: 'token-astrodev',
      search: undefined,
      order: undefined,
      sort: undefined,
      page: undefined,
      limit: undefined,
    };

    const response = await showBusiness.getShows(input);

    expect(response.shows.length).toEqual(3);
    expect(response.shows[0].getId()).toEqual('201');
    expect(response.shows[0].getBand()).toEqual('Foo Fighters');
    expect(response.shows[0].getStartsAt()).toEqual(new Date('2022/12/05'));
  });

  test('returns error if token is invalid', async () => {
    expect.assertions(2);
    try {
      const input: IGetShowsInputDTO = {
        token: 'invalid-token',
        search: undefined,
        order: undefined,
        sort: undefined,
        page: undefined,
        limit: undefined,
      };

      await showBusiness.getShows(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid token');
        expect(error.statusCode).toEqual(400);
      }
    }
  });
});
