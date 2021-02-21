import MenuSection from '../../Entities/MenuSection';

export default interface MenuSectionRepositoryInterface {
  createSection(userId: number, sectionName: string): Promise<MenuSection>;
  setIsActive(section: MenuSection): Promise<void>;
  getUserSections(userId: number): Promise<MenuSection[]>;
  getAllUserItems(userId: number): Promise<MenuSection[]>;
  getUserItems(userId: number, isActive: boolean): Promise<MenuSection[]>;
  getSectionById(sectionId: number): Promise<MenuSection | undefined>;
  deleteSection(sectionId: number): Promise<void>;
}
