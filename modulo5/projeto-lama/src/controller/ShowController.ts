import { Request, Response } from 'express';
import { ShowBusiness } from '../business/ShowBusiness';
import { BaseError } from '../errors/BaseError';
import {
  IBuyTicketInputDTO,
  IGetShowsInputDTO,
  IShowInputDTO,
} from '../models/Show';

export class ShowController {
  constructor(private showBusiness: ShowBusiness) {}

  public createShow = async (req: Request, res: Response) => {
    try {
      const input: IShowInputDTO = {
        token: req.headers.authorization,
        band: req.body.band,
        startsAt: new Date(req.body.startsAt),
      };

      const response = await this.showBusiness.createShow(input);

      res.status(200).send(response);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      res
        .status(500)
        .send({ message: 'Unexpected error occurred during create show' });
    }
  };

  public getShows = async (req: Request, res: Response) => {
    try {
      const input: IGetShowsInputDTO = {
        token: req.headers.authorization,
        search: req.body.search as string,
        order: req.body.order as string,
        sort: req.body.sort as string,
        limit: req.body.limit as string,
        page: req.body.page as string,
      };

      const response = await this.showBusiness.getShows(input);

      res.status(200).send(response);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      } else {
        return res.status(500).send({ message: 'Unexpected error occurred' });
      }
    }
  };

  public buyTicket = async (req: Request, res: Response) => {
    try {
      const input: IBuyTicketInputDTO = {
        token: req.headers.authorization,
        showId: req.params.id,
      };
      const response = await this.showBusiness.buyTicket(input);
      res.status(200).send(response);
    } catch (error) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      } else {
        return res
          .status(500)
          .send({ message: 'Unexpected error to buying ticket' });
      }
    }
  };
}
