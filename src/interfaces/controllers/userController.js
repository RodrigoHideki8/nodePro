const CreateUserUseCase = require("../../application/use-cases/CreateUserUseCase");
const GetUserUseCase = require("../../application/use-cases/GetUserUseCase");
const DeleteUserUseCase = require("../../application/use-cases/deleteUserUseCase");
const GetAllUserUseCase = require("../../application/use-cases/getAllUserUseCase");
const UpdateUserUseCase = require("../../application/use-cases/updateUserUseCase");
const User = require("../../domain/models/UserModel");
const ConcreteUserRepository = require("../../domain/repository/ConcreteUserRepository");
class UserController {
  constructor() {
    this.createUserUseCase = new CreateUserUseCase(
      new ConcreteUserRepository()
    );
    this.deleteUserUseCase = new DeleteUserUseCase(
      new ConcreteUserRepository()
    );
    this.updateUserUseCase = new UpdateUserUseCase(
      new ConcreteUserRepository()
    );
    this.getUserUseCase = new GetUserUseCase(new ConcreteUserRepository());
    this.getAllUserUseCase = new GetAllUserUseCase(
      new ConcreteUserRepository()
    );

    this.getById = this.getById.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getById(request, response) {
    try {
      if (!request.params?.id) {
        return response.status(400).send("Id não encontrado");
      }
      const userId = request.params.id;

      const user = await this.getUserUseCase.getUserForId(userId);

      return response.status(200).send(user);
    } catch (error) {
      return response.status(400).send("Não foi possível encontrar o usuário");
    }
  }

  async getAllUsers(request, response) {
    try {
      const users = await this.getAllUserUseCase.getAllUser();
      return response.status(200).send(users);
    } catch (error) {
      return response
        .status(400)
        .send("Não foi possível encontrar os usuários");
    }
  }

  async createUser(request, response) {
    try {
      if (!request.body) {
        return response.status(400).send("Body não encontrado");
      }
      const { id, username, email } = request.body;
      const newUser = new User(id, username, email);

      const users = await this.createUserUseCase.createUser(newUser);
      return response.status(200).send(users);
    } catch (error) {
      return response.status(400).send("Não foi possível criar o usuário");
    }
  }

  async updateUser(request, response) {
    try {
      if (!request.body || !request.params?.id) {
        return response.status(400).send("Body não encontrado");
      }
      const { username, email } = request.body;
      const id = request.params.id;
      const newUser = {
        username,
        email,
      };
      await this.updateUserUseCase.updateUser(id, newUser);
      return response.status(200).send("Usuário atualizado com sucesso");
    } catch (error) {
      return response.status(400).send("Não foi possível atualizar o usuário");
    }
  }

  async deleteUser(request, response) {
    try {
      if (!request.params?.id) {
        return response.status(400).send("Id não encontrado");
      }
      const userId = request.params.id;
      await this.deleteUserUseCase.deleteUser(userId);
      return response.status(200).send("Usuário deletado com sucesso");
    } catch (error) {
      return response.status(400).send("Não foi possível deletar o usuário");
    }
  }
}

module.exports = UserController;
