import express from "express";
const router = express.Router();


import { createGallry , deleteGallry , deleteAllGallries , getAllGallries , getGallry , updateGallry    } from "../controller/gallryController.js";


router.route("/")
    .post(createGallry)
    .get(getAllGallries)
    .delete(deleteAllGallries);

router.route("/:id")
    .get(getGallry)
    .patch(updateGallry)
    .delete(deleteGallry);

export default router;
