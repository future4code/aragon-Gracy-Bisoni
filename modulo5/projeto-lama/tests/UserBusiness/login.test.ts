import { UserBusiness } from '../../src/business/UserBusiness';
import { ILoginInputDTO } from '../../src/models/User';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { HashManagerMock } from '../mocks/services/HashManagerMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { UserDatabaseMock } from '../mocks/UserDatabaseMock';
import { BaseError } from '../../src/errors/BaseError';

describe('Testando UserBusiness', () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test('Successfully login', async () => {
    const input: ILoginInputDTO = {
      email: 'astrodev@gmail.com',
      password: 'bananinha',
    };

    const response = await userBusiness.login(input);

    expect(response.message).toEqual("You're logged");
    expect(response.token).toEqual('token-astrodev');
  });

  test('returns an error if password is incorrect', async () => {
    expect.assertions(2);

    try {
      const input: ILoginInputDTO = {
        email: 'astrodev@gmail.com',
        password: 'bnanainha',
      };

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual('Incorrect password.');
      }
    }
  });

  test("E-mail isn't in database", async () => {
    expect.assertions(2);

    try {
      const input: ILoginInputDTO = {
        email: 'semcadastro@gmail.com',
        password: 'testeSenha',
      };

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual('E-mail not found');
      }
    }
  });
});
