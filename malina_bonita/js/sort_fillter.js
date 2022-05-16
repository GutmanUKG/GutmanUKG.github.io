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
        document.body.style.overflow = ''
        for(let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(className)

        }

        if(elements.length == undefined){
            elements.classList.remove(className)
        }
    }


    //Вызов мобильного фильтра
    const popupFilltersTriggers = document.querySelector('.popup_fillters'),
        popupFilltersList = document.querySelector('.popup_fillters_list'),
        popupFilltersListCloseBtn = popupFilltersList.querySelector('.close_btn');

    popupFilltersTriggers.addEventListener('click', (e)=>{
        e.preventDefault()
        document.body.style.overflow = 'hidden'
        popupFilltersList.classList.add('popup_fillters_list_active')
    })
    popupFilltersListCloseBtn.addEventListener('click', (e)=>{
        e.preventDefault()

        clearClassList(popupFilltersList, 'popup_fillters_list_active')
    })
})
