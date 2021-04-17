document.addEventListener('DOMContentLoaded', () => {
   const body = document.querySelector('body');
     cx = window.innerWidth / 2;
     cy = window.innerHeight /2;

   body.addEventListener('mousemove', e => {
     clientX = e.pageX
     clientY = e.pageY

   

    request = requestAnimationFrame(updateMe)
   })

   function updateMe() {
     dx = clientX - cx
     dy = clientY - cy

     tiltx = dy / cy
     titly = dx / cx

     radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(titly, 2))
     degree = radius * 10

     gsap.to('.content' , 1 , { transform:` rotate3d( ${tiltx}, ${titly}, 0 , ${degree}deg)`  })
   }
})