document.addEventListener('DOMContentLoaded', ()=>{
    const MainSlider = tns({
        container: '.cards-list',
        items: 3,
        controls:false,
        nav:false
    });
    const NewsSlider = tns({
        container: '.news-list',
        items: 3,
        controls:false,
        nav:false,
        mouseDrag: true
    });
});
