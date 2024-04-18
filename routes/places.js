import express from 'express';
import {
    searchPlaceFromQuery,
    searchPlacesNearby,
    getPlaceDetails
} from '../controllers/places.js';

const router = express.Router();

router.get("/querySearch", searchPlaceFromQuery);
router.get("/searchNearby", searchPlacesNearby);
router.get("/getPlaceDetails", getPlaceDetails);

export default router;
