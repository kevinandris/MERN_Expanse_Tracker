// ! 4
const ExpenseModel = require("../models/ExpenseModel.js")

// ! To create an expense to MongoDB -- using postman type: POST
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const expense = ExpenseModel({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        // * if input is empty
        if (!title || !category || !description || !date ) {
            return res.status(400).json({message: 'All fields are required!'})
        }

        // * if amount field is below or equal to zero or not a number
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        await expense.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(expense)
}

// ! To get all expense from MongoDB -- using postman type:GET
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseModel.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

// ! To delete an expense in MongoDB -- using postman type:POST
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    ExpenseModel.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Server Error'})
        })
}