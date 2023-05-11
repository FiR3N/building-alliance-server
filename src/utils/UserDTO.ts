export class UserDto {
  id: number;
  login: string;
  surname: string;
  roleId: number;
  constructor(model: any) {
    this.id = model.id;
    this.login = model.login;
    this.surname = model.surname;
    this.roleId = model.roleId;
  }
}
