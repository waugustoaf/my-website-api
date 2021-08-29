import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('projects')
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  external_link: string;

  @Column()
  github_link: string;

  @Column()
  image_link: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
