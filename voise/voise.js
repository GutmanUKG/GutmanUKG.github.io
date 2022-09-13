document.addEventListener('DOMContentLoaded', (e)=>{
    navigator.mediaDevices.getUserMedia({
        audio: true,
    })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            document.querySelector('#start').addEventListener('click', function(){
                mediaRecorder.start();
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
            });
        });



    var errorCallback = function(e) {
        console.log('Reeeejected!', e);
    };


    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;



    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        video.onloadedmetadata = function(e) {
            // Ready to go. Do some stuff.
        };
    }, errorCallback);
} )
