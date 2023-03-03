import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Get, Param, Req } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { ScenesService } from './scenes.service';

@Controller('scenes')
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: __dirname + '/../../images',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}.${file.mimetype.split('/')[1]}`);
        },
      }),
    }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('chapter', ParseIntPipe) chapter: number,
    @Body('scene_pos', ParseIntPipe) scenePosition: number,
    @Body('text') text: string,
  ) {
    return this.scenesService.createScene(file, chapter, scenePosition, text);
  }

  @Get('/:id')
  getImagesById(@Param('id', ParseIntPipe) id: number) {
    return this.scenesService.getSceneByChapter(id);
  }
}
