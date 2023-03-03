import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Image } from 'src/images/images.model';

export interface SceneCreationAttrs {
  chapterId: number;
  scenePosition: number;
  imageId: number;
  text: string;
}

@Table({ tableName: 'scenes' })
export class Scene extends Model<Scene, SceneCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  chapterId: number;
  
  @Column({
    type: DataType.INTEGER,
  })
  scenePosition: number;

  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @HasMany(() => Image)
  images: Image[];

  // @BelongsToMany(() => Image, () => SceneImage)
  // images: Image[];
}
