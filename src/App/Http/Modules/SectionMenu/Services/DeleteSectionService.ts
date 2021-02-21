import { injectable, inject } from 'tsyringe';
import SectionResponseInterface from '../Interfaces/SectionResponseInterface';
import SectionDataInterface from '../Interfaces/SectionDataInterface';
import SectionMenuRepositoryInterface from '../../../../Typeorm/Repositories/MenuSection/MenuSectionRepositoryInterface';
import MenuSection from '../../../../Typeorm/Entities/MenuSection';

@injectable()
export default class DeleteSectionMenuService {
  constructor(
    @inject('MenuSectionRepository')
    private ormRepository: SectionMenuRepositoryInterface,
  ) {}

  public async execute(
    data: SectionDataInterface,
  ): Promise<SectionResponseInterface> {
    const section = (await this.ormRepository.getSectionById(
      data.id,
    )) as MenuSection;

    await this.ormRepository.deleteSection(section.id);

    return {
      success: true,
      message: 'Seção e seus items deletados com sucesso',
      section: null,
    };
  }
}
