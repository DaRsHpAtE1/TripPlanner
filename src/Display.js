import db from "./FirebaseConfig"
import { get, ref, child, remove } from "firebase/database";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Display() {
    const [info, setInfo] = useState([]);
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
    useEffect(() => {
        let r = ref(db);
        get(child(r, "user/"))
            .then((ss) => {
                if (ss.exists()) {
                    setInfo([]);
                    let data = ss.val();
                    console.log('Data: ', data)
                    Object.values(data).map((d) => {
                        setInfo((olddata) => [...olddata, d]);
                    });
                    console.log('Info: ', info)
                }
                else {
                    console.log("No data found!")
                }
            })
            .catch(err => console.log(err));
    }, []);
    const Delete = (name) => {
        let r = ref(db);
        get(child(r, "user/"))
            .then((ss) => {
                if (ss.exists()) {
                    let data = ss.val();
                    Object.values(data).map((d) => {
                        if (d.name === name) {
                            remove(child(r, "user/" + d.name))
                                .then(() => {
                                    alert("Deleted Successfully");
                                    window.location.reload();
                                })
                                .catch(err => console.log(err));
                        }
                    });
                }
            });
    };
    const nav = useNavigate();

    return (
        <>
            <center>
                <h1>Home</h1>
                <center>
                    <table border="5" style={{ width: '70%' }}>

                        <tr>
                            <th>Name</th>
                            <th>Destination</th>

                        </tr>
                        {
                            info.map((e => <tr style={{ "text-align": "center" }}>

                                <td>{e.name}</td>
                                <td>{e.destination}</td>
                                <td><button onClick={() => Delete(e.name)}>Delete</button></td>

                            </tr>
                            ))
                        }
                    </table>
                    <br /><br />
                    <button onClick={() => nav(-1)}>Back</button>

                </center>
            </center>
        </>
    )

}
export default Display;