importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyAkXsYEeP1AdR05JjiyFKTRWCYNGIBf0ZU",authDomain:"eunoia-ordenes.firebaseapp.com",projectId:"eunoia-ordenes",messagingSenderId:"448372653210",appId:"1:448372653210:web:d23d13719d61b53184b323"});
var messaging=firebase.messaging();

/* El service worker nuevo toma el control de inmediato (sin esperar a cerrar la app) */
self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});

/* Si el aviso llega solo con "data" (sin "notification"), Firebase no lo muestra solo: lo mostramos aquí.
   Si trae "notification", Firebase ya lo muestra, así que no se duplica. */
messaging.onBackgroundMessage(function(p){
  if(p.notification)return;
  var d=p.data||{};
  return self.registration.showNotification(d.title||d.titulo||'KPlace',{
    body:d.body||d.cuerpo||'',
    icon:'icon-192.png',
    badge:'badge-96.png',
    data:{link:d.link||d.url||''}
  });
});

/* Al tocar un aviso, abre el link correcto */
self.addEventListener('notificationclick',function(e){
  var l=e.notification&&e.notification.data&&e.notification.data.link;
  if(!l)return;
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if('focus' in cs[i]){cs[i].navigate&&cs[i].navigate(l);return cs[i].focus();}}
    return self.clients.openWindow(l);
  }));
});
