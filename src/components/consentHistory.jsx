import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert';
import axios from 'axios';
import ConsentRequest from './ConsentRequest';


const ConsentHistory = ({ data }) => {

  return (
    <div>
      {data && data.consentRequests.consentRequest.map(consentRequest => {
        return (
          <div key={consentRequest.id}>
            <ConsentRequest
              request={consentRequest} />
          </div>
        )
      })}
    </div>
  )

}

export default ConsentHistory;
