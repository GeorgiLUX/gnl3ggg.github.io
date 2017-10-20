<script>
var set=0;
function animatescroll(x,y){
if(set==0){
var val71=x/500;
var val72=0;
var val73=0;
var setin=0;
set=1;
var interval=setInterval(function(){
if(setin==0){
val72++;
val73+=x/500;
if(val72==500){
val73=0;
interval=clearInterval(interval);
}
document.getElementById(y).scrollTop=val73;
}
},1);
}
}
</script>