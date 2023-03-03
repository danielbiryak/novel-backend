export default class SceneCreationDto {
  chapterId: number;
  scenePosition: number | number[];
  image: Express.Multer.File | Express.Multer.File[];
  text: string;
}
