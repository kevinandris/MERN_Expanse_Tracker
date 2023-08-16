// ! 2

/* 
    ! Dependencies installed for frontend:
    - axios
    - styled-components
    - react-chart.js
    - react-chartjs-2
    - react-datepicker
    - moment

    ! To run the frontend:
    - on terminal type: npm start
*/

import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from "./styles/Layout";
import Orb from "./Components/Orb/Orbs";
import Navigation from "./Components/Navigation/Navigation";
import React, { useMemo, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";

function App() {
  const [active, setActive] = React.useState(1)

  // allow me to use the Global Context
  const global = useGlobalContext()
  console.log(global)

  // function to display the data
  const displayData = () => {
    switch(active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  // so the orb doesn't restart again from the beginning, keeps it running
  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
        <MainLayout>
          <Navigation active={active} setActive={setActive}/>

          <main>
            {displayData()}
          </main>

        </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;

    main {
      flex: 1; // fill the remaining space
      background: rgba(252, 246, 249, 0.78);
      border: 3px solid #FFFFFF;
      backdrop-filter: blur(4.5px);
      border-radius: 32px;
      /* overflow: auto; */
      overflow-x: hidden;

      // get rid of the scrollbar
      &::-webkit-scrollbar {
        width: 0;
      }
    }
`;

export default App;
