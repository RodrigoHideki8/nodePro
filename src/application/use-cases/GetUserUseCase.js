class GetUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserForId(id) {
    return await this.userRepository.findById(id);
  }
}

module.exports = GetUserUseCase
