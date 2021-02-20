export default interface ItemDataInterface {
  menu_section_id: number;
  item_name: string;
  price: number;
  description: string;
  observation?: string;
  sold_off?: boolean;
}
