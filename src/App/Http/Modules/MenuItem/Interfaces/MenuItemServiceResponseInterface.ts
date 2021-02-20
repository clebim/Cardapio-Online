import MenuSection from '../../../../Typeorm/Entities/MenuSection';
import MenuItem from '../../../../Typeorm/Entities/MenuItem';

export default interface MenuItemServiceResponseInterface {
  success: boolean;
  message: string;
  item?: MenuItem | null;
  items?: MenuSection[] | null;
}
