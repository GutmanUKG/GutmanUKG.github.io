document.addEventListener('DOMContentLoaded', ()=>{
   const burgerBtn = document.querySelector('.burger_menu_btn'),
       burgerMenu = document.querySelector('.burger_menu');
   burgerBtn.addEventListener('click', (e)=>{
       burgerMenu.classList.toggle('burger_menu_active');
       if(burgerMenu.classList.contains('burger_menu_active')){
          burgerBtn.classList.add('burger_menu_btn_active');
          document.body.style.overflow = 'hidden';
       }else {

          burgerBtn.classList.remove('burger_menu_btn_active');
          document.body.style.overflow = '';
       }
   });
});
