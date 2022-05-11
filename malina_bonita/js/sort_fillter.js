"use strict";
document.addEventListener('DOMContentLoaded', ()=>{
    const sortFilterWrapper = document.querySelector('#sort_fillter'),
        fillterList = sortFilterWrapper.querySelector('.filter_list'),
        listElements = fillterList.querySelectorAll('li');
    sortFilterWrapper.addEventListener('click', () => {
        sortFilterWrapper.classList.toggle('sort_fillter_active')
    })
    //в item валяеться то что было выбранно
    listElements.forEach(item => {
        item.addEventListener('click', () =>{
            clearClassList(listElements, 'active');
            item.classList.add('active');
            sortFilterWrapper.querySelector('span').textContent = item.textContent
        })
    })


    function clearClassList(elements, className) {
        for(let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(className)
        }
    }
})
