document.addEventListener('DOMContentLoaded', ()=>{
    try{
        const tabsContentListItem = document.querySelectorAll('.tabs_content_list-item'),
            tabsBtnListItem = document.querySelectorAll('.tabs_btn_list-item');

        tabsBtnListItem[0].classList.add('tabs_btn_list-item--active')
        tabsContentListItem[0].classList.add('tabs_content_list-item--active')

        function clearClass(elements, activeClass){
            for(let i = 0; i < elements.length; i++){
                elements[i].classList.remove(activeClass)
            }
        }
        tabsBtnListItem.forEach((item,id)=>{
            item.addEventListener('click', ()=>{
                clearClass(tabsBtnListItem, 'tabs_btn_list-item--active')
                item.classList.add('tabs_btn_list-item--active')
                clearClass(tabsContentListItem, 'tabs_content_list-item--active')
                tabsContentListItem[id].classList.add('tabs_content_list-item--active')
            })
        })
    }catch(e){

    }

    function relocate(element, targetElement){
        targetElement.appendChild(element)
    }

    const headerLangs = document.querySelector('.header_langs')
    const headerMenu = document.querySelector('.header_menu')
    const burgerMenu = document.querySelector('.burger_menu')
    const burgerBtn = document.querySelector('.burger_btn')
    if(document.body.clientWidth < 1000){
        relocate(headerLangs, burgerMenu)
        relocate(headerMenu, burgerMenu)
    }
    burgerBtn.addEventListener('click', ()=>{
        burgerMenu.classList.toggle('active')
        if(burgerMenu.classList.contains('active')){
            burgerBtn.classList.add('active')
        }else{
            burgerBtn.classList.remove('active')
        }
    })

    const progSlide = tns({
        container: '.prog_items',
        items: 3.2,
        nav: false,
        controls: false,
        gutter: 30
    })
    const photo_list = tns({
        container: '.photo_list',
        items: 1.2,
        nav: false,
        controls: false,
        gutter: 20,
        autoWidth:true
    })


});
