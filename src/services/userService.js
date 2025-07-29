import User from '../db/models/user.js';

/**
 * Створює нового користувача
 * @param {Object} data - дані користувача
 * @returns {Promise<User>}
 */
export const registerUser = async data => {
  try {
    const newUser = new User(data);
    return await newUser.save();
  } catch (error) {
    throw new Error(`Помилка при створенні користувача: ${error.message}`);
  }
};

/**
 * Авторизація через AppleID
 * Якщо користувача з цим email не існує — створюється новий запис
 * @param {Object} appleData - дані з AppleID { email, nickname, avatar }
 * @returns {Promise<User>}
 */
export const loginWithApple = async appleData => {
  try {
    let user = await User.findOne({ email: appleData.email });
    if (!user) {
      user = new User({
        nickname: appleData.nickname || 'User',
        email: appleData.email,
        avatar: appleData.avatar || '',
      });
      await user.save();
    }
    return user;
  } catch (error) {
    throw new Error(`Помилка авторизації через AppleID: ${error.message}`);
  }
};

/**
 * Отримує користувача за ID
 * @param {string} userId
 * @returns {Promise<User>}
 */
export const getUserById = async userId => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error(`Помилка при отриманні користувача: ${error.message}`);
  }
};

/**
 * Оновлює дані користувача
 * @param {string} userId
 * @param {Object} data - дані для оновлення
 * @returns {Promise<User>}
 */
export const updateUserProfile = async (userId, data) => {
  try {
    return await User.findByIdAndUpdate(userId, data, { new: true });
  } catch (error) {
    throw new Error(`Помилка при оновленні користувача: ${error.message}`);
  }
};

/**
 * Видаляє користувача
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
export const deleteUser = async userId => {
  try {
    const result = await User.findByIdAndDelete(userId);
    return !!result;
  } catch (error) {
    throw new Error(`Помилка при видаленні користувача: ${error.message}`);
  }
};
