// import {
//   Column,
//   DataType,
//   ForeignKey,
//   Model,
//   Table,
// } from 'sequelize-typescript';
// import { Scene } from 'src/scenes/scenes.model';
// import { Image } from './images.model';

// @Table({ tableName: 'scene_images', updatedAt: false, createdAt: false })
// export class SceneImage extends Model<SceneImage> {
//   @Column({
//     type: DataType.INTEGER,
//     unique: true,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   id: number;

//   @ForeignKey(() => Image)
//   @Column({ type: DataType.INTEGER })
//   imageId: number;

//   @ForeignKey(() => Scene)
//   @Column({ type: DataType.INTEGER })
//   sceneId: number;
// }
