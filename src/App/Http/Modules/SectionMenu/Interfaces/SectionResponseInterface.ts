import MenuSection from '../../../Entities/MenuSection';

export default interface SectionResponseInterface {
  success: boolean;
  message: string;
  section: MenuSection | null;
}
