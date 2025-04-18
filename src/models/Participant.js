import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th'],
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  participated: {
    type: Boolean,
    default: false,
  },
  submissionTime: {
    type: Date,
    default: Date.now,
  }
});

const Participant = mongoose.model('Participant', participantSchema);
export default Participant;
