import React from 'react'

const ErrorComp = () => {

    throw new Error("haha Error occured");

    return (
        <div>errorComp</div>
    )
}

export default ErrorComp