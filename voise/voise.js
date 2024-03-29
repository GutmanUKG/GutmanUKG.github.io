document.addEventListener('DOMContentLoaded', (e)=>{
    let status = document.querySelector('.status')
    navigator.mediaDevices.getUserMedia({
        audio: true,
    })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            document.querySelector('#start').addEventListener('click', function(){
                mediaRecorder.start();
                status.textContent = 'Запись начата'
            });
            var audioChunks = [];
            mediaRecorder.addEventListener("dataavailable",function(event) {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", function() {
                const audioBlob = new Blob(audioChunks, {
                    type: 'audio/wav'
                });
                const audioUrl = URL.createObjectURL(audioBlob);
                var audio = document.createElement('audio');
                audio.src = audioUrl;
                audio.controls = true;
                audio.autoplay = true;
                document.querySelector('#audio').appendChild(audio);
                audioChunks = [];
            });
            document.querySelector('#stop').addEventListener('click', function(){
                mediaRecorder.stop();
                status.textContent = 'Запись остановлена'
            });
        });


    //Видос
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('video');
    var button = document.getElementById('button');
    var allow = document.getElementById('allow');
    var context = canvas.getContext('2d');
    var videoStreamUrl = false;

    // функция которая будет выполнена при нажатии на кнопку захвата кадра
    var captureMe = function () {
        if (!videoStreamUrl) alert('То-ли вы не нажали "разрешить" в верху окна, то-ли что-то не так с вашим видео стримом')
        // переворачиваем canvas зеркально по горизонтали (см. описание внизу статьи)
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        // отрисовываем на канвасе текущий кадр видео
        context.drawImage(video, 0, 0, video.width, video.height);
        // получаем data: url изображения c canvas
        var base64dataUrl = canvas.toDataURL('image/png');
        context.setTransform(1, 0, 0, 1, 0, 0); // убираем все кастомные трансформации canvas
        // на этом этапе можно спокойно отправить  base64dataUrl на сервер и сохранить его там как файл (ну или типа того)
        // но мы добавим эти тестовые снимки в наш пример:
        var img = new Image();
        img.src = base64dataUrl;
        window.document.body.appendChild(img);
    }

    button.addEventListener('click', captureMe);

    // navigator.getUserMedia  и   window.URL.createObjectURL (смутные времена браузерных противоречий 2012)
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

    // запрашиваем разрешение на доступ к поточному видео камеры
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });


})
