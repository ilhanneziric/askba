'use strict'

const db = require('../models/index');
const Question = db.Question;
const User = db.User;
const Answer = db.Answer;
const Like = db.Like;

const getLikeByQuestionId = async (req,res) => {
    try {
        const like = await Like.findOne({
            where: {questionId: req.params.questionid},
            include: [{
                model: User
            },{
                model: Question
            },{
                model: Answer
            }]
        });
        if(like){
            return res.status(200).json(like);
        }
        return res.status(404).send('Like with the specified question id does not exists');
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const getLikeByAnswerId = async (req,res) => {
    try {
        const like = await Like.findOne({
            where: {answerId: req.params.answerid},
            include: [{
                model: User
            },{
                model: Question
            },{
                model: Answer
            }]
        });
        if(like){
            return res.status(200).json(like);
        }
        return res.status(404).send('Like with the specified answer id does not exists');
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const addLike = async (req,res) => {
    try {
        const like = await Like.create(req.body);
        return res.status(201).json(like);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const updateLike = async (req,res) => {
    try {
        const [updated] = await Like.update(req.body, {
            where: {id: req.params.id}
        });
        if(updated){
            const updatedLike = await Like.findOne({where: {id: req.params.id}});
            return res.status(200).json({like: updatedLike});
        }
        return res.status(500).send('Like not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const deleteLike= async (req,res) => {
    try {
        const deleted = await Like.destroy({
            where: {id: req.params.id}
        });
        if(deleted){
            return res.status(200).send('Like deleted');
        }
        return res.status(500).send('Like not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    addLike,
    updateLike,
    deleteLike,
    getLikeByQuestionId,
    getLikeByAnswerId
}