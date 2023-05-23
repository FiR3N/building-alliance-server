import MixturesModel from '../models/MixturesModel.js';

class MixturesService {
  async addMixture(
    name: string,
    unitOfMeasurement: string,
    priceWithVAT: number,
    priceWithoutVAT: number,
    typeId: number,
  ) {
    const mixture = await MixturesModel.create({
      name: name,
      unitOfMeasurement: unitOfMeasurement,
      priceWithVAT: priceWithVAT,
      priceWithoutVAT: priceWithoutVAT,
      typeId: typeId,
    });

    return mixture;
  }

  async putMixture(
    mixtureId: number,
    name: string,
    unitOfMeasurement: string,
    priceWithVAT: number,
    priceWithoutVAT: number,
    typeId: number,
  ) {
    await MixturesModel.update(
      {
        name: name,
        unitOfMeasurement: unitOfMeasurement,
        priceWithVAT: priceWithVAT,
        priceWithoutVAT: priceWithoutVAT,
        typeId: typeId,
      },
      { where: { $id$: mixtureId } },
    );

    const updatedMixture = await MixturesModel.findOne({
      where: { id: mixtureId },
    });

    return updatedMixture;
  }

  async deleteMixture(mixtureId: number) {
    const mixture = await MixturesModel.findOne({ where: { $id$: mixtureId } });
    await MixturesModel.destroy({ where: { $id$: mixtureId } });

    return mixture;
  }
  async getMixtures() {
    const mixtures = await MixturesModel.findAll({ order: [['id', 'ASC']] });

    return mixtures;
  }
  async getMixturesByTypeId(typeId: number) {
    const mixtures = await MixturesModel.findAll({ where: { typeId: typeId }, order: [['id', 'ASC']] });

    return mixtures;
  }
}

export default new MixturesService();
