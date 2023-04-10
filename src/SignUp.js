import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [conf, setConf] = useState("");
    const validate = (email, pw) => {
        if (email === "") {
            alert("Please enter your email!");
        }
        else if (pw < 5) {
            alert("Password must be at least 5 characters!");
        }
        else if (pw !== conf) {
            alert("Passwords do not match!");
        }
        else {
            return true;
        }
    }


    const hEmail = (event) => { setEmail(event.target.value); }
    const hPw = (event) => { setPw(event.target.value); }
    const hConf = (event) => { setConf(event.target.value); }

    const save = (event) => {
        event.preventDefault();
        if (pw === conf) {
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
                <br /><br />
                <h1>Sign Up Today!</h1>
                <form onSubmit={save}>
                    <input type="email" placeholder="Enter your email" onChange={hEmail} required />
                    <br /><br />
                    <input type="password" placeholder="Create a password" onChange={hPw} required />
                    <br /><br />
                    <input type="password" placeholder="Confirm your password" onChange={hConf} required />
                    <br /><br />
                    <input type="submit" value='Create' name="s" />
                </form>
            </center>

        </>
    )
}
export default SignUp;