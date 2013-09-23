/* ===========================================================================
   Logical Notification
   ========================================================================== */
  var j = 0;
  var Noty = {

    getContent: function(type){

       var xhr = $.ajax({

        type: "GET",
        url: "http://tn.com.ar/services/flujo/ahora?section=" + type,
        //url: 'http://172.16.48.104/json/flujo.json',
        dataType: "json"

      });

      return xhr;

    },

    expiration: function(data){

      var expirationMS = 1 * 60 * 500;

      console.log('---> definir expiracion <---' , data);

      data.push({ timestamp: new Date().getTime() + expirationMS });

      return data;

    },

    timeStampCompare: function(key){

      var dbTimestampStore = store.get(key);

      if(dbTimestampStore[0] != null){

        for(var i in dbTimestampStore){

            if(dbTimestampStore[dbTimestampStore.length - 1].timestamp !== undefined){

              console.log('--> now: ',+new Date());
              console.log('--> timestamp: ', dbTimestampStore[dbTimestampStore.length - 1].timestamp);
              console.log((+new Date() < dbTimestampStore[dbTimestampStore.length - 1].timestamp) ? true : false);

              return (+new Date() < dbTimestampStore[dbTimestampStore.length - 1].timestamp) ? true : false;

            }

        }

      }

    },

    ready: function(type){

      /* Default DATA */

      console.log('------> Portadas: ',type);

      var notyGetContent = Noty.getContent(type);

      notyGetContent.success(function(data){

        console.log('------> Datos: ',data);

        store.set(type,Noty.expiration(data));

       });

    },
    
    add: function(id){

      /* UPDATED noties */

        Noty.getContent(id).success(function(data){

          store.set(id,Noty.expiration(data));

          console.log('-------------------> Notification <-------------------------');

          Noty.itemCompare(id);

        });

    },

    remove: function(id){

      /* REMOVE noties */
      store.remove('ITEMCOMPARE_' + id);

      return store.remove(id);

    },

    html: function(){

      var checkSuscriptions = store.get('suscriptions'),
          dom = [];

      for(var i in checkSuscriptions){
          
        console.log('Existen Datos!',checkSuscriptions[i].type);

        var data = store.get(checkSuscriptions[i].type);
        data['type'] = checkSuscriptions[i].type;

        dom.push(data);

      }

      return dom;
      
    },

    nav: function(){

      return store.get('suscriptions');

    },

    noties: function(img,title,content,timer,url){


       content = content.replace(/<(.)*?>/g, " ");

       var id = (new Date).toString();

       if(img == undefined){

          chrome.notifications.create(id,{

            type: "basic",
            iconUrl: chrome.runtime.getURL("/images/logo-tn.png"),
            title: title,
            message: content
        
          },function(){});

       }else{

          chrome.notifications.create(id,{

              type: "image",
              iconUrl: chrome.runtime.getURL("/images/logo-tn.png"),
              title: title,
              message: content,
              imageUrl: "http://tn.cdncmd.com/sites/default/files/imagecache/470x264/" + img
          
          },function(){});

       }
        
        /*chrome.notifications.onClicked.addListener(function(){

            window.open(url);
        
        });*/

        setTimeout(function(e){

            chrome.notifications.clear(e,function(){});
        
        },timer,id);


      /*var noties = webkitNotifications.createNotification(img,title,content);
      noties.show();

      noties.onclick = function(){
        window.open(url);
      };*/

      /*setTimeout(function(){*/
        /*noties.cancel()*/
      /*},timer);*/

    },

    counter: function(num){

      if(typeof num == "number"){

        j = num;

      }

      return j;

    },

    itemCompare: function(type){

      var dataUpdated = store.get(type),
          dataCompare = store.get('ITEMCOMPARE_' + type);

      /* items ITEMCOMPARE*/

      for(var i in dataUpdated){

        if(dataUpdated[i].nid != dataCompare[0].nid){

          j = Noty.counter();

          j++;

          chrome.browserAction.setBadgeText({ text: j.toString() });
           
          console.log('---> compare_1_nid',dataUpdated[i].nid);
          console.log('---> compare_2_nid',dataCompare[0].nid); 

          console.log('%c ----------------> SHOT! <-------------- ', 'background: #222; color: #bada55');

          var dataImg = dataUpdated[i].media.image_thumb;

          Noty.noties(dataImg,dataUpdated[i].title,dataUpdated[i].dropline,store.get('timeout')*1000,dataUpdated[i].url);//.replace(/<(.)*?>/g," ")

        }else{

          return false;

        }
      
      }

    },

    news: function(){

    console.log('---> News <---');

     var suscriptionsAlerts = store.get('suscriptions');

     for(var i in suscriptionsAlerts){

      console.log('ITEMNOW',store.get(suscriptionsAlerts[i].type));

        if(Noty.timeStampCompare(suscriptionsAlerts[i].type) == false){

            console.log(':: Datos extraidos para comparar de: ',suscriptionsAlerts[i].type);

            store.set('ITEMCOMPARE_' + suscriptionsAlerts[i].type, store.get(suscriptionsAlerts[i].type)); /* STORE variable ITEMCOMPARE */

            console.log('ITEMCOMPARE_', store.get('ITEMCOMPARE_' + suscriptionsAlerts[i].type));

            Noty.add(suscriptionsAlerts[i].type); /* ADD ELEMENT */

            /* FALTA TIMER PARA LAS NOTIFICACIONES */ 

            console.log('ITEMUPDATE', store.get(suscriptionsAlerts[i].type));

        }

      }

    }

  }

  var suscriptionsAlerts = store.get('suscriptions');

  if(suscriptionsAlerts){

    for(var i in suscriptionsAlerts){

      Noty.ready(suscriptionsAlerts[i].type);

    }

  }

/* ===========================================================================
   Welcome Notification
   ========================================================================== */

   if(!store.get('foo')){

    store.set('foo',true); 
    
    chrome.notifications.create("welcome",{

     type: "basic",
     iconUrl: chrome.runtime.getURL("/images/logo-tn.png"),
     title: "TN - Todo Noticias",
     message: "Mantenete informado minuto a minuto con TN."
 
    },function(){});

   } 

/* ===========================================================================
   Inputs Default Configuration
   ========================================================================== */

  localStorage.setItem('cityViews','Aeroparque de Buenos Aires');
  localStorage.setItem('suscriptions','[{"type":"tn"}]'); 
 	localStorage.setItem("timeout", 10);
  localStorage.setItem("alerts", 'on');
 	localStorage.setItem("fontSize", 13);
  localStorage.setItem("views", 'tn');

/* ===========================================================================
   Badget
   ========================================================================== */

   chrome.browserAction.setBadgeBackgroundColor({ color:[255,0,0,255] });

/* ===========================================================================
   Alerts Notification
   ========================================================================== */

   setInterval(function(){

    if(store.get('alerts') == 'on'){

      Noty.news();

    }
   
   },2500);