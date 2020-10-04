import React, { useEffect, useState } from "react";

const Tchat = ({ messages }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [adminMessages, setAdminMessages] = useState()

    useEffect(() => {
        if (messages != undefined || messages != null) {
            setAdminMessages(messages)
            setIsLoading(true)
        }
    }, [messages])

    return (
        <div className="tchat">
            <h3>messages : </h3>
            <div className="messages">
                {isLoading && (
                    Object.values(adminMessages).map((adminMessage, key) => {
                        return (
                            <div className="message" key={key}>
                                <span className="arrow">→</span>
                                <span className="tild">~</span>
                                <span className="txt">{adminMessage}</span>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )

};

export default Tchat;