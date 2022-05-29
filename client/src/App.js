// *** NPM ***
import './App.css';
import { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

// ***OTHER ***
import Auth from './components/Auth/Auth'
import Registration from './components/Registration/Registration'
import WorkSpace from './components/WorkSpace/WorkSpace'
import instance from './instance/instance';
import { CircularProgress } from '@material-ui/core';


function App() {

  const [isAuth, setAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState()

const fetchCheckAuth = async() => {
    try {
        const response = await instance.get('/authentication')
        setUser(response.data)
        setAuth(true)
        setLoading(false)  
    } catch (error) {
        console.log(error)
        setLoading(false)  
        
    }
}
  useEffect(()=>{
    fetchCheckAuth()
  },[])
  return (
    <Switch>
      <Route exact path="/auth">
            <Auth setAuth = {setAuth}/>
      </Route>
      <Route exact path="/registration">
            <Registration/>
      </Route>
      
      {isLoading ?
        <CircularProgress style={{position:'absolute', left: '50%', top: '50%'}}/>
        :
        <Route path="/workSpace">
            {/* {isAuth ? <WorkSpace setAuth = {setAuth} user={user} fetchCheckAuth = {fetchCheckAuth}/> : <Redirect to = "/auth"/>} */}
            <WorkSpace setAuth = {setAuth} user={user} fetchCheckAuth = {fetchCheckAuth}/>
        </Route>        
      }
        
    </Switch>
    
  );
}

export default App;
