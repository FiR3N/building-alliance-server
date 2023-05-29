import VacancyModel from '../models/VacancyModel.js';

class VacancyService {
  async addVacancy(name: string, wage: number, experience: string, occupation: string, description: string) {
    const vacancy = await VacancyModel.create({
      name: name,
      wage,
      experience: experience,
      occupation: occupation,
      description: description,
    });

    return vacancy;
  }

  async putVacancy(
    vacancyId: number,
    name: string,
    wage: number,
    experience: string,
    occupation: string,
    description: string,
  ) {
    await VacancyModel.update(
      {
        name,
        wage,
        experience,
        occupation,
        description,
      },
      { where: { $id$: vacancyId } },
    );

    const updatedVacancy = await VacancyModel.findOne({
      where: { id: vacancyId },
    });

    return updatedVacancy;
  }

  async deleteVacancy(vacancyId: number) {
    const vacancy = await VacancyModel.findOne({ where: { $id$: vacancyId } });
    await VacancyModel.destroy({ where: { $id$: vacancyId } });

    return vacancy;
  }
  async getVacancies(limit: number, page: number) {
    let offset = page * limit - limit;
    const vacancies = await VacancyModel.findAndCountAll({ order: [['id', 'DESC']], limit, offset, distinct: true });

    return vacancies;
  }
}

export default new VacancyService();
