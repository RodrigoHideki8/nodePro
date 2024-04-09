const CreateUserUseCase = require("../src/application/use-cases/CreateUserUseCase");
const UserController = require("../src/interfaces/controllers/userController");

jest.mock("../src/domain/repository/ConcreteUserRepository", () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        id: "123",
        username: "test",
        email: "test@uol.com.br",
      }),
    };
  });
});

const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {
    status: 200,
    send: {
      id: "123",
      username: "test",
      email: "test@uol.com.br",
    },
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
      save: jest.fn(),
    };

    const mockCreateUserUseCase = new CreateUserUseCase(mockUserRepository);

    userController = new UserController(mockCreateUserUseCase);
  });

  describe("create", () => {
    test("deve retornar o usuário criado", async () => {
      const req = mockRequest({
        username: "test",
        email: "test@uol.com.br",
      });
      const res = mockResponse();

      mockUserRepository.save.mockResolvedValueOnce({
        id: "123",
        username: "test",
        email: "test@uol.com.br",
      });

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            id: "123",
            username: "test",
            email: "test@uol.com.br",
          }));
    });

    test("deve retornar status 400 se o ID não for fornecido", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Body não encontrado");
    });
  });
});
