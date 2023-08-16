// ! 18 -- For charts
import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/DateFormat'

// register them so we can use them
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {

    // call useGlobalContext
    const {incomes, expenses} = useGlobalContext()

    const data = {
        // x-label
        labels: incomes.map((inc) => {
            const {date} = inc
            return dateFormat(date)
        }),

        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2 // to make the lines curvy
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2 // to make the lines curvy
            },
        ]
    }
    
    return (
        <ChartStyled>
            <Line data={data}/>
        </ChartStyled>
    )
}

const ChartStyled = styled.div`

`;

export default Chart