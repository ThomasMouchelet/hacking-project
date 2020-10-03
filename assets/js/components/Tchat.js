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
            <h1>Tchat</h1>
            { isLoading && (
                Object.values(adminMessage).map((adminMessage, key) => {
                    return (
                        <div key={key}>
                            {adminMessage}
                        </div>
                    )
                })
            )}
        </div>
    )

};

export default Tchat;