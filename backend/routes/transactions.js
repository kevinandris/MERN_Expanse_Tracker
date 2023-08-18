const { addIncome, getIncomes, deleteIncome } = require('../controllers/Income.js')

const router = require ('express').Router()


// ! FOR INCOME
router.post('/add-income', addIncome)
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)


// ! FOR EXPENSE

module.exports = router