// ! 13 to access the API
import React, { useContext, useState } from "react"
import axios from 'axios' // because we gonna do some request on our server

const BASE_URL = "http://localhost:5000/api/v1/"

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // ! calculate INCOMES -- send some data
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        
        // calling getIncomes to prevent endless data sending for the backend
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)

        // calling getIncomes to prevent endless data sending for the backend
        getIncomes()
    }

    // TOTAL INCOME function
    const theTotalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount
        })

        return totalIncome;
    }

    // ======================================================================== //

    // ! calculate EXPENSES -- send some data
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        
        // calling getIncomes to prevent endless data sending for the backend
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)

        // calling getIncomes to prevent endless data sending for the backend
        getExpenses()
    }

     // TOTAL INCOME function
     const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome += income.amount
        })

        return totalIncome;
    }

    // ======================================================================== //

    const totalBalance = () => {
        return theTotalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses ]
        // sort
        history.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        // only want to return recent history
        return history.slice(0, 3)
    }
    
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            theTotalIncome,

            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,

            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}