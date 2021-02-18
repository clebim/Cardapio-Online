import { getConnection, Repository } from 'typeorm';
import MenuSection from '../../Entities/MenuSection';
import SectionMenuRepositoryInterface from './Interfaces/SectionMenuRepositoryInterface';
import connection from '../../../../Config/ConnectionDataBaseConfig';

export default class SectionMenuRepository
  implements SectionMenuRepositoryInterface {
  private ormRepository: Repository<MenuSection>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(MenuSection);
  }

  public async createSection(
    userId: number,
    sectionName: string,
  ): Promise<MenuSection> {
    const newSection = this.ormRepository.create({
      user_id: userId,
      section_name: sectionName,
    });

    await this.ormRepository.save(newSection);

    return newSection;
  }

  public async setIsActive(section: MenuSection): Promise<void> {
    await this.ormRepository.save(section);
  }

  public async getUserSections(userId: number): Promise<MenuSection[]> {
    const sections = await this.ormRepository.find({
      where: {
        user_id: userId,
      },
    });

    return sections;
  }

  public async getSectionById(
    sectionId: number,
  ): Promise<MenuSection | undefined> {
    const section = await this.ormRepository.findOne(sectionId);

    return section;
  }

  public async deleteSection(sectionId: number): Promise<void> {
    await this.ormRepository.delete(sectionId);
  }
}
