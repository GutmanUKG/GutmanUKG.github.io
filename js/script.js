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
})
document.querySelector('.next').addEventListener('click', function(){
  slider.goTo('next');
})