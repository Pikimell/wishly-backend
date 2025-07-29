/**
 * Collection handlers
 */
import { response } from '../helpers/response.js';
import * as collectionService from '../services/collectionService.js';

/**
 * Створює нову колекцію
 * @param {Object} event - об'єкт події з даними запиту
 * @returns {Promise<Object>}
 */
export const createCollection = async event => {
  const { body } = event;
  const newCollection = await collectionService.createCollection(body);
  return response(201)(newCollection);
};

/**
 * Отримує колекцію за її ID
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const getCollectionById = async event => {
  const { id } = event.pathParameters;
  const collection = await collectionService.getCollectionById(id);
  return response(200)(collection);
};

/**
 * Оновлює колекцію
 * @param {Object} event - об'єкт події з даними запиту
 * @returns {Promise<Object>}
 */
export const updateCollection = async event => {
  const { id } = event.pathParameters;
  const data = event.body;
  const updatedCollection = await collectionService.updateCollection(id, data);
  return response(200)(updatedCollection);
};

/**
 * Видаляє колекцію
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const deleteCollection = async event => {
  const { id } = event.pathParameters;
  const result = await collectionService.deleteCollection(id);
  return response(200)({ success: result });
};

/**
 * Отримує всі колекції з підтримкою фільтрів, пагінації та сортування
 * @param {Object} event - об'єкт події з query параметрами
 * @returns {Promise<Object>}
 */
export const getAllCollections = async event => {
  const {
    page = 1,
    perPage = 10,
    sortField = 'createdAt',
    sortOrder = -1,
    ...filters
  } = event.queryStringParameters || {};

  const pagination = { page: Number(page), perPage: Number(perPage) };
  const sort = { [sortField]: Number(sortOrder) };

  const result = await collectionService.getAllCollections({
    filters,
    pagination,
    sort,
  });
  return response(200)(result);
};

/**
 * Додає користувача до списку перегляду колекції
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const addViewUser = async event => {
  const { id } = event.pathParameters;
  const { userId } = event.body;
  const updatedCollection = await collectionService.addViewUser(id, userId);
  return response(200)(updatedCollection);
};

/**
 * Додає користувача до списку редагування колекції
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const addEditUser = async event => {
  const { id } = event.pathParameters;
  const { userId } = event.body;
  const updatedCollection = await collectionService.addEditUser(id, userId);
  return response(200)(updatedCollection);
};

/**
 * Видаляє користувача з перегляду колекції
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const removeViewUser = async event => {
  const { id } = event.pathParameters;
  const { userId } = event.body;
  const updatedCollection = await collectionService.removeViewUser(id, userId);
  return response(200)(updatedCollection);
};

/**
 * Видаляє користувача з редагування колекції
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const removeEditUser = async event => {
  const { id } = event.pathParameters;
  const { userId } = event.body;
  const updatedCollection = await collectionService.removeEditUser(id, userId);
  return response(200)(updatedCollection);
};

/**
 * Клонує публічну колекцію
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const cloneCollection = async event => {
  const { id } = event.pathParameters;
  const { userId } = event.body;
  const cloned = await collectionService.cloneCollection(id, userId);
  return response(201)(cloned);
};
