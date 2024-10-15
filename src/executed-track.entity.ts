import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchedulesTracksEntity } from './scheduled-track.entity';

@Entity()
export class ExecutedTrackEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { nullable: true })
  scheduledTrackId: number;

  @Column('varchar')
  name: string;

  @ManyToOne(() => SchedulesTracksEntity, { lazy: true })
  @JoinColumn([{ name: 'scheduledTrackId', referencedColumnName: 'id' }])
  scheduledTrack: Promise<SchedulesTracksEntity>;
}
