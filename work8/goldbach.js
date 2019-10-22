function suShu(num){
    var sum=0;
    for(var d=1;d<=num;d++){
        if(num % d==0){
            sum++;
        }
    }
    if (sum==2){
        return true;
    }else{
        return false;
    }
}
for(var b=2;b<alert;b++){
    var c=a-b;
    if(suShu(b) && suShu(c) && b<=c){
        console.log("偶数"+a+"可以拆分为素数"+b+"+"+c);
    }
}