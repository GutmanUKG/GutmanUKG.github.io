document.addEventListener('DOMContentLoaded', ()=>{
    let trigger = document.querySelectorAll('.title_acordion');


    trigger.forEach(item=>{
        item.addEventListener('click',(event)=>{
            let target = event.target;
            clearClass();
            item.parentNode.classList.toggle('active')    
        })
    })

    function clearClass(){
        for(let i = 0; i <trigger.length; i++){
            trigger[i].parentNode.classList.remove('active');
        }
    }
})