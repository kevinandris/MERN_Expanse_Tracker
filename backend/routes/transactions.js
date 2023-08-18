const { addExpense, getExpenses, deleteExpense } = require('../controllers/Expense.js')
const { addIncome, getIncomes, deleteIncome } = require('../controllers/Income.js')

const router = require ('express').Router()

// ! FOR INCOME -- for postman as well
router.post('/add-income', addIncome)
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)

// ! FOR EXPENSE -- for postman as well
router.post('/add-expense', addExpense)
        .get('/get-expenses', getExpenses)
        .delete('/delete-expense/:id', deleteExpense)

module.exports = router