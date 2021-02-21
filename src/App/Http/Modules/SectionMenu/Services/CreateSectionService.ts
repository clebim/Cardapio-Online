import { injectable, inject } from 'tsyringe';
import SectionResponseInterface from '../Interfaces/SectionResponseInterface';
import SectionMenuRepositoryInterface from '../../../../Typeorm/Repositories/MenuSection/MenuSectionRepositoryInterface';

@injectable()
export default class CreateSectionMenuService {
  constructor(
    @inject('MenuSectionRepository')
    private ormRepository: SectionMenuRepositoryInterface,
  ) {}

  public async execute(
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
}
