document.addEventListener('DOMContentLoaded', ()=>{
    
    new Vivus(
        'animate_svg',
        {
            type: 'delayed',
            duration:100
        }
    )

    new Vivus(
        'animate_svg_two',
        {
            type: 'sync',
            duration:150
        }
    )
    new Vivus(
        'animate_svg_three',
        {
            type: 'sync',
            duration:150
        }
    )
    
    new Vivus(
        'svg_animation',
        {
            type: 'sync',
            duration:100
        }
    )
})

