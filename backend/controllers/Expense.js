const IncomeModel = require("../models/IncomeModel.js")

// ! To create an expense to MongoDB --  using postman type: POST
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const expense = IncomeModel({
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

        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        await expense.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(expense)
}

// ! To get all income from MongoDB -- using postman type:GET
exports.getExpense = async (req, res) => {
    try {
        const incomes = await IncomeModel.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

// ! To delete an income in the database -- using postman type:POST
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    IncomeModel.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Server Error'})
        })
}