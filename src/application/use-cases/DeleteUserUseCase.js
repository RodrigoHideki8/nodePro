class DeleteUserUseCase {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async deleteUser(id) {
      return await this.userRepository.delete(id);
    }
  }
  
  module.exports = DeleteUserUseCase;