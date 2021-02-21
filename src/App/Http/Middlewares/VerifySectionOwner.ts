import { NextFunction, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import connection from '../../../Config/ConnectionDataBaseConfig';
import MenuSection from '../../Typeorm/Entities/MenuSection';

export default async function (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const reposiroty = getConnection(connection).getRepository(MenuSection);

  const section_id = request.params.id;

  const section = await reposiroty.findOne(section_id);

  if (!section) {
    return response.status(400).json({
      success: false,
      message: 'Seção não encontrado',
      section: null,
    });
  }

  if (request.userId != section.user_id) {
    return response.status(400).json({
      success: false,
      message: 'Esta seção não te pertence',
      section: null,
    });
  }

  return next();
}
