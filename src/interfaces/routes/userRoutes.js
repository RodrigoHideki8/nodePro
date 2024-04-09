const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const AuthenticationService = require("../middlewares/auth.middleware");
const authService = new AuthenticationService('sua_chave_secreta');
const userController = new UserController()
router.use("/", authService.authenticateUser.bind(authService));

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;