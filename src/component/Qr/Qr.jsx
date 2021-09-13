import React, {useState} from 'react';
import QrReader from 'react-qr-scanner';



function QrScanner({result,setResult}){
    const [delay,setDelay] = useState(100)
    const previewStyle = {
        height:240,
        width:320
    }
    const handleScan =(data)=>{
        if(data !==null){
            setResult(data.text)
        }
    }
    const handleError = (err)=>{
        console.log(err)
    }
    return(
        <>
            <QrReader
                style={previewStyle}
                delay={delay}
                onError={handleError}
                onScan={handleScan}
                />
                <div>{result}</div>
        </>
    )
}



export default QrScanner