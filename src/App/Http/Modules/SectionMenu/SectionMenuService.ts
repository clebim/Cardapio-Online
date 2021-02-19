import { injectable, inject } from 'tsyringe';
import SectionResponseInterface from './Interfaces/SectionResponseInterface';
import SectionDataInterface from './Interfaces/SectionDataInterface';
import SectionMenuRepositoryInterface from '../../../Typeorm/Repositories/SectionMenu/SectionMenuRepositoryInterface';

@injectable()
export default class SectionMenuService {
  constructor(
    @inject('SectionMenuRepository')
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
    data: SectionDataInterface,
  ): Promise<SectionResponseInterface> {
    const section = await this.ormRepository.getSectionById(data.id);

    if (!section) {
      return {
        success: false,
        message: 'Seção não encontrada',
        section: null,
      };
    }

    if (section.user_id != data.userId) {
      return {
        success: false,
        message: 'Seção não pertence ao usuário',
        section: null,
      };
    }

    section.is_active = data.isActive as boolean;

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
    const section = await this.ormRepository.getSectionById(data.id);

    if (!section) {
      return {
        success: false,
        message: 'Seção não encontrada',
        section: null,
      };
    }

    if (section.user_id != data.userId) {
      return {
        success: false,
        message: 'Seção não pertence ao usuário',
        section: null,
      };
    }

    await this.ormRepository.deleteSection(section.id);

    return {
      success: true,
      message: 'Seção e seus items deletados com sucesso',
      section: null,
    };
  }
}
