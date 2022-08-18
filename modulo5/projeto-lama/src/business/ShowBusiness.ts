import { ShowDatabase } from '../database/ShowDatabase';
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { RequestError } from '../errors/RequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import {
  IBuyTicketInputDTO,
  IBuyTicketOutputDTO,
  IGetShowsDBDTO,
  IGetShowsInputDTO,
  IShowDB,
  IShowInputDTO,
  ITicketDB,
  Show,
} from '../models/Show';
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

  public getShows = async (input: IGetShowsInputDTO) => {
    const token = input.token;
    const search = input.search || '';
    const order = input.order || 'ASC';
    const sort = input.sort || 'starts_at';
    const limit = Number(input.limit) || 10;
    const page = Number(input.page) || 1;
    const offset = (page - 1) * limit;

    if (!token) {
      throw new RequestError('Missing token');
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new RequestError('Invalid token');
    }

    const getShowsInputDB: IGetShowsDBDTO = {
      search,
      order,
      sort,
      limit,
      offset,
    };

    const showsDB = await this.showDatabase.getShows(getShowsInputDB);
    const shows = showsDB.map(showDB => {
      return new Show(showDB.id, showDB.band, showDB.starts_at);
    });

    for (let show of shows) {
      const tickets: any = await this.showDatabase.getTickets(show.getId());
      show.setTickets(show.getTickets() - tickets);
    }

    const response = {
      message: 'SUCCESS',
      shows,
    };

    return response;
  };

  public buyTicket = async (input: IBuyTicketInputDTO) => {
    const { token, showId } = input;

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new RequestError('Missing token');
    }

    if (!showId || typeof showId !== 'string') {
      throw new RequestError('Missing params: insert a valid show id');
    }

    const searchShow = await this.showDatabase.verifyShow(showId);

    if (!searchShow) {
      throw new NotFoundError('Show not found');
    }

    const searchTicket = await this.showDatabase.existBoughtTicket(
      showId,
      payload.id
    );

    if (searchTicket) {
      throw new ConflictError('You already bought tickets for this show');
    }

    const shows = await this.getShows({
      token,
      search: undefined,
      order: undefined,
      sort: undefined,
      page: undefined,
      limit: undefined,
    });

    const [ticketsAvailable] = shows.shows.filter(show => {
      return show.getId() === showId;
    });

    if (ticketsAvailable.getTickets() === 0) {
      throw new RequestError('Tickets sold out');
    }

    const id = this.idGenerator.generate();

    const ticket: ITicketDB = {
      id: id,
      show_id: showId,
      user_id: payload.id,
    };

    await this.showDatabase.newTicket(ticket);

    const response: IBuyTicketOutputDTO = {
      message: 'Ticket bougth successfully!',
    };

    return response;
  };
}
