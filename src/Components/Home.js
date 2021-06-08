import React, { useEffect } from 'react'

export default function Home(props) {

    function getCookie(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        else return ''
      }

      useEffect( () => {
        if (getCookie('token') === '') {
          props.history.push("/login")
          return
        }
      }, []);

        return (
            <div>
                <h1>Home</h1>
            </div>
        )
}
