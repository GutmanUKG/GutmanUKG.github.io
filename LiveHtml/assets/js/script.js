document.addEventListener('DOMContentLoaded', ()=>{
    let body  = document.body;
    class RelocateNodeElement {
        constructor({selectElement = null, finalElement = null, clone= false}){
            this.selectElement = document.querySelector(selectElement);
            this.finalElement = document.querySelector(finalElement);
            this.clone = clone;
        }
        relocate(){
            this.finalElement.appendChild(this.selectElement)
        }
    }

    function clearClass(nodeList, activeClass){
        for(let i = 0; i < nodeList.length; i++){
            nodeList[i].classList.remove(activeClass)
        }
    }
    const relocateUserTop = new RelocateNodeElement({
        selectElement: '.header_top_info_user',
        finalElement: '.modal-content',
    })

    const relocateUserBasket = new RelocateNodeElement({
        selectElement: '.user_basket_info_list',
        finalElement: '.scroll_bar'
    })
    const relocateCatalogMenu = new RelocateNodeElement({
        selectElement: '.header_top_info_menu',
        finalElement: '.burger_menu_content'
    })
    const relocateTopMenu = new RelocateNodeElement({
        selectElement: '.main_menu',
        finalElement: '.burger_menu_content'
    })
    const relocateSearchBtn = new RelocateNodeElement({
        selectElement: '.show_serach',
        finalElement: '.header_top_info'
    })
    const relocateActionLink = new RelocateNodeElement({
        selectElement: '.action_link',
        finalElement: '.main_menu'
    })
    const relocateFeedback = new RelocateNodeElement({
        selectElement: '.header_top_info_feedback',
        finalElement: '.burger_menu_footer'
    })
    const relocateUserBtn = new RelocateNodeElement({
        selectElement: '.header_top_popup_user_btn',
        finalElement: '.header_top_info'
    })
    window.addEventListener('resize', (e)=>{
        if(body.clientWidth < 1200){
            relocateUserTop.relocate()
        }
        if(body.clientWidth < 992){
            relocateUserBasket.relocate()
            relocateTopMenu.relocate()
            relocateCatalogMenu.relocate()
            relocateSearchBtn.relocate()
            relocateActionLink.relocate()
            relocateFeedback.relocate()
            relocateUserBtn.relocate()
            addTabsToBurgerMenu()
        }
    })
    if(body.clientWidth < 1200){
        relocateUserTop.relocate()

    }
    if(body.clientWidth < 992){
        relocateUserBasket.relocate()
        relocateTopMenu.relocate()
        relocateCatalogMenu.relocate()
        relocateSearchBtn.relocate()
        relocateActionLink.relocate()
        relocateFeedback.relocate()
        relocateUserBtn.relocate()
        addTabsToBurgerMenu()
    }

    let headerTopPopupUserBtn = document.querySelector('.header_top_popup_user_btn'),
        modalUser  = document.querySelector('.modal_user'),
        overflow = document.querySelector('.overflow');
    headerTopPopupUserBtn.addEventListener('click', ()=>{
        modalUser.classList.add('show')
        modalUser.style.zIndex = '52'
        modalUser.style.display = 'block'
        overflow.style.display = 'block'
    })
    overflow.addEventListener('click', ()=>{
        modalUser.classList.remove('show')
        modalUser.style.display = ''
        overflow.style.display = ''
    })

    function addTabsToBurgerMenu(){
        let burgerMenuTop = document.querySelector('.burger_menu_top'),
            headerTopBurgerMenuBtn = document.querySelector('.header_top_burger_menu_btn'),
            burgerMenu = document.querySelector('.burger_menu'),
            burgerMenuTopItems = burgerMenuTop.querySelectorAll('.item'),
            burgerMenuContent = document.querySelector('.burger_menu_content'),
            closeBtn = document.querySelector('.close_btn');
        function disableAllMenu(){
            for(let i = 0; i < burgerMenuContent.children.length; i++){
                burgerMenuContent.children[i].style.display = 'none'
            }
        }

        disableAllMenu()
        burgerMenuContent.children[0].style.display = 'flex'
        burgerMenuTopItems[0].classList.add('active')
        burgerMenuTopItems[0].classList.add('active')
        burgerMenuTopItems.forEach((item,id)=>{

            // item.classList.remove('active')
            item.addEventListener('click', ()=>{
                clearClass(burgerMenuTopItems, 'active')
                item.classList.add('active')
                disableAllMenu()
                burgerMenuContent.children[id].style.display = 'flex'
            })
        })

        closeBtn.addEventListener('click', ()=>{
            burgerMenu.classList.remove('active')
        })
        headerTopBurgerMenuBtn.addEventListener('click', ()=>{
            burgerMenu.classList.add('active')
        })
    }


})
