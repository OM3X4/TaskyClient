/* eslint-disable */
import React from 'react';
import { GoogleOAuthProvider ,GoogleLogin } from "@react-oauth/google"

const CLIENT_ID = "441640127193-68e3tk5smeclt6esno0s311ptlrb1hs1.apps.googleusercontent.com"

function GoogleLoginButton({ onLoginSuccess }) {




    return (
    <>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
                theme="outline"
                size="large"
                text="signin_with"
                shape="icon"
                logo_alignment="left"
                width="250px"
                onSuccess={
                    (response) => {
                        console.log("google success" , response)
                        const token = response.credential;

                        // send the token to django
                        fetch("http://127.0.0.1:8000/auth/google/" ,
                            {
                                method: "POST",
                                headers: {"Content-Type":"application/json"},
                                body: JSON.stringify({ token })
                            }
                        )
                        .then(res => res.json())
                        .then(data => {
                            console.log("backend Response" ,data);
                            if(data.access){
                                localStorage.setItem("access_token" , data.access);
                                localStorage.setItem("refresh_token" , data.refresh);
                                onLoginSuccess(data);
                            }
                        })
                        .catch(err => console.error("Error:", err));
                    }
                }
                onError={() => {
                    console.error("Google Login Failed");
                }}>

            </GoogleLogin>
        </GoogleOAuthProvider>
    </>
    );
}

export default GoogleLoginButton;