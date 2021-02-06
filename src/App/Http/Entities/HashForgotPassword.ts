import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('hash_forgot_password')
export default class HashForgotPassword {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('char')
  hash: string;

  @Column('bigint')
  user_id: number;

  @Column('timestamp')
  expires_at: Date;

  @Column('boolean')
  revoged: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @OneToOne(() => User, user => user.hash)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
