"use strict";
document.addEventListener('DOMContentLoaded', ()=>{
    //Функционал смены картинки в секции Хит продаж
    const toggleHover = document.querySelectorAll('.toggle_hover');

    toggleHover.forEach((item,id)=>{
        item.addEventListener('mouseenter',()=>{
            let imgBox = item.querySelector('.imgs');
            let hoverImg = item.querySelector('.hover_img')
            item.classList.add('hit-slider-item-active')
            imgBox.style.background = imgBox.dataset.img
            hoverImg.src = imgBox.dataset.img;
            hoverImg.style.opacity = '1'
        })
        item.addEventListener('mouseleave', ()=>{
            let imgBox = item.querySelector('.imgs');
            let hoverImg = item.querySelector('.hover_img')
            imgBox.style.background = imgBox.dataset.img
            hoverImg.src = imgBox.dataset.img;
            hoverImg.style.opacity = '0'
            item.classList.remove('hit-slider-item-active')
        })
    })
    //Конец функционала смены картинки
})
