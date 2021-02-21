import { inject, injectable } from 'tsyringe';
import MenuSectionRepositoryInterface from '../../../../Typeorm/Repositories/MenuSection/MenuSectionRepositoryInterface';
import MenuItemServiceResponseInterface from '../Interfaces/MenuItemServiceResponseInterface';

@injectable()
export default class GetAllItemsSercice {
  constructor(
    @inject('MenuSectionRepository')
    private menuSectionRepository: MenuSectionRepositoryInterface,
  ) {}

  public async execute(
    userId: number,
    isActive = true,
  ): Promise<MenuItemServiceResponseInterface> {
    if (userId === null) {
      return {
        success: false,
        message: 'Id do usuáio não enviado',
        items: null,
      };
    }

    const userItems = await this.menuSectionRepository.getUserItems(
      userId,
      isActive,
    );

    return {
      success: true,
      message: 'Busca realizada com sucesso',
      items: userItems,
    };
  }
}
