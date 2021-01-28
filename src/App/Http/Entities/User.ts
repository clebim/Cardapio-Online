import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import bcrypt from 'bcryptjs';

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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12);
    }
  }
}
