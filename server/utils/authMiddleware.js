const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req,res,next) => {
    try {
        const token = req.header('token');
        console.log(token);
        if(!token) return res.status(403).send('Not Authorize');

        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = user.id;
        next();   
    } catch (err) {
        return res.status(403).send('Not Authorize');
    }
};