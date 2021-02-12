import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import User from './User';

@Entity('menu_sections')
export default class ProfilePhoto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  real_name: string;

  @Column('varchar')
  path: string;

  @Column('bigint')
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @OneToOne(() => User, user => user.photo)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
