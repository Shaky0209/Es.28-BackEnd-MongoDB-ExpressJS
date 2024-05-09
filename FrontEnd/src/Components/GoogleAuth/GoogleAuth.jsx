import React from 'react'

export default function GoogleAuth() {

    const googleAccess = ()=>{
        const str = "http://òpcaòjpst_3001/log/google/login";
        window.open(str, "_self");
    }

    return (<button onClick={googleAccess} >GoogleAuth</button>);
}
