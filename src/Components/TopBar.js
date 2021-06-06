import React from 'react'
import { Link,Route, Switch } from 'react-router-dom';
import '../CssStyle/TopBar.css'

class TopBar extends React.Component {

    render() {
        return (
        <div>
            <ul className="horizontal">
              <li style={{marginRight: "20px"}}><a href="default.asp">Home</a></li>
              <li><Link to="/login">Logout</Link></li>
           </ul>
        </div>
            
        )
    }
}

export default TopBar