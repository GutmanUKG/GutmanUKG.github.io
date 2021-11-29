document.addEventListener('DOMContentLoaded', ()=>{
//    city filter
    const citySelect = document.querySelector('#city');
    let wrapperAllElement = document.querySelector('.list_result'),
        arrElements = wrapperAllElement.querySelectorAll('.item');

    citySelect.addEventListener('change', (e)=>{
        for(let i = 0; i < arrElements.length; i++){
            if(arrElements[i].dataset.city != citySelect.value){
                arrElements[i].classList.add('disable')
            }else {
                arrElements[i].classList.remove('disable')
            }
            if(citySelect.value == 'all'){
                arrElements[i].classList.remove('disable')
            }
        }
    })

//    jobs filter
    const jobSelect = document.querySelector('#job');
    jobSelect.addEventListener('change', ()=>{
       for(let i = 0; i < arrElements.length; i++){
           arrElements[i].classList.remove('disable');
           let resutl = arrElements[i].innerText.toLowerCase().indexOf(jobSelect.value.toLowerCase());
           if(resutl){
               arrElements[i].classList.add('disable');
           }else {
               arrElements[i].classList.remove('disable');
           }
           if(jobSelect.value == 'all'){
               arrElements[i].classList.remove('disable');
           }
       };
    });
//    search
//     console.log(arrElements);
    const search = document.querySelector('#search_job');
    search.addEventListener('input', ()=>{
        for(let i = 0; i < arrElements.length; i++){

            let resutl = arrElements[i].innerText.toLowerCase().indexOf(search.value.toLowerCase());
            if(resutl){
                arrElements[i].classList.add('disable');
            }else {
                arrElements[i].classList.remove('disable');
            }

        }
    })


//    slider

    $('.wrapper_slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '.btn_prev',
        nextArrow: '.btn_next',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});