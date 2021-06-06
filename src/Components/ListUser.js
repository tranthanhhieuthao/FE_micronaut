import React, { useState } from 'react'
import { Link,Route, Switch } from 'react-router-dom';
import '../CssStyle/ListUser.css'
import axios from "axios"


export default function ListUser(props) {

    const getUserAPI =
    "http://localhost:8080/api/users?page=1&size=10";
    // var {id, age, birthday,name, marriage, userName} = this.state

    const [listUser, setListUser] = useState([]);
    const getUser = () => {
    axios
      .get(getUserAPI)
      .then((res) => {
        //Cập nhật giá trị của state listUser
        setListUser(res.data.data.content);
        console.log("hieu", res.data.data)
      })
      .catch((err) => {
        //Trường hợp xảy ra lỗi
        console.log(err)
      })
    }
      
    
        return (
            <div>
                <h1>List User</h1>
                <button onClick={getUser}>Get User</button>
                <table style={{width:"100%"}}>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Birthday</th>
                        <th>Age</th>
                        <th>Marriage</th>
                        <th>Action</th>
                    </tr>
                    {listUser.map((user, index) => {
                        return (
                        <React.Fragment key={user.id}>
                        <tr>
                        <td>{user.id}</td>
                        <td>{user.userName}</td>
                        <td>{user.birthday}</td>
                        <td>{user.age}</td>
                        <td>{user.marriage}</td>
                        </tr>
                        </React.Fragment>
                        );
                    })}
                </table>
                <Link style={{cursor: "pointer", color: "blue"}} to="/login">Login</Link>
            </div>
            
        )
}

// export default ListUser