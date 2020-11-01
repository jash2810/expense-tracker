import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import LoginForm from './Components/LoginComponent/LoginForm'
import RegisterForm from './Components/RegisterComponent/RegisterForm'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';

const App=() =>{
  return (
    <div >
      <BrowserRouter>  
        <Switch>
          <Route path='/' exact component={LoginForm}></Route>
          <Route path='/register' exact component={RegisterForm}></Route>
          <Route path='/dashboard' exact component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
