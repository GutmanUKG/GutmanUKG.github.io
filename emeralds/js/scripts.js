document.addEventListener('DOMContentLoaded', ()=>{
    //Аккордион
    const accordion_wrapper = document.querySelector('.accordion_el'),
        accordion_item = accordion_wrapper.querySelectorAll('.item'),
        item_text = document.querySelectorAll('.item_text');

    accordion_item.forEach((item,id)=>{
        item.addEventListener('click', ()=>{
            //Функция удаления классов с элементов
            disable_item_accordion()
            item.classList.add('item_active');
            //Функция отображения текстовых элементов каждого из элементов акардиона
            show_text_accordion(id)
        })
    })
    //функция отображает текст эелемента по id нажатой картинки
    function show_text_accordion(id) {
        for(let i = 0; i < item_text.length; i++){
            item_text[i].style.display = 'none'
        }
        if(item_text[id] !== undefined && item_text[id] !== null){
            item_text[id].style.display = 'block'
        }else{
            console.log('undefined');
        }

    }
    //Вызываем функцию что бы отобразилася первый текст
    show_text_accordion(0)
    //Удаление классов активности с элементов аккадреодна
    function disable_item_accordion() {
        for(let i = 0; i < accordion_item.length; i++){
            accordion_item[i].classList.remove('item_active')
        }
    }


    const btns_select_plan = document.querySelectorAll('.btn_select'),
        box_blocks_plan = document.querySelectorAll('.plan_block');
    //Выбор планировки
    //По id показывает елемент из списка карт и вешался класс активности на выбранной планировке
    function show_block_plan(id) {
        for(let i = 0; i < box_blocks_plan.length; i++){
            box_blocks_plan[i].style.display = 'none';
            box_blocks_plan[id].style.display = 'block'
        }
        for(let j = 0; j < btns_select_plan.length; j++){
            btns_select_plan[j].classList.remove('btn_select_active')
            btns_select_plan[id].classList.add('btn_select_active')
        }
    };
    //Вызов функции что бы была активна первая планировка
    show_block_plan(0);

    btns_select_plan.forEach((item,id)=>{
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            show_block_plan(id)
            item.classList.add('btn_select_active')
        })
    })
    //Отображение формы в зависимости от выбранной планировки

    const btn_zoom = document.querySelectorAll('.btn_zoom'),
        form_plan = document.querySelectorAll('.form_plan'),
        bg_site = document.querySelector('.bg_active_form');
    function show_form(selector){
        document.body.style.overflow = 'hidden';
        bg_site.style.display = 'block';
        for(let i = 0; i < form_plan.length; i++){
            if(form_plan[i].dataset.form == selector){
                form_plan[i].classList.add('form_active');

            }
        }
    }

    btn_zoom.forEach(item=>{
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            let selector = item.dataset.form;
            show_form(selector)
        })
    })

    //закрытие форм при клике вне ее

    const form = document.querySelectorAll('.form');

    form.forEach(item=>{
        item.addEventListener('click', (e)=>{
            let target = e.target;
            if(target == null || target == undefined || target.classList.contains('btn_close' || !target)){
                item.classList.remove('form_active');
                document.body.style.overflow = ''
                bg_site.style.display = 'none'
            }
        })
    })


    // закрытие всех форм
    bg_site.addEventListener('click', ()=>{
        close_all_form()
    })

    function close_all_form() {
        let form_active = document.querySelectorAll('.form_active');
        bg_site.style.display = 'none'
        document.body.style.overflow = ''
        for(let i = 0; i < form_active.length; i++){
            form_active[i].classList.remove('form_active')
        }
    }




    //Отображение форм на сайте

    const btns_form = document.querySelectorAll('.btn_form'),
        form_site = document.querySelector('.form_main');


    btns_form.forEach(item=>{
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            let target = e.target;
            close_all_form()
            form_site.classList.add('form_active')
            bg_site.style.display = 'block';
        })
    })

        form_site.addEventListener('click', (e)=>{
            let target = e.target;
            if(target.classList.contains('btn_close')){
                form_site.classList.remove('form_active')
                bg_site.style.display = '';
            }
        })


    //Отступ между слайдами
    const slider_banner = document.querySelector('.slider_banner'),
        slider_wrapper = document.querySelector('.slider_wrapper'),
        slider_el = document.querySelectorAll('.item_slide');

    let gap_el = slider_banner.clientWidth * 100 / 1280;

    slider_wrapper.style.gap = gap_el - 2  + '%'
    // $('.slick-track').style.gap = gap_el -2 +'%'
    // for(let i = 0; i < slider_el.length; i++){
    //     slider_el[i].style.marginRight = gap_el - 2 + '%';
    // }

});