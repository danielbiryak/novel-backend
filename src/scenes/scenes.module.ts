import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesModule } from 'src/images/images.module';
import { ScenesController } from './scenes.controller';
import { Scene } from './scenes.model';
import { ScenesService } from './scenes.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Scene]),
    forwardRef(() => ImagesModule),
  ],
  controllers: [ScenesController],
  providers: [ScenesService],
})
export class ScenesModule {}
