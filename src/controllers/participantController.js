import Participant from '../models/Participant.js';

export const createParticipant = async (req, res) => {
  try {
    const { name, year, college, branch } = req.body; 
    if(!name || !year || !college || !branch){
      return res.status(400).json({ message: 'All fields are required' });
    } 
    const newParticipant = new Participant({
      name,
      year,
      college,
      branch
    });

    await newParticipant.save();
    res.status(201).json({ message: 'User created successfully', participant: newParticipant });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


export const getAllParticipants = async (req, res) => {
  try {
    // console.log("Working on it....");
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participants', error: error.message });
  }
};
 
export const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params; 
    const participant = await Participant.findById(id);

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participant', error: error.message });
  }
};