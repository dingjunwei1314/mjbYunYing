export default function formatTime(time){
  if(time==''){
    return time;
  }
  var str=new Date(time)
  var year=str.getFullYear()
  var mouth=(str.getMonth()+1)<10? ('0'+(str.getMonth()+1)):(str.getMonth()+1)
  var day=str.getDay()<10? ('0'+str.getDay()):str.getDay()
  return year+'-'+mouth+'-'+day;
}