
window.addEventListener('DOMContentLoaded' , function () {
let   vacanciesItemWraper = document.querySelectorAll('.vacancies__item_wraper');



    // vacancies Tabs
    vacanciesItemWraper.forEach(function(item){
        item.addEventListener('click', function(event){
            let target = event.target;
            if(target && target.classList.contains('vacancies__item')){
                if(!item.classList.contains('vacancies__item_wraper_active')){
                  item.classList.add('vacancies__item_wraper_active');
                }else{
                  item.classList.remove('vacancies__item_wraper_active');
                }
                
            }
        })
      })
  






    let formWrap = document.querySelector('.form');
    function eventDelegate (parent, event, selector, handler, negative = false) {
    let isMatch = function(target) {
        return Array.isArray(selector)
            ? (new RegExp( '\\b' + selector.split(/,\s?/).join('\\b|\\b') + '\\b') ).test(target.classList.value)
            : target.matches(selector);
    };

    parent.addEventListener(event, function (e) {
        let parents = [];

        for (let target = e.target; target && target !== this; target = target.parentNode) {

            let matches = isMatch(target);

            if(matches && !negative) {
                handler(target);
                return false;
            }

            parents.push(target);
        }

        if(!parents.some(function(node) {
            return isMatch(node);
        }) && negative) {
            handler(e.target);
        }

    }, true);
    }

    eventDelegate(formWrap, 'change', `.custom-checkbox`, function (el) {
    
    Array.from(vacanciesItemWraper).forEach(item => {    
        if(el.dataset.name === 'all') {
            item.classList.remove('item_disable');
            } else {
            if (item.classList.contains(el.dataset.name)) {
                item.classList.remove('item_disable');
            } else {
                item.classList.add('item_disable');
            }
            }
        
        
        });
    
    });



    // анимация кота

    let catSleep = document.createElement("IMG"),
        catActive = document.createElement('IMG'),
        blockCat = document.querySelector('animation_cat');
        catActive.src = "./img/Cat_2.gif";
        catActive.classList.add('cat_active')
        catSleep.classList.add('test')
        catSleep.src = "./img/Cat_1.gif"

        function TriggerCat (){
            catSleep.style.display = "none",
            document.getElementById('cat_block').appendChild(catActive);
        }
    
        
    // Получаем нужный элемент
    var element = document.querySelector('.vacancies');

    var Visible = function (target) {
    // Все позиции элемента
    var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код
        document.getElementById('cat_block').appendChild(catSleep);
        setTimeout(TriggerCat, 7100)
    } else {
        // Если элемент не видно, то запускаем этот код
        
    };
    };

    // Запускаем функцию при прокрутке страницы
    window.addEventListener('scroll', function() {
    Visible (element);
    });

    // А также запустим функцию сразу. А то вдруг, элемент изначально видно
    Visible (element);


})