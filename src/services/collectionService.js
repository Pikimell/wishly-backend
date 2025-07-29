import createHttpError from 'http-errors';
import Collection from '../db/models/collection.js';
import Item from '../db/models/item.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

/**
 * Створює нову колекцію
 * @param {Object} data - дані колекції
 * @param {string} ownerId - ID власника колекції
 * @returns {Promise<Collection>}
 */
export const createCollection = async (data, ownerId) => {
  try {
    const newCollection = new Collection({
      ...data,
      owner: ownerId,
    });
    return await newCollection.save();
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Отримує колекцію за її ID
 * @param {string} collectionId - ID колекції
 * @returns {Promise<Collection|null>}
 */
export const getCollectionById = async collectionId => {
  try {
    return await Collection.findById(collectionId);
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Оновлює дані колекції
 * @param {string} collectionId - ID колекції
 * @param {Object} data - нові дані для оновлення
 * @returns {Promise<Collection|null>}
 */
export const updateCollection = async (collectionId, data) => {
  try {
    return await Collection.findByIdAndUpdate(collectionId, data, {
      new: true,
    });
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Видаляє колекцію та всі елементи, що до неї належать
 * @param {string} collectionId - ID колекції
 * @returns {Promise<boolean>}
 */
export const deleteCollection = async collectionId => {
  try {
    await Item.deleteMany({ collectionId });
    const result = await Collection.findByIdAndDelete(collectionId);
    return !!result;
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Отримує всі колекції з підтримкою фільтрів, пагінації та сортування
 * @param {Object} params - параметри запиту
 * @param {Object} params.filters - фільтри для пошуку
 * @param {Object} params.pagination - об'єкт пагінації { page, perPage }
 * @param {Object} params.sort - параметри сортування
 * @returns {Promise<Object>} - об'єкт з даними колекцій та інформацією пагінації
 */
export const getAllCollections = async ({
  filters = {},
  pagination = { page: 1, perPage: 10 },
  sort = { createdAt: -1 },
}) => {
  const { page, perPage } = pagination;
  const offset = (page - 1) * perPage;

  const query = {};

  // Фільтрація
  if (filters.title) {
    query.title = { $regex: filters.title, $options: 'i' };
  }
  if (filters.keywords) {
    query.keywords = { $regex: filters.keywords, $options: 'i' };
  }
  if (filters.owner) {
    query.owner = filters.owner;
  }
  if (filters.typeCollection) {
    query.typeCollection = filters.typeCollection;
  }

  try {
    const totalCollections = await Collection.countDocuments(query);
    const collectionsList = await Collection.find(query)
      .sort(sort)
      .skip(offset)
      .limit(perPage);

    const paginationInfo = calculatePaginationData(
      totalCollections,
      page,
      perPage
    );

    return {
      ...paginationInfo,
      collections: collectionsList,
    };
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Додає користувача до списку перегляду колекції
 * @param {string} collectionId - ID колекції
 * @param {string} userId - ID користувача
 * @returns {Promise<Collection|null>}
 */
export const addViewUser = async (collectionId, userId) => {
  try {
    return await Collection.findByIdAndUpdate(
      collectionId,
      { $addToSet: { viewUsers: userId } },
      { new: true }
    );
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Додає користувача до списку редагування колекції
 * @param {string} collectionId - ID колекції
 * @param {string} userId - ID користувача
 * @returns {Promise<Collection|null>}
 */
export const addEditUser = async (collectionId, userId) => {
  try {
    return await Collection.findByIdAndUpdate(
      collectionId,
      { $addToSet: { editUsers: userId } },
      { new: true }
    );
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Видаляє користувача зі списку редагування колекції
 * @param {string} collectionId - ID колекції
 * @param {string} userId - ID користувача
 * @returns {Promise<Collection|null>}
 */
export const removeEditUser = async (collectionId, userId) => {
  try {
    return await Collection.findByIdAndUpdate(
      collectionId,
      { $pull: { editUsers: userId } },
      { new: true }
    );
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Видаляє користувача зі списку перегляду колекції
 * @param {string} collectionId - ID колекції
 * @param {string} userId - ID користувача
 * @returns {Promise<Collection|null>}
 */
export const removeViewUser = async (collectionId, userId) => {
  try {
    return await Collection.findByIdAndUpdate(
      collectionId,
      { $pull: { viewUsers: userId } },
      { new: true }
    );
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

/**
 * Клонує публічну колекцію разом з усіма її елементами
 * @param {string} collectionId - ID колекції для клонування
 * @param {string} newOwnerId - ID нового власника
 * @returns {Promise<Collection>}
 */
export const cloneCollection = async (collectionId, newOwnerId) => {
  try {
    const originalCollection = await Collection.findById(collectionId);
    if (!originalCollection) throw createHttpError(404, 'Колекція не знайдена');

    const clonedCollection = new Collection({
      title: originalCollection.title,
      description: originalCollection.description,
      keywords: originalCollection.keywords,
      downloads: 0,
      typeCollection: 'Private',
      viewUsers: [],
      editUsers: [],
      owner: newOwnerId,
    });
    const savedCollection = await clonedCollection.save();

    const items = await Item.find({ collectionId });
    if (items.length) {
      const clonedItems = items.map(item => ({
        title: item.title,
        description: item.description,
        price: item.price,
        link: item.link,
        photos: item.photos,
        collectionId: savedCollection._id,
        isCompleted: false,
      }));
      await Item.insertMany(clonedItems);
    }

    return savedCollection;
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};
