import React from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert';
import axios from 'axios';


function ConsentHistory (props) {

/******************************** Asks for data from backend then will display the previous records ********************/

    const handleClick = async (event) => {
        event.preventDefault();
        swal({
            title: "Tere liye message",
            text: "Kya chutiya kam diya hai bsdk",
            icon: "success",
            buttons: "Chal bsdk"
        });

        try {
            const response =  axios("/visit", {props});
        } catch (error) {            
        }
    
    };


    return (
    <div>
        <button type='button' className='btn btn-info' onClick={handleClick} style={{width:"80%"}}>View Previous Records</button>
    </div>
  )
}

ConsentHistory.propTypes = {}

export default ConsentHistory
