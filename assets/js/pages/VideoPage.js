import React, { useState, useContext, useEffect, useRef } from "react";
import ReactPlayer from 'react-player';
import firebase from "../firebase";

const VideoPage = () => {
    const [url, setUrl] = useState("http://4graphik.com/codecamp/app/video/mt.mp4")
    const db = firebase.firestore();
    const playerRef = useRef()
    const [playing, setPlaying] = useState(false)
    const [controls, setControls] = useState(false)

    useEffect(() => {
        fetchVideo()
    }, [playing])

    const fetchVideo = async () => {
        db.collection("video").onSnapshot((snapshot) => {
            snapshot.forEach(async (doc) => {
                const data = doc.data()
                setPlaying(data.playing)
                setControls(data.controls)
            })
        })
    }

    return (
        <div className="videoPage">
            <ReactPlayer
                ref={playerRef}
                className='react-player'
                width='100%'
                height='100%'
                url={url}
                playing={playing}
                controls={controls}
            />
        </div>
    )
}

export default VideoPage;