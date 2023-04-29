
export const initUrl = "https://e885-119-161-98-68.ngrok-free.app";
// I am able to edit this file
export function isDoctor(){
    if(localStorage.getItem('id') && localStorage.getItem('type')==="doctor"){
        return true;
    }
    return false;
}