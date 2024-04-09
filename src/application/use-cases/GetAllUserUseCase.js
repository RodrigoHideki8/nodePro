class GetAllUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUser() {
    return await this.userRepository.findAll();
  }
}

module.exports = GetAllUserUseCase;
