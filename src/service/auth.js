
export const initUrl = "http://127.0.0.1:8090";
// I am able to edit this file
export function isDoctor(){
    if(localStorage.getItem('id') && localStorage.getItem('type')==="doctor"){
        return true;
    }
    return false;
}