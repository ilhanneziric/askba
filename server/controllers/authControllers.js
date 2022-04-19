'use strict'

const db = require('../models/index');
const User = db.User;
const validation = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req,res) => {
    try {
        const { error } = validation({email:req.body.email, password: req.body.password});
        if(error) return res.status(400).send(error);
    
        const emailExist = await User.findOne({where: {email: req.body.email}});
        if(emailExist) return res.status(400).send('User already exist');
    
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        
        const user = await User.create(req.body);
        const token = jwt.sign({id:user.id}, process.env.SECRET_TOKEN);
        return res.header('token', token).send(token);  
    } catch (err) {
        return res.status(500).send('Server Error');
    }
};

const login = async (req,res) => {
    try {
        const { error } = validation({email:req.body.email, password: req.body.password});
        if(error) return res.status(400).send(error.details[0].message);
    
        const user = await User.findOne({where: {email: req.body.email}});
        if(!user) return res.status(400).send('Wrong email or password');
    
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Wrong email or password');
    
        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN);
        return res.send(token);   
    } catch (err) {
        return res.status(500).send('Server Error');
    }
};

const isVerify = async (req,res) => {
    try {
        res.json({isAuthenticated: true, userId: req.user});
    } catch (err) {
        return res.status(500).send('Server Error');
    }
}

const changePassword = async (req,res) => {
    try {    
        const user = await User.findOne({where: {id: req.params.id}});
        if(!user) return res.status(400).send('Wrong email or password');
    
        const validPass = await bcrypt.compare(req.body.currentPassword, user.password);
        if(!validPass) return res.status(400).send('Wrong password');

        const salt = await bcrypt.genSalt(10);
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
    
        const [updated] = await User.update({password: req.body.newPassword}, {
            where: {id: req.params.id}
        });
        if(updated){
            const updatedUser = await User.findOne({where: {id: req.params.id}});
            return res.status(200).json(updatedUser);
        }
        return res.status(500).send('User not found');
    } catch (err) {
        return res.status(500).send('Server Error');
    }
}

module.exports = {
    register,
    login,
    isVerify,
    changePassword
}