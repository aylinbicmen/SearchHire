export function formatDateToString(date:Date) {
    let YY = date.getFullYear();

    let dd = (date.getDate() < 10 ? '0' : '')
        + date.getDate();
 
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '')
        + (date.getMonth() + 1);
    
    let hh = ((date.getHours() < 10 ? '0' : ''))
        + date.getHours();

    let mm = (date.getMinutes() < 10 ? '0' : '')
        + date.getMinutes();    

    return YY+'-'+MM+'-'+dd+'T17:'+hh+":"+mm;
}