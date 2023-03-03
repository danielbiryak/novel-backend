import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Scene } from 'src/scenes/scenes.model';
import { ImageCreationAttrs } from './images.model';
import { Image } from './images.model';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private readonly imageRepository: typeof Image,
  ) {}

  async createImage(imagePath: string, sceneId: number) {
    const data: ImageCreationAttrs = {
      path: imagePath,
      sceneId,
    };
    const image = await this.imageRepository.create(data);

    return image;
  }

  async getImagesByIds(sceneIds: number[]) {
    const images = await this.imageRepository.findAll({
      where: { sceneId: sceneIds },
    });

    return images;
  }
}
