class UserRepository {
  constructor() {
    if (this.constructor === UserRepository) {
      throw new Error("Cannot instantiate abstract class");
    }
  }

  async findById(id) {
    return await this.findById(id);
  }

  async findAll() {
    return await this.findAll();
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

module.exports = UserRepository;
