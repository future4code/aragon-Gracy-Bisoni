import { Request, Response } from 'express';
import { ShowBusiness } from '../business/ShowBusiness';
import { BaseError } from '../errors/BaseError';
import { IShowInputDTO } from '../models/Show';

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
}
