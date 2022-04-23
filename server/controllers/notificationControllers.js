'use strict'

const db = require('../models/index');
const User = db.User;
const Notification = db.Notification;

const getNotificationByUserId = async (req,res) => {
    try {
        const notification = await Notification.findAll({
            where: {userId: req.params.userid},
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if(notification){
            return res.status(200).json(notification);
        }
        return res.status(404).send('Notifications with the specified user id does not exists');
    } catch (err) {
        return res.status(500).send(err.message);
    }
}


const setNotificationsSeenByUserId = async (req,res) => {
    try {
        console.log('doso ovdje');
        const notification = await Notification.update( {seen: true}, {
            where: {userId: req.params.userid, seen: false}
        });
        console.log('notification ovdje', notification);

        if(notification){
            return res.status(200);
        }
        return res.status(404).send('Notifications with the specified user id does not exists');
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const addNotification = async (req,res) => {
    try {
        const notification = await Notification.create(req.body);
        return res.status(201).json(notification);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const deleteNotification = async (req,res) => {
    try {
        const deleted = await Notification.destroy({
            where: {id: req.params.id}
        });
        if(deleted){
            return res.status(200).send('Notification deleted');
        }
        return res.status(500).send('Notification not found');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    addNotification,
    deleteNotification,
    getNotificationByUserId,
    setNotificationsSeenByUserId
}