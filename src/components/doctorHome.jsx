import React, { useEffect } from 'react'
import Prescription from './prescription'
import { useNavigate } from 'react-router-dom'
import { isDoctor } from '../service/auth'
import { Error404 } from '../service/error404'

export default function doctorHome() {

  

  return (
    <div> {isDoctor() && 
      <div style={{ minHeight: "63vh" }}>
        <Prescription />
      </div>
      }
      {!isDoctor() &&  <Error404/>}
    </div>
  )
};