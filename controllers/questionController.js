import Participant from "../models/Participant.js";
import Question from "../models/Question.js"; 

export const addQuestion = async (req, res) => {
  try { 
    const { question, options, correctAnswer, domain } = req.body;

    if (!question || !options || !correctAnswer || !domain) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ message: 'Options must be an array with at least two values' });
    }

    const newQuestion = new Question({ question, options, correctAnswer, domain });
    await newQuestion.save();

    res.status(201).json({ message: 'Question added successfully', question: newQuestion });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 


export const getQuestionById = async (req, res) => {
    try {
      const { id } = req.params; 
      const question = await Question.findById(id); 
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json(question);
    } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); 
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

export const getQuestionsByDomain = async (req, res) => {
    try {
      const { domain } = req.params; 
      const questions = await Question.find({ domain }); 
      if (questions.length === 0) {
        return res.status(404).json({ message: "No questions found for this domain" });
      } 
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error fetching questions by domain:", error);
      res.status(500).json({ message: "Error fetching questions by domain", error: error.message });
    }
  };
  


export const submitScore = async (req, res) => {
  try {
    const { id, scoreToAdd } = req.body;

    const participant = await Participant.findById(id);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    if (participant.submitted) {
      return res.status(400).json({ message: "Score already submitted once." });
    }

    participant.score += scoreToAdd;
    participant.participated = true; 

    await participant.save();

    res.status(200).json({ message: "Score submitted successfully", updatedScore: participant.score });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ message: "Failed to submit score", error: error.message });
  }
};
