import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as userController from '../controllers/userController.js';

export const registerUserHandler = async (event, context) => {
  const ctrl = ctrlWrapper(userController.registerUser);
  return await ctrl(event, context);
};

export const loginWithAppleHandler = async (event, context) => {
  const ctrl = ctrlWrapper(userController.loginWithApple);
  return await ctrl(event, context);
};

export const getUserByIdHandler = async (event, context) => {
  const ctrl = ctrlWrapper(userController.getUserById);
  return await ctrl(event, context);
};

export const updateUserProfileHandler = async (event, context) => {
  const ctrl = ctrlWrapper(userController.updateUserProfile);
  return await ctrl(event, context);
};

export const deleteUserHandler = async (event, context) => {
  const ctrl = ctrlWrapper(userController.deleteUser);
  return await ctrl(event, context);
};
