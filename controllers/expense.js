const Expense = require('../models/expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json([...expenses.map((expense) => expense.dataValues)]);
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

exports.getExpenseById = async (req, res) => {
    const expenseId = req.params.id;

    try {
        const expense = await Expense.findByPk(expenseId);

        if(expense) {
            res.json({success: true, ...expense.dataValues});
        }
        else {
            res.status(404).json({success: false, message: 'Expense Not Found'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

exports.createExpense = async (req, res) => {
    const {amount, discription, catagory} = req.body;

    try {
        const expense = await Expense.create({amount, discription, catagory});
        res.json({success: true, ...expense.dataValues});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;

    try {
        const expenseById = await Expense.findByPk(expenseId);
        const expense = await Expense.destroy({
            where: {
                id: expenseId
            }
        })

        console.log(expense);

        if(expense > 0){
            res.json({success: true, ...expenseById.dataValues});
        }
        else {
            res.status(404).json({success: false, message: 'Expense Not Found'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

exports.editExpense = async (req, res) => {
    const expenseId = req.params.id;
    const {amount, discription, catagory} = req.body;

    try {
        const expense = await Expense.update({amount, discription, catagory}, {
            where: {
                id: expenseId
            }
        })

        if(expense[0]){
            res.json({success: true, ...{amount, discription, catagory}});
        }
        else {
            res.status(404).json({success: false, message: 'Expense Not Found'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}