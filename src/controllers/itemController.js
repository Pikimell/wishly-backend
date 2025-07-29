import { response } from '../helpers/response.js';
import * as itemService from '../services/itemService.js';

/**
 * Створює новий елемент у колекції
 * @param {Object} event - об'єкт події з даними запиту
 * @returns {Promise<Object>}
 */
export const createItem = async event => {
  const { id: collectionId } = event.pathParameters;
  const data = event.body;
  const newItem = await itemService.createItem(collectionId, data);
  return response(201)(newItem);
};

/**
 * Отримує елемент за його ID
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const getItemById = async event => {
  const { id } = event.pathParameters;
  const item = await itemService.getItemById(id);
  return response(200)(item);
};

/**
 * Оновлює елемент
 * @param {Object} event - об'єкт події з даними запиту
 * @returns {Promise<Object>}
 */
export const updateItem = async event => {
  const { id } = event.pathParameters;
  const data = event.body;
  const updatedItem = await itemService.updateItem(id, data);
  return response(200)(updatedItem);
};

/**
 * Видаляє елемент
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const deleteItem = async event => {
  const { id } = event.pathParameters;
  const result = await itemService.deleteItem(id);
  return response(200)({ success: result });
};

/**
 * Отримує всі елементи з фільтрами, пагінацією та сортуванням
 * @param {Object} event - об'єкт події з query параметрами
 * @returns {Promise<Object>}
 */
export const getAllItems = async event => {
  const { id: collectionId } = event.pathParameters;
  const {
    filters = {},
    page = 1,
    perPage = 10,
    sortField = 'createdAt',
    sortOrder = -1,
  } = event.queryStringParameters || {};

  const pagination = { page: Number(page), perPage: Number(perPage) };
  const sort = { [sortField]: Number(sortOrder) };

  const result = await itemService.getAllItems(collectionId, {
    filters,
    pagination,
    sort,
  });
  return response(200)(result);
};

/**
 * Позначає елемент як виконаний
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const markItemCompleted = async event => {
  const { id } = event.pathParameters;
  const updatedItem = await itemService.markItemCompleted(id);
  return response(200)(updatedItem);
};

/**
 * Позначає елемент як невиконаний
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const markItemUncompleted = async event => {
  const { id } = event.pathParameters;
  const updatedItem = await itemService.markItemUncompleted(id);
  return response(200)(updatedItem);
};

/**
 * Перемикає статус виконання елемента
 * @param {Object} event - об'єкт події з параметрами запиту
 * @returns {Promise<Object>}
 */
export const toggleItemStatus = async event => {
  const { id } = event.pathParameters;
  const updatedItem = await itemService.toggleItemStatus(id);
  return response(200)(updatedItem);
};
