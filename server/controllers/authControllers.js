'use strict'

const db = require('../models/index');
const User = db.User;
const { registerValidation, loginValidation } = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req,res) => {
    try {
        const { error } = registerValidation(req.body);
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
        const { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        const user = await User.findOne({where: {email: req.body.email}});
        if(!user) return res.status(400).send('Wrong email or password');
    
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Wrong email or password');
    
        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN);
        return res.header('token', token).send(token);   
    } catch (err) {
        return res.status(500).send('Server Error');
    }
};

const isVerify = async (req,res) => {
    res.send(`verifikovan je user.id: ${req.user}`);
}

module.exports = {
    register,
    login,
    isVerify
}