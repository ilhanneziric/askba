const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/user', userRoutes);

app.use('/', async (req,res) => {
    res.status(200).send('Hey AskBa');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on PORT: ${PORT}`); });