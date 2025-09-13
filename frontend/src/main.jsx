import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Header from './Components/Header.jsx'
import History from "./Components/HIstory.jsx";
import IncomeExpense from "./Components/IncomeExpense";
import NewTransaction from "./Components/NewTransaction";
import YourBalance from "./Components/YourBalance";
import Table from './Components/Table.jsx'
import State from './Contexts/state.jsx'
import RegisterForm from './Components/RegisterForm.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RegisterForm />
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        index: true,
        element: <>
                  <Header />
                  <YourBalance/>
                  <IncomeExpense/>
                  <History />
                  <NewTransaction />
                 </>
      },
      {
        path: "table",
        element: <Table />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <State>
      <RouterProvider router={appRouter}/>
    </State>
  </StrictMode>,
)
