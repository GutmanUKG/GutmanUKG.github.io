document.addEventListener('DOMContentLoaded', ()=>{
    try{
        const tabsContentListItem = document.querySelectorAll('.tabs_content_list-item'),
            tabsBtnListItem = document.querySelectorAll('.tabs_btn_list-item');

        tabsBtnListItem[0].classList.add('tabs_btn_list-item--active')
        tabsContentListItem[0].classList.add('tabs_content_list-item--active')

        function clearClass(elements, activeClass){
            for(let i = 0; i < elements.length; i++){
                elements[i].classList.remove(activeClass)
            }
        }
        tabsBtnListItem.forEach((item,id)=>{
            item.addEventListener('click', ()=>{
                clearClass(tabsBtnListItem, 'tabs_btn_list-item--active')
                item.classList.add('tabs_btn_list-item--active')
                clearClass(tabsContentListItem, 'tabs_content_list-item--active')
                tabsContentListItem[id].classList.add('tabs_content_list-item--active')
            })
        })
    }catch(e){

    }
});
