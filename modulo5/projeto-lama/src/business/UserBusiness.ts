import { UserDatabase } from '../database/UserDatabase';
import { ConflictError } from '../errors/ConflictError';
import { RequestError } from '../errors/RequestError';
import { ISignupInputDTO, User, USER_ROLES } from '../models/User';
import { Authenticator, ITokenPayload } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  public async signup(input: ISignupInputDTO) {
    const name = input.name;
    const email = input.email;
    const password = input.password;

    if (!name || !email || !password) {
      throw new Error(
        'One or more missing params. Must insert: name, email and password'
      );
    }

    if (typeof name !== 'string' || name.length < 3) {
      throw new RequestError(
        'Name must be string type, with more than 3 characters'
      );
    }

    if (typeof password !== 'string' || password.length < 6) {
      throw new Error(
        'Password must be string type, with more than 6 characters.'
      );
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) ||
      typeof email !== 'string'
    ) {
      throw new Error('Invalid e-mail');
    }

    const searchUser = await this.userDatabase.findByEmail(email);

    if (searchUser) {
      throw new ConflictError('E-mail already have an account');
    }

    const id = this.idGenerator.generate();
    const hashedPassword = await this.hashManager.hash(password);

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL
    );

    await this.userDatabase.createUser(newUser);

    const payload: ITokenPayload = {
      id: newUser.getId(),
      role: newUser.getRole(),
    };

    const token = this.authenticator.generateToken(payload);

    const response = {
      message: 'User created successfully!',
      token,
    };

    return response;
  }
}
