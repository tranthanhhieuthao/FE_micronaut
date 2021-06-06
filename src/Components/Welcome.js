import React from 'react'
import { Link,Route, Switch } from 'react-router-dom';
import '../App.css';

class Welcome extends React.Component {

    render() {
    return (
        <div style={{ paddingTop: "5%", display: "flex", justifyContent: "center" }}>
            <form  className="from-wapper">
                <div>
                <label className="label-form">User ID</label>
                <input ></input>
                </div>
                <div>
                <label className="label-form">Password</label>
                <input ></input>
                </div>
                <div>
                <label className="label-form">User Name</label>
                <input ></input>
                </div>
                <div>
                <label className="label-form">Birthday</label>
                <input ></input>
                </div>
                <div>
                <label className="label-form">Age</label>
                <input ></input>
                </div>
                <div>
                <label className="label-form">Marriage</label>
                <input ></input>
                </div>
                <button>User Registration</button>
                <Link style={{cursor: "pointer", color: "blue"}} to="/login">Login</Link>
            </form>
        </div>
    )
 }
}


export default Welcome