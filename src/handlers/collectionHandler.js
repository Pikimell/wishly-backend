import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as collectionController from '../controllers/collectionController.js';

export const createCollectionHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.createCollection);
  return await ctrl(event, context);
};

export const getCollectionByIdHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.getCollectionById);
  return await ctrl(event, context);
};

export const updateCollectionHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.updateCollection);
  return await ctrl(event, context);
};

export const deleteCollectionHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.deleteCollection);
  return await ctrl(event, context);
};

export const getAllCollectionsHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.getAllCollections);
  return await ctrl(event, context);
};

export const addViewUserHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.addViewUser);
  return await ctrl(event, context);
};

export const addEditUserHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.addEditUser);
  return await ctrl(event, context);
};

export const removeViewUserHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.removeViewUser);
  return await ctrl(event, context);
};

export const removeEditUserHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.removeEditUser);
  return await ctrl(event, context);
};

export const cloneCollectionHandler = async (event, context) => {
  const ctrl = ctrlWrapper(collectionController.cloneCollection);
  return await ctrl(event, context);
};
