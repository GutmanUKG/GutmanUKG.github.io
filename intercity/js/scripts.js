'use strict'
window.addEventListener('DOMContentLoaded', ()=>{
     const itemPhones = document.querySelectorAll('.item-phone');

     itemPhones.forEach(item =>{
         item.addEventListener('mouseenter', (e)=>{
             let target = e.target;
             if(!target.classList.contains('animate__pulse')){
                 target.classList.add('animate__pulse');
             }
         })

    })
});