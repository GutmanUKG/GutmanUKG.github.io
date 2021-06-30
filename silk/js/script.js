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

           


               let activePos =  `${translatePos}, ${calcPos}) ${rotatePos}) ${scalePos})`;
              
               
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


    // let silkBg = document.querySelector('.silk_bg');
    // let rowBg = document.createElement('div');
    // rowBg.classList.add('row_bg');
    

    // let countRow = silkBg.scrollHeight / 50;
    // let countWidth = silkBg.clientWidth / 50;
    // console.log(countRow)
    // console.log(countWidth)
    // for(let i = 0; i <= Math.round(countRow); i++){ 
    //     silkBg.appendChild(rowBg.cloneNode(true))
    // }
    // let ax = Math.round(countWidth);
    // let by = Math.round(countRow)
    // let randomScale = function(ax , by){
    //     return Math.random() * (Math.round(ax - by)- Math.round(ax + by))
    // }
    // console.log(randomScale(ax, by))
    // silkBg.addEventListener('click', ()=>{
    //     let rows = document.querySelectorAll('.row_bg');

    //     function anim(){
    //         for(let i = 0; i <= rows.length; i++) {
    //             let posScale = Math.round(randomScale(ax, by));
    //             rows[i].style.transform = `translate(100%, 0%) rotate(${posScale}deg)`;
    //             rows[i].style.transition = (i *100) +'ms';
    //         }
    //     }
    //     rows.forEach(item => {
    //         item.addEventListener('click', anim())
    //     })
    // })
})