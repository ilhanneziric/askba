const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

app.use('/', async (req,res) => {
    res.status(200).send('Hey AskBa');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on PORT: ${PORT}`); });