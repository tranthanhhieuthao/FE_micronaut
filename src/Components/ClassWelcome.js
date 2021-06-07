import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import API from './ConfigAxios/AxiosCommon'
import { useCookies } from 'react-cookie';

export default function ClassWelcome(props) {
  const [cookies, setCookie] = useCookies(['token']);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    function validationForm() {
        let returnData = {
          error : false,
          msg: ''
        }
        //Kiểm tra username
        // const re = /\S+@\S+\.\S+/;
        // if (!re.test(username)) {
        //   returnData = {
        //     error: true,
        //     msg: 'Không đúng định dạng email'
        //   }
        // }
        //Kiểm tra password
        if(password.length < 8) {
          returnData = {
            error: true,
            msg: 'Mật khẩu phải lớn hơn 8 ký tự'
          }
        }
        return returnData;
      }

      const handleChange = e =>
    e.target.name === "username"
        ? setUsername(e.target.value)
        : e.target.name === "password"
        ? setPassword(e.target.value)
        : "";
      function submitForm(e) {
        //Chặn các event mặc định của form
        e.preventDefault();
       //Gọi hàm validationForm() dùng để kiểm tra form
        // const validation = this.validationForm()
        //Kiểm tra lỗi của input trong form và hiển thị
        // if (validation.error) {
        //   alert(validation.msg)
        // }else{
        //   alert('Submit form success')
        // }
        API
      .post("/login", {
        username: username,
        password: password
      })
      .then((res) => {

        // setListUser(res.data.data.content);
        console.log("hieujwt", res.data.access_token)
        setCookie('token', res.data.access_token);
        window.history.pushState(null, "users", "users")
      })
      .catch((err) => {
        //Trường hợp xảy ra lỗi
        console.log(err)
      })
      //  window.history.pushState(null, "users", "users")
      }
        return (
            <div className="container" style={{ paddingTop: "5%", display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={e => {
            this.submitForm(e);
          }}
          className="formWapper"
          style={{    border: "1px solid black",
            height: "200px",
            width: "300px",
            display: "inline-grid",
            justifyContent: "center",
            padding: "10px",}}
        >
          <div className="form-group">
            <label htmlFor="text" style={{display: "block"}}>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter User Name"
              onChange={handleChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd" style={{display: "block"}}>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={password}
            />
          </div>
          <div style= {{display: "grid"}}>
          <button type="submit" style={{cursor: "pointer", background: "blue"}} className="btn btn-primary" onClick={submitForm}>
            <div style={{color: "white"}}>Login</div>
          </button>
          <Link style={{cursor: "pointer", color: "blue"}} to="/register">Click here for new user registration</Link>
          </div>
        </form>
        
      </div>
        )
}
