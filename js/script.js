// $(document).ready(function(){
//     $('.carousel__inner').slick({   
//         infinite: true,
//         speed: 300,
//         slidesToShow: 1,
//         // adaptiveHeight: true,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         prevArrow: '<button type="button" class="slick-prev"> <img src="../icons/left.svg" alt="left"> </button>',
//         nextArrow: '<button type="button" class="slick-next"> <img src="../icons/right.svg" alt="right"></button>',
//         responsive:[
//             {
//                 breakpoint: 768,
//                 settings: {
//                   dots: true,
//                   arrows:false
//                 }
//               },
//         ]
//     });

// });

$(document).ready(function(){
  // slider
  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls:false,
    nav:false
  
  });
  document.querySelector('.prev').addEventListener('click', function(){
    slider.goTo('prev');
  });
  document.querySelector('.next').addEventListener('click', function(){
    slider.goTo('next');
  });

  // tabs
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  // link

    // $('.catalog-item__link').each(function(i){
    //     $(this).on('click', function(e){
    //       e.preventDefault();
    //       $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //       $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
    //     })
    // });

    // $('.catalog-item_back').each(function(i){
    //   $(this).on('click', function(e){
    //     e.preventDefault();
    //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
    //   })
  // });

  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
      })
  });
};
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item_back');
});
