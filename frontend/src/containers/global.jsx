import React from "react";

import Posts from "../components/dashboard/Post/posts";

function Global(props){
    return (
        <div id="main--container">
            <div className="left">
                <div className="blocks">
                    <div className="blocks--user--infos">
                        <img src={props.data? props.data.avatar : null}/>
                        <span>{props.data? props.data.name + ' ' + props.data.lastName : null}</span>
                        <span>{!props.data? null : props.data.admin === true? 'Vous êtes admin': null}</span>
                        <span style={{color: 'grey'}}>@andersonN</span>
                        <span>Lille, France</span>
                    </div>
                    <div className="blocks--user--stats">
                        <span style={{color: 'grey'}}>Posts <br/> <font style={{color: 'white'}}>147</font></span>
                        <span style={{color: 'grey'}}>Abonnés <br/> <font style={{color: 'white'}}>5</font></span>
                        <span style={{color: 'grey'}}>Abonnement <br/> <font style={{color: 'white'}}>15</font></span>
                    </div>
                </div>
            </div>
            <div className="center">
                <div className="blocks">
                    {props.option === 'details'? <Posts data={props.data} editFunc={props.editFunc} updateFunc={props.updateFunc} cancelFunc={props.cancelFunc} option='details'/> : <Posts data={props.data} editFunc={props.editFunc} updateFunc={props.updateFunc} cancelFunc={props.cancelFunc} option='feed'/>}
                </div>
            </div>
            <div className="right">
                <div className="blocks"></div>
            </div>
        </div>
    )
}

export default Global