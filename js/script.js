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

    // Modal

    $('[data-modal=consultation]').on('click', function(){
      $('.overlay , #consultation' ).fadeIn('fast');
    });
    // close modal
    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #thanks,#order').fadeOut('slow')
    });

   
    //  modal
    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        // Title in modal
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        // modal
        $('.overlay, #order').fadeIn();
      })


      
     
    });
    // Validate form
    function validateForm(form){
      $(form).validate({
        rules:{
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email:true,
          }
        },
        messages:{
          name: 'Пожалуйста введите свое имя',
          phone:'Пожалуйста введите номер телефона',
          email:{
            required:'Пожалуйста введие коректный Email',
            email: 'Не правильно введен адресс почты'
          }
        }
      });
    }
    validateForm('#consultation-form');
    validateForm('#order form');
    validateForm('#consultation form');

    // Mask for fomr

    $('input[name=phone]').mask('+7(999)999-9999');


    // Mail

    $('form').submit(function(e){
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize()
      }).done(function(){
        $(this).find('input').val("");
        $('#consultation, #order').fadeOut();
        $('.overlay , #thanks').fadeIn();

        $('form').trigger('reset')
      });
      return false;
    });
});
