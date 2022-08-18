import { UserBusiness } from '../../src/business/UserBusiness';
import { BaseError } from '../../src/errors/BaseError';
import { ISignupInputDTO } from '../../src/models/User';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { HashManagerMock } from '../mocks/services/HashManagerMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { UserDatabaseMock } from '../mocks/UserDatabaseMock';

describe('Testando UserBusiness', () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test('signup bem sucedido', async () => {
    const input: ISignupInputDTO = {
      name: 'alice',
      email: 'alice@gmail.com',
      password: 'alice99',
    };

    const response = await userBusiness.signup(input);

    expect(response.message).toEqual('User created successfully!');
    expect(response.token).toEqual('token-mock');
  });

  //   test('return name if name is an empty string', async () => {
  //     expect.assertions(2);

  //     try {
  //       const input: ISignupInputDTO = {
  //         name: '',
  //         email: 'alice@gmail.com',
  //         password: 'alice99',
  //       };

  //       await userBusiness.signup(input);
  //     } catch (error: unknown) {
  //       if (error instanceof BaseError) {
  //         expect(error.statusCode).toEqual(400);
  //         expect(error.message).toEqual(
  //           'Name must be string type, with more than 3 characters'
  //         );
  //       }
  //     }
  //   });

  //   test('return an error if e-mail already have an account', async () => {
  //     expect.assertions(2);

  //     try {
  //       const input: ISignupInputDTO = {
  //         name: 'Astrodev',
  //         email: 'astrodev@gmail.com',
  //         password: 'bananinha',
  //       };

  //       await userBusiness.signup(input);
  //     } catch (error: unknown) {
  //       if (error instanceof BaseError) {
  //         expect(error.statusCode).toEqual(409);
  //         expect(error.message).toEqual('E-mail already have an account');
  //       }
  //     }
  //   });
});
