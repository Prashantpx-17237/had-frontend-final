import React from "react";
import { isAdmin } from "../service/auth";
import { Error404 } from "../service/error404";

export default function AdminHome(){
    return(

        <div> {isAdmin() && 
            <div style={{ minHeight: "63vh" }}>
              <h1>Admin Home</h1>
            </div>
            }
            {!isAdmin() &&  <Error404/>}
          </div>
    );
}