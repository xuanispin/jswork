document.getElementById('upload').onclick = function(){
    var form = document.getElementById('form');
    var id = new FormData(form);
    var bar = document.getElementById('bar');   // 进度条
    var per = document.getElementById('per');   // 百分比值
    var down = document.getElementById('download'); // 下载地址
    var xhr = new XMLHttpRequest();
    xhr.upload.onprogress = function(e){
        var num = Math.floor(e.loaded / e.total * 100); // 计算百分比
        bar.style.width = num + '%';
        per.innerHTML = num + '%';
    };
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status < 200 || xhr.status >= 300 && xhr.status !== 304){
                throw new Error('文件上传失败，服务器状态异常。');
            }
            var name = xhr.responseText;
            if(name == ''){
                throw new Error('服务器保存文件失败。');
            }
            down.innerHTML = `文件上传成功。<a href=${name}>下载文件${name}</a>`;   // 使用模版字符串和变量替换${}
        }
    };
    xhr.open('POST','/upload');
    xhr.send(fd);
};