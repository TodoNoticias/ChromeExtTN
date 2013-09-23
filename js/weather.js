var Weather = function(){

   var mod = {

    store: function(){

      if(!store.get('ciudades')){

        var getData = new Interactions().get('http://api.tn.com.ar/services/clima/ciudades.json');

        getData.success(function(data){

          store.set('ciudades',data);
          mod.addBox(data);

        });

      }else{

        mod.addBox(store.get('ciudades'));

      }

    },

    addBox: function(data){

      for(var i in data){

        $("#cityViews").append(new Option(data[i]["title"] + ' - ' + data[i]["provincia"], data[i]["title"]));

      }

    },


    getWeather: function(){

      var getData = new Interactions().get('http://api.tn.com.ar/services/pronostico_ciudad/' + store.get('cityViews') + '.json');

      getData.success(function(data){

        $(".wheather-title").html(store.get('cityViews'));

        var $w = (data['Ahora']['IdClima'] != undefined) ? data['Ahora']['IdClima'] : 2;

        $(".weather").find('a').attr('href','http://tn.com.ar/clima/' + store.get('cityViews').replace(/ /g,'-'));
        $(".weather img").removeAttr('class').attr('class','weather-icon-' + $w);
        $(".wheather-content").html(data['Ahora']['Temperatura'] + '°');

      })

    }

   }

   return {

     constructor: Weather,

     store: function(){

        return mod.store();

      },

      get: function(){

        return mod.getWeather();

      }

   }

}