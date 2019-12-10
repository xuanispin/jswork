
let d = h = m = s = 0;
let id = setInterval(seckill, 1000);

function seckill(){
    let nowtime = new Date();
    let min = parseInt(nowtime.getMinutes());
    let sec = parseInt(nowtime.getSeconds());
    if(min>=0&&sec>=0){
        m = parseInt(60 - min);
        s = parseInt(60 - sec);
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
    
    }
    document.getElementById('d').innerHTML = d + '天';
    document.getElementById('h').innerHTML = h + '时';
    document.getElementById('m').innerHTML = m + '分';
    document.getElementById('s').innerHTML = s + '秒';
}