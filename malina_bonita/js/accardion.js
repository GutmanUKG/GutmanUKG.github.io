"use strict";
document.addEventListener('DOMContentLoaded', ()=>{

    function accardionToggle(elements, className) {
        let element = document.querySelectorAll(elements)
        element.forEach(item=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault();
                clearClass(element, className)
                item.classList.add(className)
            })
        })
    }
   function clearClass(elements, className){
        for(let i=0; i < elements.length; i++){
            elements[i].classList.remove(className)
        }
   }

    accardionToggle('.tab', 'tab_active')
})
