import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import User from './User';
import MenuItem from './MenuItem';

@Entity('menu_sections')
export default class MenuSection {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('bigint')
  user_id: number;

  @Column('varchar')
  section_name: string;

  @Column('boolean')
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => User, user => user.section)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => MenuItem, item => item.section)
  items: MenuItem[];
}
