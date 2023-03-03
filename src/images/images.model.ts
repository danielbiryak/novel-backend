import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Scene } from 'src/scenes/scenes.model';

export interface ImageCreationAttrs {
  path: string;
  sceneId: number;
}

@Table({ tableName: 'images' })
export class Image extends Model<Image, ImageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
  })
  path: string;

  @ForeignKey(() => Scene)
  sceneId: number;

  @BelongsTo(() => Scene)
  scene: Scene;

  // @BelongsToMany(() => Scene, () => SceneImage)
  // scenes: Scene[];
}
