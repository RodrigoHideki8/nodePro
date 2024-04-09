const DeleteUserUseCase = require("../src/application/use-cases/deleteUserUseCase");
const UserController = require("../src/interfaces/controllers/userController");

jest.mock("../src/domain/repository/ConcreteUserRepository", () => {
  return jest.fn().mockImplementation(() => {
    return {
      delete: jest.fn().mockResolvedValue({
        id: "123",
      }),
    };
  });
});

const mockRequest = (params) => ({ params });
const mockResponse = () => {
  const res = {
    status: 200,
    send:"Usuário deletado com sucesso"
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
      delete: jest.fn(),
    };

    const mockDeleteUserUseCase = new DeleteUserUseCase(mockUserRepository);

    userController = new UserController(
        mockDeleteUserUseCase,
    );
  });

  describe("delete", () => {
    test("deve retornar sucesso", async () => {
      const req = mockRequest({ id: "123" });
      const res = mockResponse();

      mockUserRepository.delete.mockResolvedValueOnce({
        id: "123",
      });

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("Usuário deletado com sucesso");
    });

    test("deve retornar status 400 se o ID não for fornecido", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Id não encontrado");
    });
  });
});
