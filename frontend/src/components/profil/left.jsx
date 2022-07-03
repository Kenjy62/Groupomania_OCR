import React from "react";

function Left(props) {
    console.log(props)
    return (
        props.data? 
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

            {!props? null : props.data.name === props.user.name? <div className="blocks">
                <button style={{width: '100%', marginBottom: 15}}>Modifier le profil</button>
                {!props.user? null : props.user.admin === true? <button>test</button> : null}
            </div>: null}                    
        </div> : null
    )
}

export default Left