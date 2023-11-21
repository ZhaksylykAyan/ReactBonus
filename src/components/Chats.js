import React, {useRef, useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {ChatEngine} from "react-chat-engine";
import {auth} from "firebase";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
    const history = useHistory()
    const {user} = useAuth()
    const [loading, setLoading] = useState(true)
    // console.log(user)
    const handleLogOut = async () => {
        await auth.signOut()

        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if (!user) {
            history.push('/')
            return;
        }
        axios.get('http://api.chatengine.io/users/me', {
            headers: {
                "project-id": "a9116fc1-efa3-4346-b1e3-f0ad552ffe7a",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then(() => {
            setLoading(false)
        })
            .catch(() => {
                let formdata = new FormData()
                formdata.append('email', user.email)
                formdata.append('username', user.displayName)
                formdata.append('secret', user.uid)
                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name)

                        axios.post('http://api.chatengine.io/users',
                            formdata,
                            {headers: {"private-key": "2879334a-1940-4fda-bad9-9aa27567fd88"}})
                    })
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
            })
    }, [user, history])

    if (!user || loading) return 'Loading...'

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className={"logo-tab"}>
                    MyChat
                </div>
                <div onClick={handleLogOut} className="logout-tab">
                    LogOut
                </div>
            </div>
            <ChatEngine height="calc(100vh- 66px)"
                        projectID="a9116fc1-efa3-4346-b1e3-f0ad552ffe7a"
                        userName={user.email}
                        userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;