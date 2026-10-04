importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyAkXsYEeP1AdR05JjiyFKTRWCYNGIBf0ZU",authDomain:"eunoia-ordenes.firebaseapp.com",projectId:"eunoia-ordenes",messagingSenderId:"448372653210",appId:"1:448372653210:web:d23d13719d61b53184b323"});
firebase.messaging();
/* Al tocar un aviso creado desde la app abierta, abre el link correcto */
self.addEventListener('notificationclick',function(e){
  var l=e.notification&&e.notification.data&&e.notification.data.link;
  if(!l)return;
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if('focus' in cs[i]){cs[i].navigate&&cs[i].navigate(l);return cs[i].focus();}}
    return self.clients.openWindow(l);
  }));
});
