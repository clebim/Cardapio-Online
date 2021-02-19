import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import User from './User';

@Entity('refresh_tokens')
export default class RefreshToken {
  @Column('bigint')
  user_id: number;

  @PrimaryColumn('varchar')
  token: string;

  @Column('timestamp')
  expires_at: Date;

  @OneToOne(() => User, user => user.refresh_token)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
