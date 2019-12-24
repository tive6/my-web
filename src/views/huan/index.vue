<template>
    <div class="content-huan container">
        <div class="content">
            <h1 class="h1">小欢欢 O^_^O</h1>
            <a href="/huan" class="link">♥^♥</a>
        </div>
        <canvas id="heart" class="canvas"></canvas>
        <!-- <audio src="./mySky.mp3" autoplay="true" loop> -->
        <audio src="http://q30hv1n99.bkt.clouddn.com/%E7%9B%97%E5%B0%86%E8%A1%8C.mp3" autoplay loop>
            您的浏览器不支持 audio 标签。
        </audio>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        mounted() {

            window.requestAnimationFrame =
                window.__requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (function () {
                    return function (callback, element) {
                        var lastTime = element.__lastTime;
                        if (lastTime === undefined) {
                            lastTime = 0;
                        }
                        var currTime = Date.now();
                        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                        window.setTimeout(callback, timeToCall);
                        element.__lastTime = currTime + timeToCall;
                    };
                })();
            window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(((navigator.userAgent || navigator.vendor || window.opera)).toLowerCase()));
            var loaded = false;
            var init = function () {
                if (loaded) return;
                loaded = true;
                var mobile = window.isDevice;
                // var koef = mobile ? 0.5 : 1;
                var koef = 1;
                var canvas = document.getElementById('heart');
                var ctx = canvas.getContext('2d');
                var width = canvas.width = koef * innerWidth;
                var height = canvas.height = koef * innerHeight;
                var rand = Math.random;
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fillRect(0, 0, width, height);

                var heartPosition = function (rad) {
                    //return [Math.sin(rad), Math.cos(rad)];
                    return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
                };
                var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
                    return [dx + pos[0] * sx, dy + pos[1] * sy];
                };

                window.addEventListener('resize', function () {
                    width = canvas.width = koef * innerWidth;
                    height = canvas.height = koef * innerHeight;
                    ctx.fillStyle = "rgba(0,0,0,1)";
                    ctx.fillRect(0, 0, width, height);
                });

                var traceCount = mobile ? 20 : 50;
                var pointsOrigin = [];
                var i;
                var dr = mobile ? 0.3 : 0.1;
                for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
                for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
                for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
                var heartPointsCount = pointsOrigin.length;

                var targetPoints = [];
                var pulse = function (kx, ky) {
                    for (i = 0; i < pointsOrigin.length; i++) {
                        targetPoints[i] = [];
                        targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
                        targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
                    }
                };

                var e = [];
                for (i = 0; i < heartPointsCount; i++) {
                    var x = rand() * width;
                    var y = rand() * height;
                    e[i] = {
                        vx: 0,
                        vy: 0,
                        R: 2,
                        speed: rand() + 5,
                        q: ~~(rand() * heartPointsCount),
                        D: 2 * (i % 2) - 1,
                        force: 0.2 * rand() + 0.7,
                        f: "hsla(0," + ~~(40 * rand() + 60) + "%," + ~~(60 * rand() + 20) + "%,.3)",
                        trace: []
                    };
                    for (var k = 0; k < traceCount; k++) e[i].trace[k] = {x: x, y: y};
                }

                var config = {
                    traceK: 0.4,
                    timeDelta: 0.01
                };

                var time = 0;
                var loop = function () {
                    var n = -Math.cos(time);
                    pulse((1 + n) * .5, (1 + n) * .5);
                    time += ((Math.sin(time)) < 0 ? 9 : (n > 0.8) ? .2 : 1) * config.timeDelta;
                    ctx.fillStyle = "rgba(0,0,0,.1)";
                    ctx.fillRect(0, 0, width, height);
                    for (i = e.length; i--;) {
                        var u = e[i];
                        var q = targetPoints[u.q];
                        var dx = u.trace[0].x - q[0];
                        var dy = u.trace[0].y - q[1];
                        var length = Math.sqrt(dx * dx + dy * dy);
                        if (10 > length) {
                            if (0.95 < rand()) {
                                u.q = ~~(rand() * heartPointsCount);
                            }
                            else {
                                if (0.99 < rand()) {
                                    u.D *= -1;
                                }
                                u.q += u.D;
                                u.q %= heartPointsCount;
                                if (0 > u.q) {
                                    u.q += heartPointsCount;
                                }
                            }
                        }
                        u.vx += -dx / length * u.speed;
                        u.vy += -dy / length * u.speed;
                        u.trace[0].x += u.vx;
                        u.trace[0].y += u.vy;
                        u.vx *= u.force;
                        u.vy *= u.force;
                        for (k = 0; k < u.trace.length - 1;) {
                            var T = u.trace[k];
                            var N = u.trace[++k];
                            N.x -= config.traceK * (N.x - T.x);
                            N.y -= config.traceK * (N.y - T.y);
                        }
                        ctx.fillStyle = u.f;
                        for (k = 0; k < u.trace.length; k++) {
                            ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
                        }
                    }
                    //ctx.fillStyle = "rgba(255,255,255,1)";
                    //for (i = u.trace.length; i--;) ctx.fillRect(targetPoints[i][0], targetPoints[i][1], 2, 2);

                    window.requestAnimationFrame(loop, canvas);
                };
                loop();
            };

            var s = document.readyState;
            if (s === 'complete' || s === 'loaded' || s === 'interactive') init();
            else document.addEventListener('DOMContentLoaded', init, false);

        },
        methods: {}
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .canvas,
    .content{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .content{
        z-index: 999;
    }
    .h1{
        font-size: 3em;
        text-align: center;
        color: pink;
        padding: 100px 0 50px;
    }
    .link{
        display: block;
        width: 120px;
        height: 120px;
        line-height: 122px;
        font-size: 30px;
        margin: 0 auto;
        text-align: center;
        background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        border: 1px solid pink;
        border-radius: 50%;
        box-shadow: 0 0 20px papayawhip;
        animation:zooms 2s ease-in-out infinite alternate;
        /*Safari 和 Chrome:*/
        -webkit-animation:zooms 2s ease-in-out infinite alternate;
        transform: scale(1);
        background-color: red; /* 浏览器不支持的时候显示 */
        background-image: radial-gradient(circle, red, yellow, green); /* 标准的语法（必须放在最后） */
    }
    @keyframes zooms
    {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.5);
        }
    }

    /*Safari 和 Chrome:*/
    @-webkit-keyframes zooms
    {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.5);
        }
    }
</style>
