class UpdateUserUseCase {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async updateUser(id, userData) {
      return await this.userRepository.update(id, userData);
    }
  }
  
  module.exports = UpdateUserUseCase;