import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  AfterLoad,
} from 'typeorm';
import MenuItem from './MenuItem';

@Entity('item_photos')
export default class ItemPhoto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  real_name: string;

  @Column('varchar')
  path: string;

  @Column('bigint')
  menu_item_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @OneToOne(() => MenuItem, item => item.photo)
  @JoinColumn({ name: 'menu_item_id' })
  item: MenuItem;

  @AfterLoad()
  setUrl(): void {
    this.path = `${process.env.APP_URL}/files/item/${this.path}`;
  }
}
