'use strict'

const db = require('../models/index');
const Question = db.Question;
const User = db.User;
const Answer = db.Answer;
const sequelize = db.sequelize;

const getUser = async (req,res) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
            include: [{
                model: Answer
            },{
                model: Question
            }]
        });
        if(user){
            return res.status(200).json(user);
        }
        return res.status(404).send('User with the specified id does not exists');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const getHotUsers = async (req,res) => {
    try {
        const users = await User.findAll({
            limit: 5,
            subQuery:false,
            order: [
                [sequelize.fn('COUNT', sequelize.col('Answers.id')), 'DESC']
            ],
            attributes: { 
                include: [[sequelize.fn("COUNT", sequelize.col("Answers.id")), "answersCount"]] 
            },
            include: [{
                model: Answer, attributes: []
            }],            
            group: ['User.id'],
        });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const updateUser = async (req,res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: {id: req.params.id}
        });
        if(updated){
            const updatedUser = await User.findOne({where: {id: req.params.id}});
            return res.status(200).json(updatedUser);
        }
        return res.status(500).send('User not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const deleteUser = async (req,res) => {
    try {
        const deleted = await User.destroy({
            where: {id: req.params.id}
        });
        if(deleted){
            return res.status(200).send('User deleted');
        }
        return res.status(500).send('User not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    getUser,
    getHotUsers,
    updateUser,
    deleteUser
}