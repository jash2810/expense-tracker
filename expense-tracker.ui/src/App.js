import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import LoginForm from './Components/LoginComponent/LoginForm'
import RegisterForm from './Components/RegisterComponent/RegisterForm'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import UserProfile from './Components/UserProfile/UserProfile';
import Statistics from './Components/Statistics/Statistics';

const App=() =>{
  return (
    <div >
      <BrowserRouter>  
        <Switch>
          <Route path='/' exact component={LoginForm}></Route>
          <Route path='/register' exact component={RegisterForm}></Route>
          <Route path='/dashboard' exact component={Dashboard}></Route>
          <Route path='/profile' exact component={UserProfile}></Route>
          <Route path='/stats' exact component={Statistics}></Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
