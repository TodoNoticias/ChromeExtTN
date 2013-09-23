/* ===========================================================================
   Helpers
   ========================================================================== */

var Helpers = {
  storage:{

    _existItem: function(eldata,storekey,data){

      for(var i in storekey){
        if(eldata == storekey[i][data]){
          return true;
        }
      }

    },

    _lastConnection: function(now){
     
      return window.localStorage.setItem('Last',now);

    }

  },

  proccess:{

    exec: function(id){

      if(!Helpers.storage._existItem(id,store.get('suscriptions'),"type")){

          var reserve = store.get('suscriptions'),
              generate = reserve.concat({ type:id,status:this.checked });

          store.set('suscriptions',generate);
          chrome.extension.getBackgroundPage().Noty.add(id);

      }

    }

  }
  
}

Helpers.storage._lastConnection(new Date());

$(function(){

  /* ===========================================================================
   Inputs configuration
   ========================================================================== */

   $("#alertSelectStatus li").click(function(){

      store.set('alerts',$(this).attr('id'));
      $("#alertSelectStatus li").removeClass('alertActive');
      $(this).addClass('alertActive');

   })

  $("input").each(function () {
        var Checked = store.get('suscriptions');

        if(Checked){
          if(Helpers.storage._existItem(this.id,Checked,"type") == true){
            this.checked = true;
          }
        }

    });

  $("input").live("change", function(){

        /* ADD suscriptions ITEM */

        if(this.checked != false){

          var id = this.id;

          if(store.get('suscriptions')){

            console.log('add', id);
            Helpers.proccess.exec(id);

          }else{

            store.set('suscriptions',[]);
            Helpers.proccess.exec(id);

          }

        }else{

          /* REMOVE suscriptions ITEM */

          var id = this.id,
              clone = [],
              suscriptions = store.get('suscriptions');

          store.remove('suscriptions');

          for(var i in suscriptions){

            if(suscriptions[i].type == id){

              console.log('remove',suscriptions[i].type);

            }else{

              clone.push({ type:suscriptions[i].type });

            }

          }

          store.set('suscriptions',clone);
          
          chrome.extension.getBackgroundPage().Noty.remove(id);

        }

    });

  /* ===========================================================================
   Selects configuration
   ========================================================================== */

  $("select").each(function () {
        this.value = store.get(this.id);
  });

  $("select").live("change", function () {
        localStorage[this.id] = this.value;
  });

});