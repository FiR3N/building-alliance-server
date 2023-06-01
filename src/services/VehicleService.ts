import VehicleModel from '../models/VehicleModel.js';

class VehicleService {
  async addVehicle(name: string, priceWithVAT: number, priceWithoutVAT: number) {
    const vehicle = await VehicleModel.create({
      name: name,
      priceWithVAT: priceWithVAT,
      priceWithoutVAT: priceWithoutVAT,
    });

    return vehicle;
  }

  async putVehicle(vehicleId: number, name: string, priceWithVAT: number, priceWithoutVAT: number) {
    await VehicleModel.update(
      {
        name: name,
        priceWithVAT: priceWithVAT,
        priceWithoutVAT: priceWithoutVAT,
      },
      { where: { $id$: vehicleId } },
    );

    const updatedVehicle = await VehicleModel.findOne({
      where: { id: vehicleId },
    });

    return updatedVehicle;
  }

  async deleteVehicle(vehicleId: number) {
    const vehicle = await VehicleModel.findOne({ where: { $id$: vehicleId } });
    await VehicleModel.destroy({ where: { $id$: vehicleId } });

    return vehicle;
  }
  async getVehicles() {
    const vehicles = await VehicleModel.findAll({ order: [['name', 'ASC']] });

    return vehicles;
  }
}

export default new VehicleService();
