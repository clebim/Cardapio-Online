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

  const item_id = request.params.id;

  const sectionAndItem = await reposiroty
    .createQueryBuilder('menu_sections')
    .leftJoinAndSelect('menu_sections.items', 'item')
    .where('item.id = :id', { id: item_id })
    .select(['menu_sections.id', 'menu_sections.user_id', 'item.id'])
    .getOne();

  if (!sectionAndItem) {
    return response.status(400).json({
      success: false,
      message: 'Item não encontrado',
      item: null,
    });
  }

  if (request.userId != sectionAndItem.user_id) {
    return response.status(400).json({
      success: false,
      message: 'Este item não te pertence',
      item: null,
    });
  }

  return next();
}
