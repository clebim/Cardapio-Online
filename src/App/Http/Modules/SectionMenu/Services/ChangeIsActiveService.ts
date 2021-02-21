import { injectable, inject } from 'tsyringe';
import SectionResponseInterface from '../Interfaces/SectionResponseInterface';
import SectionMenuRepositoryInterface from '../../../../Typeorm/Repositories/MenuSection/MenuSectionRepositoryInterface';
import MenuSection from '../../../../Typeorm/Entities/MenuSection';

@injectable()
export default class ChangeIsActiveService {
  constructor(
    @inject('MenuSectionRepository')
    private ormRepository: SectionMenuRepositoryInterface,
  ) {}

  public async execute(sectionId: number): Promise<SectionResponseInterface> {
    const section = (await this.ormRepository.getSectionById(
      sectionId,
    )) as MenuSection;

    section.is_active = !section.is_active;

    await this.ormRepository.setIsActive(section);

    return {
      success: true,
      message: 'isActive alterado com sucesso',
      section,
    };
  }
}
