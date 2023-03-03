import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Scene, SceneCreationAttrs } from './scenes.model';
import { mkdir, rename, stat } from 'fs/promises';
import { ImagesService } from 'src/images/images.service';
import { join } from 'path';

@Injectable()
export class ScenesService {
  constructor(
    @InjectModel(Scene) private readonly sceneRepository: typeof Scene,
    private readonly imageService: ImagesService,
  ) {}

  async createScene(
    file: Express.Multer.File,
    chapter: number,
    scenePosition: number,
    text: string,
  ) {
    const { filename } = file;
    const fullFilePath: string = `${__dirname}/../../images/${filename}`;
    const newPath: string = `${__dirname}/../../images/chapter_${chapter}/${filename}`;
    const imageDirectory: string = `${__dirname}/../../images`;

    try {
      await stat(`${imageDirectory}/chapter_${chapter}`);
    } catch (err) {
      await mkdir(`${imageDirectory}/chapter_${chapter}`);
    } finally {
      await rename(fullFilePath, newPath);
    }

    const data: SceneCreationAttrs = {
      chapterId: chapter,
      scenePosition,
      imageId: 0,
      text,
    };
    const scene = await this.sceneRepository.create(data);

    const imageUrl = `/chapter_${chapter}/${filename}`;
    const image = await this.imageService.createImage(imageUrl, scene.id);

    return { data: { image, scene } };
  }

  async getSceneByChapter(chapter: number) {
    const scenes = await this.sceneRepository.findAll({
      where: { chapterId: chapter },
      attributes: ['id', 'scenePosition', 'text'],
    });

    const sceneIds: number[] = scenes.map((item) => item.id);

    const images = await this.imageService.getImagesByIds(sceneIds);

    return { scenes, images };
  }
}
