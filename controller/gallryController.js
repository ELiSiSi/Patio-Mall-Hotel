import {createOne , deleteOne , getAll , getOne , deleteAll , updateOne } from './hendlerFactory.js';
import Gallry from "../models/gallryModel.js";

// create gallry-----------------------------------------------------------------------------------
export const createGallry = createOne(Gallry);
// get all gallries-----------------------------------------------------------------------------------
export const getAllGallries = getAll(Gallry);
// get gallry by id-----------------------------------------------------------------------------------
export const getGallry = getOne(Gallry);
// update gallry-----------------------------------------------------------------------------------
export const updateGallry = updateOne(Gallry);
// delete gallry-----------------------------------------------------------------------------------
export const deleteGallry = deleteOne(Gallry);
// delete all gallries-----------------------------------------------------------------------------------
export const deleteAllGallries = deleteAll(Gallry);
