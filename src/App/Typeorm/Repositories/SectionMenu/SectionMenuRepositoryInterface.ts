import MenuSection from '../../Entities/MenuSection';

export default interface SectionMenuRepositoryInterface {
  createSection(userId: number, sectionName: string): Promise<MenuSection>;
  setIsActive(section: MenuSection): Promise<void>;
  getUserSections(userId: number): Promise<MenuSection[]>;
  getSectionById(sectionId: number): Promise<MenuSection | undefined>;
  deleteSection(sectionId: number): Promise<void>;
}
