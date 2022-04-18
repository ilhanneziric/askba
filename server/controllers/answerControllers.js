'use strict'

const db = require('../models/index');
const Question = db.Question;
const User = db.User;
const Answer = db.Answer;
const Like = db.Like;

const getAllAnswers = async (req,res) => {
    try {
        const answers = await Answer.findAll({
            include: [{
                model: User
            },{
                model: Question
            },{
                model: Like
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return res.status(200).json(answers);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const getAnswer = async (req,res) => {
    try {
        const answer = await Answer.findOne({
            where: {id: req.params.id},
            include: [{
                model: User
            },{
                model: Question
            },{
                model: Like
            }]
        });
        if(answer){
            return res.status(200).json(answer);
        }
        return res.status(404).send('Answer with the specified id does not exists');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const addAnswer = async (req,res) => {
    try {
        const answer = await Answer.create(req.body);
        return res.status(201).json(answer);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const updateAnswer = async (req,res) => {
    try {
        const [updated] = await Answer.update(req.body, {
            where: {id: req.params.id}
        });
        if(updated){
            const updatedAnswer = await Answer.findOne({where: {id: req.params.id}});
            return res.status(200).json({answer: updatedAnswer});
        }
        return res.status(500).send('Answer not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const deleteAnswer = async (req,res) => {
    try {
        const deleted = await Answer.destroy({
            where: {id: req.params.id}
        });
        if(deleted){
            return res.status(200).send('Answer deleted');
        }
        return res.status(500).send('Answer not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    getAllAnswers,
    getAnswer,
    addAnswer,
    updateAnswer,
    deleteAnswer
}