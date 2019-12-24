<template>
    <div class="content-xu">
        <audio src ="http://ws.stream.qqmusic.qq.com/C40000249jt23Gt2LA.m4a?guid=1557169861&vkey=AB654308C8B4A1EE600FC3536CE2D4A90796C19AB05D9374ABF9050F01E2731A060D7D10BB6B68EA8F9C9654ADF059FCA17B6A4FA516FBAB&uin=0&fromtag=66" autoplay loop></audio>
        <div id="textCon" class="textCon">
            <div class="words">张小进,今天是认识你的第</div>
            <div class="days">
                <span class="days-number"></span>&nbsp;&nbsp;<span class="days-label">天</span>
            </div>
            <br />
            <div class="seconds"></div>
        </div>
        <div class="heart"></div>

    </div>
</template>

<script>
    // require('./index')
    // require('./love')
    export default {
        components: {},
        data() {
            return {
                arr: "2019-10-25 00:00:00".split(/[- :]/),//改这里
                box: '',
            }
        },
        mounted() {
            window.setInterval(this.timer_start,1000);
            this.timer_start();
            this.init();

            require('./love')

        },
        methods: {
            init() {
                this.box = document.getElementById('textCon')
                var width = this.box.offsetWidth;
                var count = parseInt(width / 50 * 5);
                for (var i = 0; i < count; i++) {
                    var size = parseInt(this.ran(60, 120) / 10);
                    var ele = document.createElement('div');
                    ele.classList.add('item');
                    ele.style.width = size + 'px';
                    ele.style.height = size + 'px';
                    ele.style.left = this.ran(0, 95) + '%';
                    ele.style.top = this.ran(20, 80) + '%';
                    ele.style.animationDelay = this.ran(0, 30) / 10 + 's';
                    this.box.appendChild(ele);
                }
            },
            ran(min, max) {
                min = parseInt(min);
                max = parseInt(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            timer_start(){

                var start_time = new Date(this.arr[0], this.arr[1]-1, this.arr[2], this.arr[3], this.arr[4], this.arr[5]);
                // var start_time =  new Date(beginTime);
                // var start_time = Date.parse(beginTime);
                var duration = parseInt(new Date()- start_time)/1000;
                var seconds = parseInt( duration % 60);
                if (seconds < 10)
                    seconds = "0" + seconds;
                duration = parseInt(duration / 60);
                var minutes = duration % 60;
                if (minutes < 10)
                    minutes = "0" + minutes;
                duration = parseInt(duration / 60);
                var hours = duration % 24;
                if (hours < 10)
                    hours = "0" + hours;
                duration = parseInt(duration / 24);
                var days = duration;
                document.getElementsByClassName('days-number')[0].innerHTML = ("" +days);
                document.getElementsByClassName('seconds')[0].innerHTML = ("圣诞节快乐！");
            },


        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding:0;
    }
    html,body{
        width:100%;
        height:100%;
        /*text-align: center;*/
        background-color: #ffc5b3;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background-image: radial-gradient(#ffeded, #ffc7c7);
    }
    .textCon{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width:700px;
        height:60px;
        margin:50px auto;
    }
    .text{
        font-size:48px;
    }
    .heart{
        width:80px;
        height:80px;
        background-color:#cc2a5d;
        margin:200px auto;
        position: relative;
        transform: rotate(45deg);
        animation: heart 1s ease-in infinite;
    }
    .heart::before,
    .heart::after{
        content:'';
        width:100%;
        height:100%;
        background-color:#cc2a5d;
        border-radius: 50%;
    }
    .heart::before{
        position: absolute;
        top:0;
        left:0;
        transform: translateX(-50%);
    }
    .heart::after{
        position: absolute;
        top:0;
        left:0;
        transform: translateY(-50%);
    }
    @keyframes heart{
        0%{
            transform: scale(0.8) rotate(45deg);
            opacity: 0.8;
        }
        50%{
            transform: scale(1) rotate(45deg);
            opacity: 1;
        }
        100%{
            transform: scale(0.8) rotate(45deg);
            opacity: 0.8;
        }
    }
    .textCon .item{
        position: absolute;
        opacity: 0;
        background-color:#cc2a5d;
        transform: rotate(45deg);
        animation: hearts 3s ease-in infinite;
    }
    .textCon .item::before,
    .textCon .item::after{
        content:'';
        width:100%;
        height:100%;
        background-color:#cc2a5d;
        position: absolute;
        top:0;
        left:0;
        border-radius: 50%;
    }
    .textCon .item::before{
        transform: translateX(-50%);
    }
    .textCon .item::after{
        transform: translateY(-50%);
    }
    @keyframes hearts{
        0%{
            opacity: 0;
            transform: translateY(0%) rotate(45deg);
        }
        20%{
            opacity: 0.8;
            transform: translateY(-20%) rotate(45deg);
        }
        100%{
            opacity: 0;
            transform: translateY(-1000%) rotate(45deg);
        }
    }
    .days-label {
        font-size: 30px;
    }

    .seconds {
        margin-top: 10px;
        font-size: 32px;
        font-family: "Monda_bo", Georgia, sans-serif;
        width: auto;
        text-align: center;
    }

    .seconds-label {
        margin-top: 32px;
        font-size: 32px;
        font-family: "Monda_no", Georgia, sans-serif;
        width: auto;
        text-align: center;
    }

    .container {
        position: absolute;
    }
    .days {
        font-size: 40px;
        width: auto;
        text-align: center;
    }
    .words {
        font-size:40px;
        font-family: 'Regular', cursive;
        width: auto;
        text-align: center;
    }
</style>
