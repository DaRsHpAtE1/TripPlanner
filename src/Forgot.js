// import NavBar from "./NavBar";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Forgot() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const hEmail = (event) => { setEmail(event.target.value); }
    const hPw = (event) => { setPw(event.target.value); }

    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pw)
            .then(res => nav("/create", { state: { res: email } }))
            .catch(err => alert("Issue: " + err))
    }
    return (
        <>
            <center>
                <br /><br />
                <h1>Reset Your-Password</h1>
                <form onSubmit={check}>
                    <input type="email" placeholder="Enter your email" onChange={hEmail} />
                    <br /><br />
                    <input type="password" placeholder="Enter your password" onChange={hPw} />
                    <br /><br />
                    <input type="submit" value="Login" name="s" />
                </form>
                <br />
                <button onClick={() => nav(-1)}>Back</button>
            </center>
        </>
    );
}
export default Forgot;