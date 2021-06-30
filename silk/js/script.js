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


            //    var x = e.clientX;
            //    var y = e.clientY;
            //    let cursorPos = Math.round(cursor.getBoundingClientRect().x);
            //    let mousePos = e.clientX;
            
            //    let resultPosX = (mousePos / cursorPos);
            //    let resultPosY = (cursorPos / mousePos);
            //    if(resultPosY < 1){
            //        resultPosY = 1;
            //    }
            //    if(resultPosY > 2){
            //        resultPosY = 2;
            //    }
            //    if(resultPosX < 1){
            //        resultPosX = 1;
            //    }
            //    if(resultPosX > 2){
            //        resultPosX = 2;
            //    }
            //    let activePos =  `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%)) rotate(${resultPosX}deg) scale(${resultPosX}, ${resultPosY})`;
            //    let passivePos  =  activePos;
            //    console.log(passivePos)
            //    cursor.style.transform = `${activePos}`;
            //    function end(){
            //        resultPosX = 1;
            //        resultPosY = 1;
                
            //    }
            //    if (x) clearTimeout(x); 
            //    x = setTimeout(end, 400); 
             
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
            // cursor.style.top = `${e.clientY}px`;
            // cursor.style.left = `${e.clientX}px`
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
              
               console.log(activePos)
               let test = activePos.match(/scale/);
               console.log('dfd' + test)
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
})