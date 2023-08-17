const IncomeSchema = require("../models/IncomeModel")

// ! TO add an income
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        // ! if input is empty
        if (!title || !category || !description || !date ) {
            return res.status(400).json({message: 'All fields are required!'})
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        
    }

    console.log(income)
}