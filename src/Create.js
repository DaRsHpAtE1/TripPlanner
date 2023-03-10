import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { set, ref, get, child } from "firebase/database";
import db from "./FirebaseConfig"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Create() {
    const auth = getAuth();
    let userId;
    let uid;
    async function getUserId() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    uid = user.uid;
                    resolve(uid)
                } else {
                    window.location = '/login';
                }
            });
        });
    }
    getUserId().then(userId = data => { console.log(data) })

    const [name, setName] = useState("");
    const [destination, setDestination] = useState("");
    const nav = useNavigate();

    const hName = (event) => { setName(event.target.value); }
    const hDestination = (event) => { setDestination(event.target.value); }

    const save = (event) => {
        event.preventDefault();
        let r1 = ref(db);
        get(child(r1, "user/" + name))
            .then((ss) => {
                if (ss.exists()) {
                    alert(name + " already exists!")
                    setName("");
                    setDestination("");
                }
                else {
                    let r2 = ref(db, "/user/" + name)
                    let data = { name, destination };
                    set(r2, data);
                    alert("Record Created!")
                    setName("");
                    setDestination("");
                }
            })
            .catch(err => console.log(err))

    }
    const logout = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signOut(auth)
            .then(res => nav("/login"))
            .catch(err => alert("Issue: " + err))
    }
    const display = (event) => {
        event.preventDefault();
        nav("/display")
    }
    return (
        <>
            <center>

                <h1>Plan Your Itenary</h1>

                <form onSubmit={save}>

                    <input type="text" placeholder="Enter your name" onChange={hName} value={name} />
                    <br /><br />
                    <input type="text" placeholder="Destination to visit" onChange={hDestination} value={destination} />
                    <br /><br />
                    <input type="submit" />
                    <br /><br />
                </form>
                <form onSubmit={logout}>
                    <input type="submit" value="Logout" />
                </form> <br />
                <form onSubmit={display}>
                    <input type="submit" value="Display" />
                </form> <br />
            </center>
        </>
    )
}
export default Create;