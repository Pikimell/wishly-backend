import createHttpError from 'http-errors';
import Item from '../db/models/item.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

/**
 * Створює новий елемент для колекції
 * @param {string} collectionId - ID колекції
 * @param {Object} data - дані елемента
 * @returns {Promise<Item>}
 */
export const createItem = async (collectionId, data) => {
  try {
    const newItem = new Item({
      ...data,
      collectionId,
    });
    return await newItem.save();
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Отримує елемент за його ID
 * @param {string} itemId - ID елемента
 * @returns {Promise<Item|null>}
 */
export const getItemById = async itemId => {
  try {
    return await Item.findById(itemId);
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Оновлює елемент
 * @param {string} itemId - ID елемента
 * @param {Object} data - дані для оновлення
 * @returns {Promise<Item|null>}
 */
export const updateItem = async (itemId, data) => {
  try {
    return await Item.findByIdAndUpdate(itemId, data, { new: true });
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Видаляє елемент
 * @param {string} itemId - ID елемента
 * @returns {Promise<boolean>}
 */
export const deleteItem = async itemId => {
  try {
    const result = await Item.findByIdAndDelete(itemId);
    return !!result;
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Отримує всі елементи певної колекції з підтримкою фільтрів, пагінації та сортування
 * @param {string} collectionId - ID колекції
 * @param {Object} params - параметри запиту
 * @param {Object} params.filters - фільтри для пошуку
 * @param {Object} params.pagination - об'єкт пагінації { page, perPage }
 * @param {Object} params.sort - параметри сортування
 * @returns {Promise<Object>} - об'єкт з даними елементів та інформацією пагінації
 */
export const getAllItems = async (
  collectionId,
  {
    filters = {},
    pagination = { page: 1, perPage: 10 },
    sort = { createdAt: -1 },
  }
) => {
  const { page, perPage } = pagination;
  const offset = (page - 1) * perPage;

  const query = { collectionId };

  // Фільтрація
  if (filters.title) {
    query.title = { $regex: filters.title, $options: 'i' };
  }
  if (filters.isCompleted !== undefined) {
    query.isCompleted = filters.isCompleted;
  }
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    query.price = {};
    if (filters.priceMin !== undefined) {
      query.price.$gte = filters.priceMin;
    }
    if (filters.priceMax !== undefined) {
      query.price.$lte = filters.priceMax;
    }
  }

  try {
    const totalItems = await Item.countDocuments(query);
    const itemsList = await Item.find(query)
      .sort(sort)
      .skip(offset)
      .limit(perPage);

    const paginationInfo = calculatePaginationData(totalItems, page, perPage);

    return {
      ...paginationInfo,
      items: itemsList,
    };
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Позначає елемент як виконаний
 * @param {string} itemId - ID елемента
 * @returns {Promise<Item|null>}
 */
export const markItemCompleted = async itemId => {
  try {
    return await Item.findByIdAndUpdate(
      itemId,
      { isCompleted: true },
      { new: true }
    );
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Позначає елемент як невиконаний
 * @param {string} itemId - ID елемента
 * @returns {Promise<Item|null>}
 */
export const markItemUncompleted = async itemId => {
  try {
    return await Item.findByIdAndUpdate(
      itemId,
      { isCompleted: false },
      { new: true }
    );
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Перемикає статус виконання елемента
 * @param {string} itemId - ID елемента
 * @returns {Promise<Item|null>}
 */
export const toggleItemStatus = async itemId => {
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      throw createHttpError(404, 'Елемент не знайдено');
    }
    item.isCompleted = !item.isCompleted;
    return await item.save();
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};
