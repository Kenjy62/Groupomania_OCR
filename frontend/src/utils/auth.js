export function Logged(){
    let test = localStorage.getItem('token')
    if(test != null){
        return true
    } else {
        return false
    }
}