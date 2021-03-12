window.addEventListener('DOMContentLoaded' , function () {
    $('.slide-inner').slick({
      infinite: true,
      slidesToShow: 1,
      autoplay:false,
      arrows:true,
      nextArrow: '<button type="button" class="next"></button>',
      prevArrow: '<button type="button" class="prev"></button>',
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
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });
  
    $('.wraper_mobile_slid').slick({
      infinite: true,
      slidesToShow: 1,
      autoplay:false,
      arrows:true,
      prevArrow: '<button class="mobile_prev"></button>',
      nextArrow: '<button class="mobile_next"></button>'
    });
    

    $('.body_slid').slick({
      infinite: false,
      slidesToShow: 1,
      autoplay:false,
      arrows:false,
      swipe:false,
      allowTouchMove: false,
    });
    $('.carousel__inner').slick({
      infinite: true,
      slidesToShow: 3,
      autoplay:true,
      arrows:false,
      vertical:true,

    });
    
    $('.wraper_item_slide_team').slick({
      infinite: true,
      slidesToShow: 1,
      autoplay:true,
      arrows:true,
      prevArrow: '<button class="mobile_prev_team"></button>',
      nextArrow: '<button class="mobile_next_team"></button>'
    });
    $('.inner_content').slick({
      infinite: true,
      slidesToShow: 2,
      autoplay:false,
      arrows:true,
      prevArrow: '<button class="prev_client"></button>',
      nextArrow: '<button class="next_client"></button>',
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
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

 
   
   
    $('.clients_footer').slick({
      infinite: true,
      slidesToShow: 4,
      autoplay:true,
      arrows:false,
    });
   
    
     
    $('.mobile_slider_client').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false,
    });
});
  