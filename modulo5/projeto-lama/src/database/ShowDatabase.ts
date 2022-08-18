import { IShowDB, Show } from '../models/Show';
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
}
