import express from 'express'; 
import {createParticipant, getAllParticipants, getParticipantById} from "../controllers/participantController.js"
 
const router = express.Router();

router.post('/', createParticipant); 
router.get('/', getAllParticipants); 
router.get('/:id', getParticipantById);

export default router;

