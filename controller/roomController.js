import Room from '../models/roomModel.js';
import { createOne, deleteOne, getAll, getOne , deleteAll , updateOne} from './hendlerFactory.js';

// create room-----------------------------------------------------------------------------------
export const createRoom = createOne(Room);
// get all rooms-----------------------------------------------------------------------------------
export const getAllRooms = getAll(Room);
// get room by id-----------------------------------------------------------------------------------
export const getRoom = getOne(Room);
// update room-----------------------------------------------------------------------------------
export const updateRoom = updateOne(Room);
// delete room-----------------------------------------------------------------------------------
export const deleteRoom = deleteOne(Room);
// delete all rooms-----------------------------------------------------------------------------------
export const deleteAllRooms = deleteAll(Room);
