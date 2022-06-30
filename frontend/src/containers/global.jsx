import React from "react";

import Posts from "../components/dashboard/Post/posts";

function Global(props){
    return (
        <div id="main--container">
        <div className="left">
            <div className="blocks">
                <div className="blocks--user--infos">
                    <img src="https://i.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k" alt="" />
                    <span>Nathan Anderson</span>
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
                <Posts data={props.data} editFunc={props.editFunc} updateFunc={props.updateFunc} cancelFunc={props.cancelFunc}/>
            </div>
        </div>
        <div className="right">
            <div className="blocks"></div>
        </div>
</div>
    )
}

export default Global