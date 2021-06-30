window.addEventListener('DOMContentLoaded', ()=>{
    // UPDATE: I was able to get this working again... Enjoy!

        var cursor = document.querySelector('.cursor');
        var cursorinner = document.querySelector('.cursor2');
        var a = document.querySelectorAll('a');
        let items = document.querySelectorAll('.cb-splitshow-preview');
        let text = cursor.querySelector('span');
        let x;


        items.forEach(item=>{
            console.log(item.dataset.cursorText);
            item.addEventListener('mouseover', (e)=>{
               text.textContent = item.dataset.cursorText;
               cursor.classList.add(`${item.dataset.cursor}`)
            })
            item.addEventListener('mouseout', ()=>{
                text.textContent = '';
                cursor.classList.remove(`${item.dataset.cursor}`)
            })
        })
        document.addEventListener('mousemove', function(e){
            var x = e.clientX;
            var y = e.clientY;
            let cursorPosX = Math.round(cursor.getBoundingClientRect().x);
            let cursorPosY = Math.round(cursor.getBoundingClientRect().y);
            let mousePosX = e.clientX;
            let mousePosY = e.clientY;
               let resultPosX = (mousePosX / cursorPosX);
               let resultPosY = (cursorPosY / mousePosY);
               if(resultPosY < 0.5){
                   resultPosY = 0.5;
               }
               if(resultPosY > 1.9){
                   resultPosY = 1.8;
               }
               if(resultPosX < 1){
                   resultPosX = 1;
               }
               if(resultPosX > 2){
                   resultPosX = 2;
               }
               let translatePos = `translate(calc(${e.clientX}px - 50%)`;
               let calcPos = `calc(${e.clientY}px - 50%)`;
               let rotatePos = `rotate(${resultPosX}deg`;
               let scalePos = `scale(${resultPosX}, ${resultPosY}`;

           


               let activePos =  `${translatePos}, ${calcPos}) ${rotatePos})`;
              
               
               let test = activePos.match(/scale/);
         
               cursor.style.transform = `${activePos}`;

               function end(){
                // resultPosX = 1;
                // resultPosY = 1;
                // scalePos = `scale(${resultPosX}, ${resultPosY}`
                // let passivePos  = `${translatePos}, ${calcPos}) ${rotatePos}) ${scalePos})`;
                // cursor.style.transform = `${passivePos}`
               }
               if (x) clearTimeout(x); 
               x = setTimeout(end, 500); 
        });
      
        document.addEventListener('mousemove', function(e){
            var x = e.clientX;
            var y = e.clientY;
            cursorinner.style.left = x + 'px';
            cursorinner.style.top = y + 'px';

            
        });

        document.addEventListener('mousedown', function(){
            cursor.classList.add('click');
            cursorinner.classList.add('cursorinnerhover')
        });

        document.addEventListener('mouseup', function(){
            cursor.classList.remove('click')
            cursorinner.classList.remove('cursorinnerhover')
        });

        a.forEach(item => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    })

    // Magic animation

        var c = document.getElementById("c");
    var ctx = c.getContext("2d");
    var cH;
    var cW;
    var bgColor = "#FF6138";
    var animations = [];
    var circles = [];

    var colorPicker = (function() {
    // var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
    var colors = ["#1A455E", "#266B88", "#2980B9", "#F44336"];
    var index = 0;
    function next() {
        index = index++ < colors.length-1 ? index : 0;
        return colors[index];
    }
    function current() {
        return colors[index]
    }
    return {
        next: next,
        current: current
    }
    })();

    function removeAnimation(animation) {
    var index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
    }

    function calcPageFillRadius(x, y) {
    var l = Math.max(x - 0, cW - x);
    var h = Math.max(y - 0, cH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
    }

    function addClickListeners() {
    document.addEventListener("touchstart", handleEvent);
    document.addEventListener("mousedown", handleEvent);
    };

    function handleEvent(e) {
        if (e.touches) { 
        e.preventDefault();
        e = e.touches[0];
        }
        var currentColor = colorPicker.current();
        var nextColor = colorPicker.next();
        var targetR = calcPageFillRadius(e.pageX, e.pageY);
        var rippleSize = Math.min(200, (cW * .4));
        var minCoverDuration = 750;
        
        var pageFill = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: nextColor
        });
        var fillAnimation = anime({
        targets: pageFill,
        r: targetR,
        duration:  Math.max(targetR / 2 , minCoverDuration ),
        easing: "easeOutQuart",
        complete: function(){
            bgColor = pageFill.fill;
            removeAnimation(fillAnimation);
        }
        });
        
        var ripple = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: currentColor,
        stroke: {
            width: 3,
            color: currentColor
        },
        opacity: 1
        });
        var rippleAnimation = anime({
        targets: ripple,
        r: rippleSize,
        opacity: 0,
        easing: "easeOutExpo",
        duration: 900,
        complete: removeAnimation
        });
        
        var particles = [];
        for (var i=0; i<32; i++) {
        var particle = new Circle({
            x: e.pageX,
            y: e.pageY,
            fill: currentColor,
            r: anime.random(24, 48)
        })
        particles.push(particle);
        }
        var particlesAnimation = anime({
        targets: particles,
        x: function(particle){
            return particle.x + anime.random(rippleSize, -rippleSize);
        },
        y: function(particle){
            return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
        },
        r: 0,
        easing: "easeOutExpo",
        duration: anime.random(1000,1300),
        complete: removeAnimation
        });
        animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    }

    function extend(a, b){
    for(var key in b) {
        if(b.hasOwnProperty(key)) {
        a[key] = b[key];
        }
    }
    return a;
    }

    var Circle = function(opts) {
    extend(this, opts);
    }

    Circle.prototype.draw = function() {
    ctx.globalAlpha = this.opacity || 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.stroke) {
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.width;
        ctx.stroke();
    }
    if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
    }
    ctx.closePath();
    ctx.globalAlpha = 1;
    }

    var animate = anime({
        duration: Infinity,
        update: function() {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, cW, cH);
            animations.forEach(function(anim) {
            anim.animatables.forEach(function(animatable) {
            animatable.target.draw();
            });
        });
     }
    });

    var resizeCanvas = function() {
        cW = window.innerWidth;
        cH = window.innerHeight;
        c.width = cW * devicePixelRatio;
        c.height = cH * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    (function init() {
    resizeCanvas();
    if (window.CP) {
        // CodePen's loop detection was causin' problems
        // and I have no idea why, so...
        window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
    }
    window.addEventListener("resize", resizeCanvas);
    addClickListeners();
    if (!!window.location.pathname.match(/fullcpgrid/)) {
        startFauxClicking();
    }
        handleInactiveUser();
    })();

    function handleInactiveUser() {
        var inactive = setTimeout(function(){
        fauxClick(cW/2, cH/2);
    }, 2000);
    
    function clearInactiveTimeout() {
        clearTimeout(inactive);
        document.removeEventListener("mousedown", clearInactiveTimeout);
        document.removeEventListener("touchstart", clearInactiveTimeout);
    }
    
        document.addEventListener("mousedown", clearInactiveTimeout);
        document.addEventListener("touchstart", clearInactiveTimeout);
    }

    function startFauxClicking() {
        setTimeout(function(){
        fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
        startFauxClicking();
    }, anime.random(200, 900));
    }

    function fauxClick(x, y) {
        var fauxClick = new Event("mousedown");
        fauxClick.pageX = x;
        fauxClick.pageY = y;
        document.dispatchEvent(fauxClick);
    }
    

})