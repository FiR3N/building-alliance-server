import MixtureTypesModel from '../models/MixtureTypesModel.js';

class MixtureTypesService {
  async addMixtureType(name: string) {
    const mixtureType = await MixtureTypesModel.create({
      name: name,
    });

    return mixtureType;
  }

  async putMixtureType(mixtureTypeId: number, name: string) {
    await MixtureTypesModel.update(
      {
        name: name,
      },
      { where: { $id$: mixtureTypeId } },
    );

    const updatedMixtureType = await MixtureTypesModel.findOne({
      where: { id: mixtureTypeId },
    });

    return updatedMixtureType;
  }

  async deleteMixtureType(mixtureTypeId: number) {
    const mixtureType = await MixtureTypesModel.findOne({ where: { $id$: mixtureTypeId } });
    await MixtureTypesModel.destroy({ where: { $id$: mixtureTypeId } });

    return mixtureType;
  }
  async getMixtureTypes() {
    const mixtureTypes = await MixtureTypesModel.findAll({ order: [['id', 'ASC']] });

    return mixtureTypes;
  }
}

export default new MixtureTypesService();
