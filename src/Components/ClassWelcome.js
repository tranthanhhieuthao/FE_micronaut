import React, { component } from 'react'
import { Link,Route, Router, Switch, useRouteMatch,BrowserRouter } from 'react-router-dom';

class ClassWelcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: ""
        };
      }
    changeInputValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    validationForm() {
        let returnData = {
          error : false,
          msg: ''
        }
        const {email, password} = this.state
        //Kiểm tra email
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
          returnData = {
            error: true,
            msg: 'Không đúng định dạng email'
          }
        }
        //Kiểm tra password
        if(password.length < 8) {
          returnData = {
            error: true,
            msg: 'Mật khẩu phải lớn hơn 8 ký tự'
          }
        }
        return returnData;
      }
      submitForm(e) {
        //Chặn các event mặc định của form
        // e.preventDefault();
       //Gọi hàm validationForm() dùng để kiểm tra form
        // const validation = this.validationForm()
        //Kiểm tra lỗi của input trong form và hiển thị
        // if (validation.error) {
        //   alert(validation.msg)
        // }else{
        //   alert('Submit form success')
        // }
       window.history.pushState({user: "", password: ""}, "users", "users")
      }
    render() {
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
            <label htmlFor="text" style={{display: "block"}}>Email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter email"
              onChange={e => this.changeInputValue(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd" style={{display: "block"}}>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              onChange={e => this.changeInputValue(e)}
            />
          </div>
          <div style= {{display: "grid"}}>
          <button type="submit" style={{cursor: "pointer", background: "blue"}} className="btn btn-primary">
            <div style={{color: "white"}}>Login</div>
          </button>
          <Link style={{cursor: "pointer", color: "blue"}} to="/register">Click here for new user registration</Link>
          </div>
        </form>
        
      </div>
        )
    }
}

export default ClassWelcome