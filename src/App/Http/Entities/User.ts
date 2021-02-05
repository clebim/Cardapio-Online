import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from 'typeorm';

import bcrypt from 'bcryptjs';
import RefreshToken from './RefreshToken';
import HashForgotPassword from './HashForgotPassword';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  restaurant_name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  neighborhood: string;

  @Column('varchar')
  street: string;

  @Column('varchar')
  number: string;

  @Column('varchar')
  zip_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @OneToOne(() => RefreshToken, refresh_token => refresh_token.user)
  refresh_token: RefreshToken;

  @OneToOne(() => HashForgotPassword, hash => hash.user)
  hash: HashForgotPassword;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12);
    }
  }
}
