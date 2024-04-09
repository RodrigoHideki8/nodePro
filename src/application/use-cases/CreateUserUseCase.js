class CreateUserUseCase {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async createUser(userData) {
      return await this.userRepository.save(userData);
    }
  }
  
  module.exports = CreateUserUseCase;