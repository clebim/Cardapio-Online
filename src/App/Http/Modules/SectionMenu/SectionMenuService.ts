import { injectable, inject } from 'tsyringe';
import SectionResponseInterface from './Interfaces/SectionResponseInterface';
import SectionDataInterface from './Interfaces/SectionDataInterface';
import SectionMenuRepositoryInterface from '../../../Typeorm/Repositories/MenuSection/MenuSectionRepositoryInterface';
import MenuSection from '../../../Typeorm/Entities/MenuSection';

@injectable()
export default class SectionMenuService {
  constructor(
    @inject('MenuSectionRepository')
    private ormRepository: SectionMenuRepositoryInterface,
  ) {}

  public async executeCreateSection(
    userId: number,
    sectionName: string,
  ): Promise<SectionResponseInterface> {
    const newSection = await this.ormRepository.createSection(
      userId,
      sectionName,
    );

    return {
      success: true,
      message: 'Seção criada com sucesso',
      section: newSection,
    };
  }

  public async executeChangeActive(
    sectionId: number,
  ): Promise<SectionResponseInterface> {
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

  public async executeDeleteSection(
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
