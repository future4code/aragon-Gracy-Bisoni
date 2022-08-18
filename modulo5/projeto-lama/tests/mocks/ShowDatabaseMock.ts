import { BaseDatabase } from '../../src/database/BaseDatabase';
import { IShowDB, Show } from '../../src/models/Show';

export class ShowDatabaseMock extends BaseDatabase {
  public static TABLE_POSTS = 'Labook_Posts';
  public static TABLE_LIKES = 'Labook_Likes';

  public verifyDate = async (starts_at: Date) => {
    switch (starts_at.getDate()) {
      case 5:
        return {
          id: '201',
          band: 'blink-182',
          starts_at: new Date('2022-12-05'),
        } as IShowDB;

      default:
        return null;
    }
  };

  public createShow = async (show: Show) => {};
}
