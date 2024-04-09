const GetUserUseCase = require("../src/application/use-cases/GetUserUseCase");
const UserController = require("../src/interfaces/controllers/userController");

jest.mock("../src/domain/repository/ConcreteUserRepository");
const mockRequest = (params, body) => ({ params, body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("UserController", () => {
  let userController;
  let mockUserRepository;
  beforeAll(() => {
    mockUserRepository = {
      findById: jest.fn(),
    };

    const mockGetUserUseCase = new GetUserUseCase(mockUserRepository);

    userController = new UserController(
      mockGetUserUseCase,
    );
  });

  describe("getById", () => {
    test("deve retornar o usuário correto", async () => {
      const req = mockRequest({ id: "123" });
      const res = mockResponse();

      mockUserRepository.findById.mockResolvedValueOnce({
        id: "123",
        username: "test",
      });

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ id: "123", username: "test" });
    });

    test("deve retornar status 400 se o ID não for fornecido", async () => {
      const req = mockRequest({ params: {} });
      const res = mockResponse();

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Id não encontrado");
    });
  });
});
