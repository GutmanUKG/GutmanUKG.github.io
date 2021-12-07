document.addEventListener('DOMContentLoaded', ()=>{
   $('.slider_wrapper').slick({
       dots:false,
       infinite:true,
       arrows:true,
       speed: 300,
       slidesToShow: 2,
       slidesToScroll: 1,
       variableWidth:true,
       nextArrow: '.btn_next',
       prevArrow: '.btn_prev',
       autoPlay:true,
       autoplaySpeed: 3000
   })
});