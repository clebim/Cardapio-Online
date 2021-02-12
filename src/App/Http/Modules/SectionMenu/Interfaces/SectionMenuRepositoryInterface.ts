import MenuSection from 'App/Http/Entities/MenuSection';

export default interface SectionMenuRepositoryInterface {
  createSection(userId: number, sectionName: string): Promise<MenuSection>;
  setActive(sectionId: number): Promise<boolean>;
  setNotActive(sectionId: number): Promise<boolean>;
  getUserSections(userId: number): Promise<MenuSection[]>;
}
