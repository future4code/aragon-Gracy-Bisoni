import { IGetShowsDBDTO, IShowDB, ITicketDB, Show } from '../models/Show';
import { BaseDatabase } from './BaseDatabase';

export class ShowDatabase extends BaseDatabase {
  public static TABLE_SHOWS = 'Lama_Shows';
  public static TABLE_TICKETS = 'Lama_Tickets';

  public verifyDate = async (starts_at: Date): Promise<IShowDB | null> => {
    const result = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
      .select()
      .where({ starts_at });

    return result[0];
  };

  public createShow = async (show: Show) => {
    const showDB: IShowDB = {
      id: show.getId(),
      band: show.getBand(),
      starts_at: show.getStartsAt(),
    };

    await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS).insert(showDB);
  };

  public getShows = async (
    input: IGetShowsDBDTO | undefined
  ): Promise<IShowDB[] | undefined> => {
    const { search, order, sort, limit, offset } = input;

    if (search) {
      const showsDB = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
        .select('*')
        .where(`band`, 'LIKE', `'%${search}%'`)
        .orderBy(sort, order)
        .limit(limit)
        .offset(offset);

      return showsDB;
    } else {
      const showsDB: IShowDB[] = await BaseDatabase.connection(
        ShowDatabase.TABLE_SHOWS
      )
        .select('*')
        .orderBy(sort, order)
        .limit(limit)
        .offset(offset);

      return showsDB;
    }
  };

  public getTickets = async (id: string) => {
    const result = await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
      .select()
      .count('id')
      .where({ show_id: id });

    return result[0]['count(`id`)'];
  };
  public verifyShow = async (id: string): Promise<IShowDB | undefined> => {
    const result: IShowDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_SHOWS
    )
      .select()
      .where({ id });

    return result[0];
  };

  public verifyTicket = async (
    id: string,
    idUser: string
  ): Promise<ITicketDB | undefined> => {
    const result: ITicketDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_TICKETS
    )
      .select()
      .where('id', '=', `${id}`)
      .andWhere('user_id', '=', `${idUser}`);

    return result[0];
  };

  public existBoughtTicket = async (
    id: string,
    idUser: string
  ): Promise<ITicketDB | undefined> => {
    const result: ITicketDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_TICKETS
    )
      .select()
      .where('show_id', '=', `${id}`)
      .andWhere('user_id', '=', `${idUser}`);

    return result[0];
  };

  public newTicket = async (ticket: ITicketDB) => {
    await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS).insert(ticket);
  };

  public deleteTicket = async (id: string) => {
    await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
      .delete()
      .where({ id });
  };
}
