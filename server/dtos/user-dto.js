module.exports = class UserDto {
  id;
  email;
  name;
  isActivated;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.name = model.name;
    this.isActivated = model.isActivated;
  }
};
