(function(window,document,$){
    function Game2048(opt){
        var prefix = opt.prefix, len = opt.len, size = opt.size, margin = opt.margin;
        var score = 0;
        var winNum = 2048;
        var isGameOver = true;
        var board = new board(len);
        var view = new view(prefix, len, size, margin);
        var user = opt.user
        var url = 'http://139.9.81.203:8090/gameRecord/g2048'
        view.init();
        board.onGenerate = function(e){
            view.addNum(e.x, e.y, e.num);
        };
        board.onMove = function(e){
            if(e.to.num >= winNum){
                isGameOver = true;
                setTimeout(function(){ view.win(); }, 300);
            }
            if(e.to.num > e.from.num){
                score += e.to.num;
                view.updateScore(score);
            }
            view.move(e.from, e.to);
        };
        board.onMoveComplete = function(e){
            if(!board.canMove()){
                isGameOver = true;
                // setTimeout(function() { view.over(score); }, 300);
                board.ranklist(url,user,score,view)
            }
            if(e.moved){
                setTimeout(function(){ board.generate(); }, 200);
            }
        };

        $(document).keydown(function(e){
            if(isGameOver){
                return false;
            }
            switch(e.which){
                case 37: board.moveLeft(); break;
                case 38: board.moveUp();   break;
                case 39: board.moveRight(); break;
                case 40: board.moveDown();  break;
            }
        });
        function start(){
            score = 0;
            view.updateScore(0);
            view.cleanNum();
            board.init();
            board.generate();
            board.generate();
            isGameOver = false;
        }
        $('#' + prefix + '_restart').click(start);
        start();
    };
    // 数据处理
    function Board(len){
        this.len = len;
        this.arr = [];
    }
    Board.prototype = {
        // 事件
        onGenerate:function(){},
        onMove:function(){},
        onMoveComplete:function(){},
        // 创建数组
        init: function(){
            for(var arr = [], x = 0, len = this.len; x < len; ++x){
                arr[x] = [];
                for(var y = 0; y <len; ++y){
                    arr[x][y] = 0;
                }
            }
            this.arr = arr;
        },
        // 在随即位置增加一个随机数
        generate: function(){
            var empty = [];
            for(var x = 0, arr = this.arr, len = arr.length; x < len; ++x){
                for(var y = 0; y < len; ++y){
                    if(arr[x][y] === 0){
                        empty.push({x: x, y: y});
                    }
                }
            }
            if(empty.length < 1){
                return false;
            }
            var pos = empty[Math.floor((Math.random() * empty.length))];
            this.arr[pos.x][pos.y] = Math.random() < 0.5 ? 2 : 4;
            this.onGenerate({x: pos.x, y: pos.y, num: this.arr[pos.x][pos.y]});
        },
        // 左移
        moveLeft: function(){
            var canMove = false;
            // 从上到下，从左到右
            for(var x = 0, len = this.arr.length; x < len; ++x){
                for(var y = 0, arr = this.arr[x]; y < len; ++y){
                    // 从y + 1 位置开始，向右查找
                    for(var next = y + 1; next < len; ++next){
                        // 如果next单元格是0，找下一个不是0的单元格
                        if(arr[next] === 0){
                            continue;
                        }
                        // 如果 y 数字是 0;则将 next 移动到 y 位置，然后将 y 减 1 重新查找
                        if(arr[y] === 0){
                            arr[y] = arr[next];
                            this.onMove({from: {x: x, y: next, num: arr[next]}, to: {x: x, y: y, num: arr[y]}});
                            arr[next] = 0;
                            canMove = true;
                            --y;
                            // 如果 y 与 next 单元格数字相等，则将 next 移动并合并给 y
                        } else if(arr[y] === arr[next]){
                            arr[y] += arr[next];
                            this.onMove({from: {x: x, y: next, num: arr[next]}, to: {x: x, y: y, num: arr[y]}});
                            arr[next] = 0;
                            canMove = true;
                        }
                        break;
                    }
                }
            }
            this.onMoveComplete({moved: canMove});
        },
        moveRight: function(){
            var moved = false;
        }
    }
})