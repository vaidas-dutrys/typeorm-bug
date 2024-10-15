import { Controller, Get } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { ExecutedTrackEntity } from './executed-track.entity';
import { SchedulesTracksEntity } from './scheduled-track.entity';

@Controller()
export class AppController implements EntitySubscriberInterface {
  constructor(private dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  @Get()
  async bug() {
    const executedTrack = await this.dataSource.manager
      .getRepository(ExecutedTrackEntity)
      .findOne({ where: { id: 1 } });

    if (!executedTrack) {
      return 'No executed track found, first create one';
    }

    console.log(executedTrack.scheduledTrack); // returns a promise that will be handled, and this causes an error
    executedTrack.name = `test ${Math.random()}`;
    await this.dataSource.manager
      .getRepository(ExecutedTrackEntity)
      .save(executedTrack);

    return executedTrack;
  }

  @Get('create')
  async create() {
    const executedTrack = new ExecutedTrackEntity();
    executedTrack.id = 1;
    executedTrack.name = 'foobar';
    const scheduledTrack = new SchedulesTracksEntity();
    scheduledTrack.id = 1;
    await this.dataSource.manager
      .getRepository(SchedulesTracksEntity)
      .save(scheduledTrack);
    console.log(scheduledTrack);
    executedTrack.scheduledTrackId = scheduledTrack.id;
    await this.dataSource.manager
      .getRepository(ExecutedTrackEntity)
      .save(executedTrack);
    return executedTrack;
  }

  beforeUpdate(event: UpdateEvent<any>) {
    console.log(
      `Before update: ${event.updatedColumns.map((c) => c.propertyName).join(', ')}`,
    );
  }
}
