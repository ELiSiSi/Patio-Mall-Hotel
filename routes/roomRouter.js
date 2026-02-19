import express from "express";
const router = express.Router();

import {
  createRoom,
  getAllRooms,
  getRoom,
  deleteRoom,
  deleteAllRooms,
  updateRoom
} from '../controller/roomController.js';

router
  .route("/")
  .post(createRoom)
  .get(getAllRooms);

router.route('/deleteAll').delete(deleteAllRooms);


router
  .route("/:id")
  .get(getRoom)
  .delete(deleteRoom)
  .patch(updateRoom);


export default router;
