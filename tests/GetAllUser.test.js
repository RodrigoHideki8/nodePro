const GetAllUserUseCase = require("../src/application/use-cases/getAllUserUseCase");
const UserController = require("../src/interfaces/controllers/userController");

jest.mock("../src/domain/repository/ConcreteUserRepository", () => {
  return jest.fn().mockImplementation(() => {
    return {
      findAll: jest.fn().mockResolvedValue([
        {
          id: "123",
          username: "test",
        },
      ]),
    };
  });
});

const mockRequest = (params, body) => ({ params, body });
const mockResponse = () => {
  const res = {
    status: 200,
    send: [
      {
        id: "123",
        username: "test",
      },
    ],
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
      findAll: jest.fn(),
    };

    const mockGetAllUserUseCase = new GetAllUserUseCase(mockUserRepository);

    userController = new UserController(mockGetAllUserUseCase);
  });

  describe("getAll", () => {
    test("deve retornar o usuário correto", async () => {
      const req = mockRequest();
      const res = mockResponse();

      mockUserRepository.findAll.mockResolvedValueOnce([
        {
          id: "123",
          username: "test",
        },
      ]);

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([{ id: "123", username: "test" }]);
    });
  });
});
