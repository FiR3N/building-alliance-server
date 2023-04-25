import { ProjectModel, ProjectImagesModel, ProjectInfosModel } from '../models/models.js';
import { PROJECTS_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class ProjectService {
  async addProject(name: string, img: UploadedFile, date: string, info: string, images: UploadedFile[]) {
    let imgPathname: string;
    if (img) {
      imgPathname = v4() + '.jpg';
      await img.mv(path.resolve(__dirname, 'static', 'projects', imgPathname));
    } else {
      imgPathname = PROJECTS_PLUG_IMG;
    }
    const newDate = new Date(Date.parse(date));

    const project = await ProjectModel.create({
      name,
      image: imgPathname,
      date: newDate,
    });
    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          return ProjectInfosModel.create({
            description: item.description,
            projectId: project.id,
          });
        }),
      );
    }
    if (images) {
      const promises = images.map(async (image: UploadedFile) => {
        let imageName = v4() + '.jpg';
        await image.mv(path.resolve(__dirname, 'static', 'projects', imageName));
        await ProjectImagesModel.create({ image: imageName, projectId: project.id });
      });
      await Promise.all(promises);
    }

    const projectWithInfosAndImages = await ProjectModel.findOne({
      where: { id: project.id },
      include: [
        { model: ProjectInfosModel, as: 'infos', order: [['id', 'ASC']] },
        { model: ProjectImagesModel, as: 'images', order: [['id', 'ASC']] },
      ],
    });
    return projectWithInfosAndImages;
  }
  async putService(
    projectId: number,
    name: string,
    img: UploadedFile,
    date: string,
    info: string,
    next: NextFunction,
    images?: UploadedFile[],
  ) {
    let imgPathname: string;
    if (img) {
      imgPathname = v4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static', 'projects', imgPathname));
    } else {
      imgPathname = PROJECTS_PLUG_IMG;
    }

    const newDate = new Date(Date.parse(date));
    await ProjectModel.update(
      {
        name,
        image: imgPathname,
        date: newDate,
      },
      { where: { $id$: projectId } },
    );

    const infos = await ProjectInfosModel.findAll({ where: { $projectId$: projectId } });
    const infosId = infos.map((item) => item.id);

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          if (infosId.includes(parseInt(item.id))) {
            return ProjectInfosModel.update({ description: item.description }, { where: { id: item.id } });
          } else {
            return ProjectInfosModel.create({
              description: item.description,
              projectId: projectId,
            });
          }
        }),
      );
    }

    if (images) {
      console.log('cringe rabotaet');
      const imageList = await ProjectImagesModel.findAll({ where: { $projectId$: projectId } });
      imageList.map((projectImage) => {
        if (projectImage.image != PROJECTS_PLUG_IMG) {
          fs.unlink(path.resolve(__dirname, 'static', 'projects', projectImage?.image!), (err: any) => {
            if (err) next(err);
            console.log(`projects/${projectImage?.image}.jpg was deleted`);
          });
        }
      });

      await ProjectImagesModel.destroy({ where: { $projectId$: projectId } });

      const promises = images.map(async (image: UploadedFile) => {
        let imageName = v4() + '.jpg';
        await image.mv(path.resolve(__dirname, 'static', 'projects', imageName));
        await ProjectImagesModel.create({ image: imageName, projectId: projectId });
      });
      await Promise.all(promises);
    }

    const projectWithInfosAndImages = await ProjectModel.findOne({
      where: { id: projectId },
      include: [
        { model: ProjectInfosModel, as: 'infos', order: [['id', 'ASC']] },
        { model: ProjectImagesModel, as: 'images', order: [['id', 'ASC']] },
      ],
    });
    return projectWithInfosAndImages;
  }
  async deleteProject(projectId: number, next: NextFunction) {
    const project = await ProjectModel.findOne({ where: { $id$: projectId } });
    const projectImages = await ProjectImagesModel.findAll({ where: { $projectId$: projectId } });

    if (project)
      if (project?.image != PROJECTS_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'projects', project?.image!), (err: any) => {
          if (err) next(err);
          console.log(`projects/${project?.image}.jpg was deleted`);
        });
      }

    if (projectImages) {
      projectImages.map((projectImage) => {
        if (projectImage.image != PROJECTS_PLUG_IMG) {
          fs.unlink(path.resolve(__dirname, 'static', 'projects', projectImage?.image!), (err: any) => {
            if (err) next(err);
            console.log(`projects/${projectImage?.image}.jpg was deleted`);
          });
        }
      });
    }
    await ProjectInfosModel.destroy({ where: { $projectId$: projectId } });
    await ProjectImagesModel.destroy({ where: { $projectId$: projectId } });
    await ProjectModel.destroy({ where: { $id$: projectId } });

    return project;
  }
}

export default new ProjectService();
