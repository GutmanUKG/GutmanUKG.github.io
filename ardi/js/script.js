document.addEventListener('DOMContentLoaded', ()=>{
    
    new Vivus(
        'svg_anim',
        {
            type: 'delayed',
            duration:100
        }
    )
    // new Vivus(
    //     'svg_animation',
    //     {
    //         type: 'sync',
    //         duration:100
    //     }
    // )

    new Vivus(
        'word',
        {
            type: 'sync',
            duration:800
        }
    )


     new Vivus(
            'svg_test',
            {
                type: 'sync',
                duration:200
            }
        )


    
})

