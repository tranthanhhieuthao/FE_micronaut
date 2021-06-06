import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import TopBar from './Components/TopBar'
import "bootstrap/dist/css/bootstrap.css"


ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
     <header>
        <TopBar />
     </header>
     <section>
       <ul>
         <li><a href="#">London</a></li>
         <li><a href="#">Paris</a></li>
         <li><a href="#">Tokyo</a></li>
       </ul>
      </section>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
