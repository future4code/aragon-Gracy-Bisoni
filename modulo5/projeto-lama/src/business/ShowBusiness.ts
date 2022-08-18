import { ShowDatabase } from '../database/ShowDatabase';
import { ConflictError } from '../errors/ConflictError';
import { RequestError } from '../errors/RequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { IShowInputDTO, Show } from '../models/Show';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export class ShowBusiness {
  constructor(
    private showDatabase: ShowDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  public createShow = async (input: IShowInputDTO) => {
    const { token, band, startsAt } = input;

    if (!token) {
      throw new RequestError('Missing token');
    }

    if (!band) {
      throw new RequestError('Missing data: insert a band');
    }

    if (!startsAt) {
      throw new RequestError('Missing data: insert when show is happening');
    }

    if (
      startsAt < new Date('2022-12-05') ||
      startsAt > new Date('2022-12-11')
    ) {
      throw new RequestError('Invalid date');
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new RequestError('Invalid token');
    }

    const isUserAdmin = payload.role === 'ADMIN';

    if (!isUserAdmin) {
      throw new UnauthorizedError('Only admin accounts can create shows');
    }

    const isDataAvailable = await this.showDatabase.verifyDate(startsAt);

    if (!isDataAvailable) {
      throw new ConflictError('We already have this show');
    }

    const starts_at = new Date(startsAt);

    const id = this.idGenerator.generate();
    const show = new Show(id, band, starts_at);

    await this.showDatabase.createShow(show);

    const response = {
      message: 'Show created successfully',
      show,
    };

    return response;
  };
}
