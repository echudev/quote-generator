import { useEffect, useState } from "react";
import './GetData.css'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';


export default function GetData() {

    // //conecta a la API usando FETCH
    // const [data, setData] = useState("");
    // const getRandomQuote = async () => {
    //     try {
    //         const response = await fetch('https://api.adviceslip.com/advice');
    //         const json = await response.json();
    //         setData(json.slip.advice)
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    //Conecto a la API utilizando AXIOS
    const [dataAxios, setDataAxios] = useState("");
    const getRandomQuoteAxios = async () => {
        try {
            const response = await axios.get('https://api.adviceslip.com/advice');
            setDataAxios(response.data.slip.advice)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRandomQuoteAxios();
    }, []);

    const [alertClassName, setAlertClassName] = useState ("Alert")
    const copyQuote = () => {
        navigator.clipboard.writeText(dataAxios);

        // alerta de copiado    
        setAlertClassName ("Alert showAlert");
        setTimeout(() => {
            setAlertClassName ("Alert");
        }, 1000);
    }

    const [quoteClass, setQuoteClass] = useState ("quote_container");
    const quoteEffect = () => {
             setQuoteClass("quote_container hide");
             setTimeout(() => {
                 setQuoteClass("quote_container goUp");
             }, 400);
             setTimeout(() => {
                setQuoteClass("quote_container goDown");
            }, 1000);
    }

    const refreshOnClick = () => {
        getRandomQuoteAxios();
        quoteEffect();
    }

    return (
        <>
            <div className={quoteClass}>
                <p className="quote">{dataAxios}</p>
            </div>

            <div className="button_container">
                <Button variant="contained" color="secondary" className="button" onClick={refreshOnClick}>Refresh</Button>
                <Button variant="outlined" color="secondary" className="button" onClick={copyQuote}>Copy</Button>
                <Alert severity="success"className={alertClassName}>Saved to Clipboard</Alert>
            </div>
        </>
    )
}



