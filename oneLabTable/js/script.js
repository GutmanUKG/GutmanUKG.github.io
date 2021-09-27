document.addEventListener('DOMContentLoaded', ()=>{
    let daysWrapper = document.querySelector('.days');
    let content = document.querySelector('.content');
    let monthTitle = document.querySelector('.month');
    let selectStartDay = document.querySelector('.startDay');
    let selectEndDay = document.querySelector('.endDay');
    let eventItem = document.querySelectorAll('.event');
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let currentDate = date.getDate();
    let fullMonthDays =  getDaysInMonth(currentMonth,currentYear);

 
    // формирование календаря
    let monthList = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth()  === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      
      }


      fullMonthDays.forEach(item=>{
          let element = document.createElement('div');
          element.classList.add('day')
          element.textContent = item.getDate();
          daysWrapper.appendChild(element);
          if(item.getDay() == 0 || item.getDay() == 6){
              element.classList.add('weekend')
          }
          if(element.textContent == currentDate){
            //   element.classList.add('active')
          }
      })

  

      for(let i = 0; i < monthList.length; i++){
          monthTitle.textContent = monthList[currentMonth];
      }

  
    //   Выходные дни

    function checkDate(days){
        let [day, month, year] = days.split('.');

        let date = new Date(year, month - 1, day);

        return (date.getDate() == 0 || date.getDate() == 6);
    }
    
    

    //   Позиция элемента исходя из даты начала и окончания активности

  

    // Получение дат и вычисление их позиции
    let obj = [];
    let obj2 = [];
    async function positionDay(){
        let days = document.querySelectorAll('.day');
        let eventTitle = document.querySelectorAll('.event_title');
    
        for(let i = 0; i < days.length; i++){
            var day = new Object({
                content: days[i].textContent,
                positionStart: days[i].getBoundingClientRect().x,
            });
            obj.push(day);
        }
      

       
        for(let b = 0; b < 31; b++){
         let dataStart = eventItem[b].dataset.start.split('-');
         let dataEnd = eventItem[b].dataset.end.split('-')
            a = parseInt(dataStart[2]); //дата начала
            i = parseInt(dataEnd[2]); // дата окончания
            c = parseInt(obj[dataStart[2]].content) - 1;  // числа календаря

            // вычисление начальной позиции элемента и его ширины
            // eventItem[b].classList.add('active')
            eventItem[b].style.left = obj[c].positionStart -560 + 'px';
            let elWidth = obj[dataEnd[2]].positionStart -  obj[c].positionStart;
            // eventItem[b].style.maxWidth = elWidth + 20 + 'px';      
            eventItem[b].style.width = elWidth + 20 + 'px';    
        //    раположение элемента относительно высоты задач расположенных слева
            eventItem[b].style.top = eventTitle[b].getBoundingClientRect().y - 130 + 'px';           
        }
    }
    positionDay()

    let dragLink = document.querySelectorAll('.event');
    let addWidth = document.querySelectorAll('.width_el');
    let calendar = document.querySelector('.calendar');
    // перетаскивание 
     // Перетаскивание

     let dropElements = document.querySelectorAll('.event');

     dropElements.forEach((item,id)=>{
         let dropEl = item.querySelector('.drop_el');
         
         dropEl.onmousedown = function(event){
 
             dropEl.parentNode.style.zIndex = 1000;
             dropEl.parentNode.style.position = 'absolute';
            calendar.append(dropEl.parentNode);
 
             moveAt(event.pageX, event.pageY);
             
             function moveAt(pageX,pageY){
                 dropEl.parentNode.style.left = pageX - (dropEl.parentNode.offsetWidth / 2) + 'px';
                 dropEl.parentNode.style.top = pageY - dropEl.parentNode.offsetHeight / 2  + 'px';
                 item.classList.add('drop');
                 item.classList.add('active_event');
                 parseElements();
             }
 
             function onmouseMove(event){
                 moveAt(event.pageX, event.pageY);
             }
 
             calendar.addEventListener('mousemove',onmouseMove);
 
             dropEl.parentNode.onmouseup = function (){
                 calendar.removeEventListener('mousemove',onmouseMove);
                 dropEl.parentNode.onmouseup = null;
                 item.classList.remove('active_event');
                 parseElements();
             }
 
             dropEl.parentNode.ondragstart = function(){
                 return false;
             }
         }
     })

    // Увеличение ширины
    
    let elementWidth = document.querySelectorAll('.width_el');
    let box = document.querySelector('.calendar');
    let arrayPositionMouse = [];
    let unlock = false;
    
    dragLink.forEach(item =>{
        item.addEventListener('mousedown',(event)=>{
            event.preventDefault();
        })
    })
        
    
    function parseElements(){
        elementWidth.forEach((item,id)=>{
            item.addEventListener('mousedown', ()=>{
                let currentWidth = item.parentNode.getBoundingClientRect().x + parseInt(item.parentNode.style.width);
                unlock = true;
                widthElem(currentWidth, id);
                console.log(unlock)
            })
    
            item.addEventListener('mouseup', ()=>{
                unlock = false;
                console.log(unlock)
                id = null
            })
            item.parentNode.addEventListener('mouseup', ()=>{
                unlock = false;
                console.log(unlock)
                id = null
            })
        })
    }
    parseElements();
    function widthElem(currentWidth, id){
        i = id;
        let curWidth = parseInt(dragLink[i].style.width);
        document.addEventListener('mousemove', (event)=>{
            let change = event.clientX - Math.ceil(currentWidth);
            
            if(unlock){
               
                console.log(i)
                dragLink[i].style.width =  curWidth + change + 'px';
                
            }else{
               
            }
        })
    
       }
      
    document.addEventListener('mouseup',()=>{
        unlock = false;
    })

   
})

