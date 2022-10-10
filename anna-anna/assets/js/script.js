document.addEventListener('DOMContentLoaded', ()=>{
    let body = document.body



    function clearClass(elements, classActive){
        for(let i = 0; i < elements.length; i++){
            elements[i].classList.remove(classActive)
        }
    }
    //Основной слайдер
    try{
        let bannerSlider = document.querySelector('.banner_slider'),
            bannerItem = bannerSlider.querySelectorAll('.item');

        let bannerOwl = $('.banner_slider');
        $('.banner_slider').owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            items:1,
            dots:true,
        })



        // Go to the next item
        $('.btn_next_banner').click(function() {
            bannerOwl.trigger('next.owl.carousel');

        })
        // Go to the previous item
        $('.btn_prev_banner').click(function() {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            bannerOwl.trigger('prev.owl.carousel', [300]);

        })


        bannerItem.forEach(item=>{
            if(item.classList.contains('white')){
                item.parentNode.classList.add('white_slide')
            }
        })

        //Функционал смены темы при переключении слайдера
        let owlItem = bannerSlider.querySelectorAll('.owl-item')
        bannerOwl.on('changed.owl.carousel', function(event) {
            if(owlItem[event.item.index].classList.contains('white_slide')){
                body.classList.add('white_theme')
            }else{
                body.classList.remove('white_theme')
            }
        })

    }catch(e){
        console.error(e)
    }
    //Основной слайдер

    //Инициализация и настройка слайдеров для всех товаров
    class OwlSlider{
        constructor({item = null, options = {}, customBtn = false,
                    btnNext = null, btnPrev = null, bannerOwl= null}){
            this.item = item
            this.options = options
            this.customBtn = customBtn
            this.btnNext = document.querySelector(btnNext)
            this.btnPrev = document.querySelector(btnPrev)
            this.bannerOwl = bannerOwl
        }
        init(){
            this.item.classList.add('owl-carousel' , 'owl-theme')
            $(this.item).owlCarousel({
                ...this.options
            })
            if(this.customBtn === true){
                let bannerOwl = $(this.item),
                    nextPrev = ['prev','next'];
                this.item.parentNode.querySelectorAll('.btn').forEach((item, id)=>{
                    item.addEventListener('click', ()=>{
                        bannerOwl.trigger(nextPrev[id]+ '.owl.carousel')
                    })
                })
            }
        }
    }

    //Слайдер списка товаров
    try{
        const productItemsList = document.querySelectorAll('.product_item_slider')
        productItemsList.forEach(item=>{
            item = new OwlSlider({
                item: item,
                customBtn: true,
                btnNext: '.product_items_list_btn_next',
                btnPrev: '.product_items_list_btn_prev',
                options: {
                    loop:false,
                    margin:30,
                    nav:false,
                    items:4,
                    dots:false,
                    mouseDrag: false
                }
            })
            item.init();
        })
    }catch (e) {
        console.error(e)
    }

    //Слайдер картинок в товаре
    try{
        const prodItemImgs = document.querySelectorAll('.product_item_imgs')
        prodItemImgs.forEach(item=>{
            item = new OwlSlider({
                item: item,
                options: {
                    loop:true,
                    margin:30,
                    nav:false,
                    items:1,
                    dots:true,
                    autoplay:false,
                    // center:true,
                    customBtn:false
                    // autoWidth: true
                }
            })
            item.init();
        })
    }catch(e){
        console.error(e)
    }

    //Cлайдер капсул и новостей
    try{
        const sliderList = document.querySelectorAll('.slider_list')
        sliderList.forEach(item=>{
            item = new OwlSlider({
                item:item,
                customBtn:true,
                btnNext: '.btn_next_slider',
                btnPrev: '.btn_prev_slider',
                options: {
                    loop:false,
                    margin:30,
                    nav:false,
                    items:3,
                    dots:false,
                }
            })
            item.init();
        })
    }catch(e){
        console.error(e)
    }


    //Меню каталога
    try{
        const leftMenu = document.querySelector('.left_menu')
        const liElements = leftMenu.querySelectorAll('li')

        liElements.forEach(item=>{
            if(item.querySelector('ul')){
                item.classList.add('is_dropdown')
            }
        })
        leftMenu.addEventListener('click', (e)=>{
            let target = e.target
            e.preventDefault()
            e.stopPropagation()
            clearClass(liElements, 'active_drop')
            if(target.parentNode.classList.contains('is_dropdown')){
                target.parentNode.classList.add('active_drop')
            }
        })
    }catch(e){
        console.error(e)
    }


    //Выпадашки фильтров

    try{
        const filterList = document.querySelector('.filter_list'),
            filterItems = filterList.querySelectorAll('.item');
        filterItems.forEach(item=>{
            let filterDropVariant = item.querySelector('.drop');
            if(filterDropVariant != null){
                let  elementsDropVariant = filterDropVariant.querySelectorAll('a');
                console.log(elementsDropVariant.length)
                if(elementsDropVariant.length >= 10){
                    filterDropVariant.classList.add('grid_template')
                }
            }



                item.addEventListener('click', ()=>{
                clearClass(filterItems, 'active')
                item.classList.add('active')
            })
        })
    }catch(e){
        console.error(e)
    }

    //Выпадашки информации
   try{
       const infoListItems = document.querySelector('.info_list_items'),
           infoItems = infoListItems.querySelectorAll('.item');

       infoItems.forEach(item=>{
           item.addEventListener('click', ()=>{
               clearClass(infoItems, 'active')
               item.classList.add('active')
           })
       })
   }catch(e){
        console.error(e)
   }

    //Смена основной картинки при клике

    try{
        const imgMainWrapper = document.querySelector('.img_main'),
            imgMain = imgMainWrapper.querySelector('img'),
            imgsList = document.querySelector('.imgs_list'),
            imgInList = imgsList.querySelectorAll('img');
        imgInList[0].classList.add('active')
        imgMain.src  = imgInList[0].src
        imgInList.forEach(item=>{
            item.addEventListener('click', ()=>{
                clearClass(imgInList, 'active')
                item.classList.add('active')
                imgMain.src = item.src;
            })
        })
    }catch (e) {
        console.error(e)
    }
});
