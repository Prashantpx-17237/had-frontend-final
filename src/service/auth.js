
/***************************** Handle Initial Url ***********************/
export const initUrl = "https://e885-119-161-98-68.ngrok-free.app";


/***************************** Handle isDoctor ***********************/

export function isDoctor(){
    if(localStorage.getItem('id') && localStorage.getItem('type')==="doctor"){
        return true;
    }
    return false;
}

export function isloggedIn(){
    if(localStorage.getItem('id')){
        return true;
    }
    return false;
}
/***************************** Handle Logout ***********************/

export const logout = () => {
    localStorage.clear();
  return ;
}

/*************************** Handle Admin *************************/
export function isAdmin(){
    if(localStorage.getItem('id') && localStorage.getItem('type')==="admin"){
        return true;
    }
    return false;
}
