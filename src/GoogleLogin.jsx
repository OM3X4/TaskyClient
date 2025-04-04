/* eslint-disable */
import React , {useEffect} from 'react';
import { GoogleOAuthProvider ,GoogleLogin } from "@react-oauth/google"

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const BackendURL = import.meta.env.VITE_BACKEND_URL


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
                        fetch(`${BackendURL}/auth/google/` ,
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