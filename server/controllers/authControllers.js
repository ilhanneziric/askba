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
        console.log(req.body);
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
        res.json(true);
    } catch (err) {
        return res.status(500).send('Server Error');
    }
}

module.exports = {
    register,
    login,
    isVerify
}