import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import LoginForm from './Components/LoginComponent/LoginForm'
import RegisterForm from './Components/RegisterComponent/RegisterForm'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App=() =>{
  return (
    <div >
      <BrowserRouter>  
        <Switch>
          <Route path='/' exact component={LoginForm}></Route>
          <Route path='/register' exact component={RegisterForm}></Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
