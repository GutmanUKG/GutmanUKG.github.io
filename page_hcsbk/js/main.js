document.addEventListener('DOMContentLoaded', ()=>{
    let trigger = document.querySelectorAll('.title_acordion');


    trigger.forEach((item, id)=>{
        item.addEventListener('click',(event)=>{
            let target = event.target;
          
            if(!item.parentNode.classList.contains('active')){
                clearClass(id);
                item.parentNode.classList.add('active');
            }else{
                item.parentNode.classList.remove('active');
                stopVideoPlay(id);
            }
        })
        if(!item.parentNode.classList.contains('active')){
            stopVideoPlay(id);
        }
    })

    function clearClass(id){
        for(let i = 0; i <trigger.length; i++){
            trigger[i].parentNode.classList.remove('active');
        }
        stopVideoPlay(id);
    }

    function stopVideoPlay(id){
        let videoPlay = document.querySelectorAll('.video_palyer');
        for(let i = 0; i < videoPlay.length; i++){
            videoPlay[i].pause();
        }
    }
    let tabs = document.querySelectorAll('.tab_link');
    let tab_content = document.querySelectorAll('.wrapper_items_tabs_content');
    
    function showContent(){
        tabs.forEach((item, id)=>{
            item.addEventListener('click', (event)=>{
                let target = event.target;
                event.preventDefault();
                showContentTab(id);
                for(let i = 0; i < tabs.length; i++){
                    tabs[i].classList.remove('active');
                }
                item.classList.add('active');
            })
        })
        
       
    }
    function showContentTab (id){
        for(let i = 0; i < tab_content.length; i++){
            tab_content[i].classList.remove('active_content');
            tab_content[id].classList.add('active_content');
        }
    }
    showContent();

    // video player


    let boxVideo = document.querySelectorAll('.video');

    boxVideo.forEach((item, id)=>{
        let videoPlayer = item.querySelector('.video_palyer');
        let triggerBtn = item.querySelector('.play_icon');

        triggerBtn.addEventListener('click',(event)=>{
            handlePlayButton()
        })
        async function playVideo(){
            try{
                await videoPlayer.play();
            }catch(err){
                console.log('err')
            }
        }
        function handlePlayButton(){
            if(videoPlayer.paused){
                playVideo();
                triggerBtn.classList.add('playing')
            }else{
                videoPlayer.pause();
                triggerBtn.classList.remove('playing')
            }
        }
    })


})