const UpdateUserUseCase = require("../src/application/use-cases/updateUserUseCase");
const UserController = require("../src/interfaces/controllers/userController");

jest.mock("../src/domain/repository/ConcreteUserRepository", () => {
  return jest.fn().mockImplementation(() => {
    return {
      update: jest.fn().mockResolvedValue(),
    };
  });
});

const mockRequest = (params, body) => ({ params, body });
const mockResponse = () => {
  const res = {
    status: 200,
    send:"Usuário atualizado com sucesso"
  };
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("UserController", () => {
  let userController;
  let mockUserRepository;
  beforeAll(() => {
    mockUserRepository = {
      update: jest.fn(),
    };

    const mockUpdateUserUseCase = new UpdateUserUseCase(mockUserRepository);

    userController = new UserController(
        mockUpdateUserUseCase,
    );
  });

  describe("update", () => {
    test("deve retornar sucesso", async () => {
      const req = mockRequest({ id: "123" },{   username: "test1",
      email: "test1@uol.com.br"});
      const res = mockResponse();

      mockUserRepository.update.mockResolvedValueOnce();

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("Usuário atualizado com sucesso");
    });

    test("deve retornar status 400 se o Body não for fornecido", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Body não encontrado");
    });
  });
});
