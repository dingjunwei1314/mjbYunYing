export default function formatTime(time = ''){
  
  if(!time){
    return '';
  }
  var str=new Date(time)
  var year=str.getFullYear()
  var mouth=(str.getMonth()+1)<10? ('0'+(str.getMonth()+1)):(str.getMonth()+1)
  var day=str.getDate()<10? ('0'+str.getDate()):str.getDate()
  return year+'-'+mouth+'-'+day;
}