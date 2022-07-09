export function Logged(){
    let test = localStorage.getItem('token')
    if(test){
        return true
    } else {
        return false
    }
}