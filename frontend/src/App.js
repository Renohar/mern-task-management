import './App.css';
import {Routes,Route} from "react-router-dom"
import Header from './components/Header';
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Account from './components/Account';
import AddTask from "./components/AddTask"
// import { useDispatch} from 'react-redux';
import UpdateTask from "./components/UpdateTask"


function App() {
  // const dispatch = useDispatch();
  const isUserSignedin = !!localStorage.getItem('token')
  // const storedUserID = localStorage.getItem('userID');
  //   if (storedUserID) {
  //       store.dispatch(setUserID(storedUserID));
  //   }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/signup" element={ <Signup/> }/>
        <Route path="/addtask" element={ <AddTask/> }/>
        <Route path="/updatetask/:id" element={<UpdateTask/>} />
        {isUserSignedin && <Route path="/account" element={<Account/>} /> }
      </Routes>
    </div>
  );
}

export default App;
