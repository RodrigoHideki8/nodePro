const UserModel = require("../../infrastructure/databases/sequelize/users");
const UserRepository = require("./UserRepository");

class ConcreteUserRepository extends UserRepository {
  async findById(id) {
    return await UserModel.findOne({
      where: { id: id },
    });
  }

  async findAll() {
    return await UserModel.findAll();
  }

  async findByUsername(username) {
    return await this.findOne({
      where: {
        username: username,
      },
    });
  }

  async findByEmail(email) {
    return await this.findOne({
      where: {
        email: email,
      },
    });
  }

  async save(user) {
    return await this.create(user);
  }

  async update(id, bodyUser) {
    await this.update(bodyUser, {
      where: {
        id: id,
      },
    });
  }

  async delete(id) {
    await this.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = ConcreteUserRepository;
