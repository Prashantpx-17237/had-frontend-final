import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { initUrl } from "../service/auth";

export default function FrontDeskList(props) {
    const {patList}=props;
  return (
    <div className="col-md-8" style={{margin:"1rem auto"}}>
        <hr />
        <h2>New Registered Patients</h2> 
        <hr />
        <div style={{height:"300px",overflow:"auto"}}>
        <table class="table">
      <thead class="thead-light bg-dark" style={{color:"white"}}>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">VisitId</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Age</th>
          <th scope="col">ABHA ID</th>
          <th scope="col">ABHA Number</th>
          <th scope="col">Mobile</th>
        </tr>
      </thead>
      <tbody>
        {patList.map((ele,index)=>{
            return(        <tr>
                <td>{index+1}</td>
                <td>{ele.visitId}</td>
                <td>{ele.name}</td>
                <td>{ele.gender}</td>
                <td>{ele.age}</td>
                <td>{ele.abha_id}</td>
                <td>{ele.abha_number}</td>
                <td>{ele.mobile}</td>
              </tr>)
        })}
      </tbody>
    </table>
    </div>
    </div>
  );
}
