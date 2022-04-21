'use strict'

const db = require('../models/index');
const Question = db.Question;
const User = db.User;
const Answer = db.Answer;
const Like = db.Like;
const sequelize = db.sequelize;

const getAllQuestions = async (req,res) => {
    try {

        const questions = await Question.findAll({
            offset: req.params.offset,
            limit: 6,
            include: [{
                model: User
            },{
                model: Answer
            },{
                model: Like
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return res.status(200).json(questions);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const getQuestion = async (req,res) => {
    try {
        const question = await Question.findOne({
            where: {id: req.params.id},
            include: [{
                model: User
            },{
                model: Answer,
                include: [User, Like],
                order: [
                    ['createdAt', 'ASC']
                ]
            },{
                model: Like
            }]
        });
        if(question){
            return res.status(200).json(question);
        }
        return res.status(404).send('Question with the specified id does not exists');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const getAllQuestionsByUserId = async (req,res) => {
    try {
        const questions = await Question.findAll({
            offset: req.params.offset,
            limit: 6,
            where: {userId: req.params.id},
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return res.status(200).json(questions);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const getHotQuestions = async (req,res) => {
    try {
        const questions = await Question.findAll({
            limit: 5,
            subQuery:false,
            order: [
                [sequelize.fn('COUNT', sequelize.col('Likes.id')), 'DESC']
            ],
            attributes: { 
                include: [[sequelize.fn("COUNT", sequelize.col("Likes.id")), "likesCount"]] 
            },
            include: [{
                model: Like, attributes: []
            }],            
            group: ['Question.id'],
        });
        return res.status(200).json(questions);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const addQuestion = async (req,res) => {
    try {
        const question = await Question.create(req.body);
        return res.status(201).json(question);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const updateQuestion = async (req,res) => {
    try {
        const [updated] = await Question.update(req.body, {
            where: {id: req.params.id}
        });
        if(updated){
            const updatedQuestion = await Question.findOne({
                where: {id: req.params.id},
                include: [{
                    model: User
                },{
                    model: Answer,
                    include: [User, Like],
                    order: [
                        ['createdAt', 'ASC']
                    ]
                },{
                    model: Like
                }]
            });
            return res.status(200).json(updatedQuestion);
        }
        return res.status(500).send('Question not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const deleteQuestion = async (req,res) => {
    try {
        const deleted = await Question.destroy({
            where: {id: req.params.id}
        });
        if(deleted){
            return res.status(200).send('Question deleted');
        }
        return res.status(500).send('Question not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    getAllQuestions,
    getQuestion,
    getAllQuestionsByUserId,
    getHotQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion
}