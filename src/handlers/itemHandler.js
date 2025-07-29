import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as itemController from '../controllers/itemController.js';

export const createItemHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.createItem);
  return await ctrl(event, context);
};

export const getItemByIdHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.getItemById);
  return await ctrl(event, context);
};

export const updateItemHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.updateItem);
  return await ctrl(event, context);
};

export const deleteItemHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.deleteItem);
  return await ctrl(event, context);
};

export const getAllItemsHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.getAllItems);
  return await ctrl(event, context);
};

export const markItemCompletedHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.markItemCompleted);
  return await ctrl(event, context);
};

export const markItemUncompletedHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.markItemUncompleted);
  return await ctrl(event, context);
};

export const toggleItemStatusHandler = async (event, context) => {
  const ctrl = ctrlWrapper(itemController.toggleItemStatus);
  return await ctrl(event, context);
};
