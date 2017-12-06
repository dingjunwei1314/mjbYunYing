export default function formatTime(time){
  if(typeof time != 'object'){
    return;
  }
  var year=time.getFullYear()
  var mouth=(time.getMonth()+1)<10? ('0'+(time.getMonth()+1)):(time.getMonth()+1)
  var day=time.getDay()<10? ('0'+time.getDay()):time.getDay()
  return year+'-'+mouth+'-'+day;
}