import React, { useEffect, useState } from "react";

const Tchat = ({ messages }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [adminMessage, setAdminMessage] = useState()

    useEffect(() => {
        if (messages != undefined || messages != null) {
            setAdminMessage(messages)
            setIsLoading(true)
        }
    }, [messages])


    return (
        <div>
            <h3>messages : </h3>
            { isLoading && (
                Object.values(adminMessage).map((adminMessage, key) => {
                    return (
                        <div key={key}>
                            <span className="arrow">→</span>
                            <span className="tild">~</span>
                            <span className="message">{adminMessage}</span>
                        </div>
                    )
                })
            )}
        </div>
    )

};

export default Tchat;