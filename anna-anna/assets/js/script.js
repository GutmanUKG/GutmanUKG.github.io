document.addEventListener('DOMContentLoaded', ()=>{
    let body = document.body

    //Основной слайдер
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
    //Слайдер картинок в товаре
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

    //Cлайдер капсул и новостей
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

});
