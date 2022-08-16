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

  test('login bem sucedido', async () => {
    const input: ILoginInputDTO = {
      email: 'astrodev@gmail.com',
      password: 'bananinha',
    };

    const response = await userBusiness.login(input);

    expect(response.message).toEqual('Login realizado com sucesso');
    expect(response.token).toEqual('token-astrodev');
  });

  test('deve retornar erro caso a senha seja inválida', async () => {
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
        expect(error.message).toEqual('Senha incorreta');
      }
    }
  });

  test('deve retornar erro caso o e-mail não tenha cadastro', async () => {
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
        expect(error.message).toEqual('Email não cadastrado');
      }
    }
  });
});
