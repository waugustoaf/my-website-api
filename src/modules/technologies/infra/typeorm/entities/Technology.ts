import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('technologies')
export class Technology {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  start_date: Date;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
