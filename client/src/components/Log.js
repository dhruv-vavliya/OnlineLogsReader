import React ,{useEffect ,useRef ,useContext } from 'react';
import '../css/log.css'
import AlertContext from './Alert';

const HOST = 'http://127.0.0.1:80';

export default function AddLog() {

    const newLog = useRef();
    const logs = useRef();
    const show = useContext(AlertContext);
    const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    
    //  fetch logs from server chunkswise
    useEffect( ()=>{

        const fetchLogs = async () => {
            try {
                let offset = 0;
                while( true ){

                    const request = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            offset: offset
                        })
                    };

                    const response = await fetch( `${HOST}/fetchlogs` ,request);
                    let data = await response.json();

                    if( response.status !== 200 ){
                        logs.current.value =  "Please Try Again :(";
                        show('error', "Internal server error :(");
                    } else if( data.isEnd ){
                        break;
                    } else{
                        logs.current.value += data.logs;
                        logs.current.scrollTop = logs.current.scrollHeight;
                    }              

                    offset += 500000;
                }
            } catch(err) {
                show('error', "Refresh and Try again :(");
            }
        }

        fetchLogs();
    } ,[] );


    // push log to server
    const pushLog = ()=>{
        const date = new Date();
        const currentLog = `127.0.0.01:80 - - [${date.getDate() + '/' + month[date.getMonth()] + '/' + date.getFullYear() + ':' + date.getHours() + ':' + date.getMinutes() + ':' +  date.getSeconds() } +0530] "GET/User/Dhruv_Vavliya" -- ${newLog.current.value}"\n`;
        
        if( newLog.current.value == 0 ){
            show('warning', "log is empty :(");
        } else{
            try{
                const pushLogToServer = async ()=>{
                    const request = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            log : currentLog
                        })
                    }

                    const response = await fetch( `${HOST}/pushlog` ,request );
                    if( response.status === 200 ){
                        logs.current.value += currentLog;
                        logs.current.scrollTop = logs.current.scrollHeight;
                        show('success', 'Successfully log added :)');
                    } else{
                        show('error', "Internal server error :(");   
                    }
                }

                pushLogToServer();
            }catch{
                show('error', "Internal server error :(");   
            }
        }
        newLog.current.value = "";
    }

    return (
        <>
            <br/>
            <div className='container' >
                <h3>Add Log</h3>
                <hr/>

                <div className='row container' >
                    <textarea disabled className='col-lg-7 col-md-7' id="logarea" ref={logs} ></textarea>

                    <div className='col-lg-4 col-md-4'>
                        <input id="newlog" type="text" className=" form-control" placeholder="Add New Log" ref={newLog} />
                        <button className="btn btn-primary" id='addlog' type="button" onClick={pushLog}  >
                            <i className="far fa-plus-square"></i> Add a Note
                        </button>
                    </div>
                </div>
                

                <div className='footer'>
                    &copy; 2019-23 Copyright: <a href="./index.html">LogReader.com</a>
                    : By Dhruv_Vavliya
                </div>
            </div>

        </>
    )
}

