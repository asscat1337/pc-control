import React, {useState} from 'react';
import QrReader from 'react-qr-reader';



function QrScanner({result,setResult}){
    const [delay,setDelay] = useState(100)
    const previewStyle = {
        height:320,
        width:320
    }
    const handleScan=(data)=>{
        if(data){
            console.log(data)
            setResult(data)
        }
    }
    const handleError = (err)=>{
        console.log(err)
    }
    return(
        <>
            <QrReader
                delay={delay}
                onError={handleError}
                onScan={handleScan}
                style={previewStyle}
                />
                <div>{result}</div>
        </>
    )
}



export default QrScanner