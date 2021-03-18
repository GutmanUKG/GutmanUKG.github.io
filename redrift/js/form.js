window.addEventListener('DOMContentLoaded', function () {
    const bntForm = document.querySelector('.button_form'),
        form = document.querySelector('.feed-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        btnSubmit = document.querySelector('.button_subbmit');

    statusMessage.classList.add('status')
    form.style.display = 'none';
    form.style.opacity = 0;
    bntForm.addEventListener('click', function(){
        form.style.display = 'flex';
        form.style.opacity = 1;
        bntForm.style.opacity = 0;
        bntForm.style.display = '';
        
       
    });
    let message = {
        loading: 'Loading',
        success: 'Thank you, we will contact you soon',
        failure: 'Something went wrong'
    };

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        // Запрос
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);


        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.textContent = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.textContent = message.success;
                btnSubmit.disabled();
            } else {
                statusMessage.textContent = message.failure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

});