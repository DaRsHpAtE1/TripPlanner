import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [conf, setConf] = useState("");

    const hEmail = (event) => { setEmail(event.target.value); }
    const hPw = (event) => { setPw(event.target.value); }
    const hConf = (event) => { setConf(event.target.value); }

    const save = (event) => {
        event.preventDefault();
        if (pw == conf) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, pw)
                .then(res => nav("/login"))
                .catch(err => alert('Issue: ' + err))
        }
        else {
            alert('Password\'s do not match!')
        }
    }
    return (
        <>
            <center>

                <h1>Sign Up Today!</h1>
                <form onSubmit={save}>
                    <input type="email" placeholder="Enter your email" onChange={hEmail} />
                    <br /><br />
                    <input type="password" placeholder="Create a password" onChange={hPw} />
                    <br /><br />
                    <input type="password" placeholder="Confirm your password" onChange={hConf} />
                    <br /><br />
                    <input type="submit" value="Create your account!" />
                </form>
            </center>

        </>
    )
}
export default SignUp;