import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SchedulesTracksEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
}
