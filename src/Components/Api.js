import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Api() {

    const [data, setData] = useState([])
    let baseUrl = "https://randomuser.me/api"

    // Create a common funtionof API
    const getApi = async () => {
        return await axios.get(baseUrl)
    }

    // Called API on Page load
    useEffect(() => {
        let mounted = true;
        getApi().then((res) => {
            if(mounted) {
                setData(res.data.results)
              }
        }).catch((err) => {
            console.log(err, "Having Some Error");
        })
        return () => mounted = false;
    }, [])

    //Refresh Button Function.
    const refreshData = () => {
        getApi().then((res) => {
            setData(res.data.results)
        }).catch((err) => {
            console.log(err, "Having Some Error");
        })
    }

    // Styled for refresh button
    const refreshButton = {
        backgroundColor: "#4CAF50",
        border: "none",
        color: "white",
        padding: "15px 32px",
        textAlign: "center",
        fontSize: "16px",
        margin: "4px 2px",
        cursor: "pointer"
    }

    return (
        <div>
            <button onClick={refreshData} style={refreshButton}> Refresh Data</button>
            <table>
                <tbody>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                    </tr>
                </tbody>
                {
                    data.map((i, key) => {
                        return <tr key={key}>
                            <td>{`${i.name['title']}` + " " + `${i.name['first']}` + " " + `${i.name['last']}`}</td>
                            <td>{i.email}</td>
                        </tr>
                    })
                }
            </table>
        </div>
    )
}
export default Api
