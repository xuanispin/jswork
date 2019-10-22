function goldbach() {
    var odd = document.getElementById('odd').value
    console.log(odd)
    if(odd%2!==0){
        alert("请输入偶数")
    }
    let goldbach = document.getElementById('goldbach')
    var str =[]
    var a = 0;
    for(var i=2;i<=odd;i++){
        a = 0
        for(var j=2;j<i;j++){
            if(i%j==0){
                a++
            }
        }
        if(a==0){
            str.push(i)
        }
    }
    var str1 = ''
    console.log(odd)
    for(let i=0;i<(str.length)/2;i++){
        console.log(111)
       for(let j=0;j<str.length;j++){
           if((str[i]+str[j])===Number(odd)){
               str1 += odd+"可以拆分为两个质数"+str[i]+"与"+str[j]+"的和\n"
            
           }
       }
    }
    goldbach.innerText = str1
   
}
