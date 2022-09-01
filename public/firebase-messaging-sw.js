importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '387871484251'
});

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if( ! iOS ) {



    var messaging = firebase.messaging();

    messaging.setBackgroundMessageHandler(payload => {
    
        var title = payload.data.title;
        var options = {
            icon: payload.data.thumbnail
        };
    
        self.registration.showNotification(title, options);
    });
}

