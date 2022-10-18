import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Dialogue = ({details, showDialogue, setShowDialogue}) => {

//console.log(details.password);
//console.log(details.confirmPassword);

    let colour1="red",colour2="red",colour3="red",colour4="red",colour5="red";
    if(details.password.length >= "8") { 
      colour1="green";
    }
    if(details.password.match(/[A-Z]/)) { 
      colour2="green";
    } 
    if(details.password.match(/[a-z]/)) { 
      colour3="green";
    } 
    if(details.password.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/)) { 
      colour4="green";
    } 
    if(details.password === details.confirmPassword && details.password !== " " ) {
      colour5="green";
    }

    if(details.password && details.password.length >= "8" && details.password.match(/[A-Z]/) && 
      details.password.match(/[a-z]/) && details.password.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) && 
      details.password === details.confirmPassword && details.password !== " ") {
        setShowDialogue(false);
    };

      const style={
        boxShadow:"2px 2px 3px 3px #ccc",
        border:"2px #eee",
        padding:"20px",
        marginTop:"25px"
      }

    return ( 
      <>
        {showDialogue && <div style={style}>
          <p style={{fontWeight:"bold"}}>All checkmarks must turn green, password must have:</p>
          <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour1,fontSize:"20px"}} aria-hidden="true"/> At least 8 characters</p>
          <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour2,fontSize:"20px"}} aria-hidden="true"/> At least 1 uppercase letter</p>
          <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour3,fontSize:"20px"}} aria-hidden="true"/> At least 1 lowercase letter</p>
          <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour4,fontSize:"20px"}} aria-hidden="true"/> At least 1 number or special character</p>
          <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour5,fontSize:"20px"}} aria-hidden="true"/> Password === Confirm Password</p>
        </div>}
      </>
    )
}

export default Dialogue;