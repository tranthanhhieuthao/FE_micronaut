import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import API from './ConfigAxios/AxiosCommon'
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));
export default function ClassWelcome(props) {
  const [setCookie] = useCookies(['token']);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

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
        <form className={classes.root} noValidate autoComplete="off"
          style={{    border: "1px solid black",
            height: "300px",
            width: "350px",
            display: "inline-grid",
            justifyContent: "center",
            padding: "5px",}}>
          <div><h2>LOGIN</h2></div>
          <div>
          <TextField id="standard-basic" label="User Name" type="text" variant="outlined" onChange={e => setUsername(e.target.value)}
              value={username} />
          </div>
          <div>
          <TextField id="filled-basic" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)}
              value={password} />
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
