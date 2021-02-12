import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import ItemPhoto from './ItemPhoto';
import MenuSection from './MenuSection';

@Entity('menu_sections')
export default class MenuItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('bigint')
  menu_section_id: number;

  @Column('varchar')
  item_name: string;

  @Column('decimal')
  price: number;

  @Column('text')
  description: string;

  @Column('varchar')
  observation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => MenuSection, section => section.item)
  @JoinColumn({ name: 'menu_section_id' })
  section: MenuSection;

  @OneToOne(() => ItemPhoto, photo => photo.item)
  photo: ItemPhoto;
}
