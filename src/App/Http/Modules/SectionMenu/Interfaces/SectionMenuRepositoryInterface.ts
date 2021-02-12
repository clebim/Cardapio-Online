import MenuSection from 'App/Http/Entities/MenuSection';

export default interface SectionMenuRepositoryInterface {
  createSection(userId: number, sectionName: string): Promise<MenuSection>;
}
