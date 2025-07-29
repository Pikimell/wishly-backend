import { response } from '../helpers/response.js';
import * as userService from '../services/userService.js';

/**
 * Створює нового користувача
 * @param {Object} event - об'єкт події з даними запиту
 * @returns {Promise<Object>}
 */
export const registerUser = async event => {
  const data = event.body;
  const newUser = await userService.registerUser(data);
  return response(201)(newUser);
};

/**
 * Авторизація через AppleID
 * @param {Object} event - об'єкт події з даними AppleID
 * @returns {Promise<Object>}
 */
export const loginWithApple = async event => {
  const appleData = event.body;
  const user = await userService.loginWithApple(appleData);
  return response(200)(user);
};

/**
 * Отримує користувача за ID
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const getUserById = async event => {
  const { id } = event.pathParameters;
  const user = await userService.getUserById(id);
  return response(200)(user);
};

/**
 * Оновлює профіль користувача
 * @param {Object} event - об'єкт події з даними запиту
 * @returns {Promise<Object>}
 */
export const updateUserProfile = async event => {
  const { id } = event.pathParameters;
  const data = event.body;
  const updatedUser = await userService.updateUserProfile(id, data);
  return response(200)(updatedUser);
};

/**
 * Видаляє користувача
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const deleteUser = async event => {
  const { id } = event.pathParameters;
  const result = await userService.deleteUser(id);
  return response(200)({ success: result });
};
