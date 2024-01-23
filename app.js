const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expense');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', expenseRoutes);

app.use((req, res) => {
    res.status(404).json({success: false, message: 'Page not found'});
})


sequelize
    .sync()
    .then((res) => {
        app.listen(PORT);
    })
    .catch((err) => {
        console.log(err);
    })