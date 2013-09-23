chrome.extension.getBackgroundPage().Noty.counter(0);
chrome.browserAction.setBadgeText({ text: '' });

/* ===========================================================================
   Theme
   ========================================================================== */

   Handlebars.getTemplate = function(name,callback){

      if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {

        $.ajax({
          url : name + '.html',
          beforeSend: function(xhr){

            if (xhr.overrideMimeType){

            xhr.overrideMimeType("text/html");

            }

          },
          dataType: 'html',

          success : function(data) {
            if (Handlebars.templates === undefined) {
              Handlebars.templates = {};
            }
            Handlebars.templates[name] = Handlebars.compile(data);

            if(typeof callback == 'function' && callback != undefined){
              callback.call(arguments,this);
            }

          },
          async : false

        });

      }

      return Handlebars.templates[name];

    };

    var HBR = function(){

      Handlebars.registerHelper('grand', function(options){

        if(this.dropline_home !== null){
          return options(this);
        }else{
          return options.inverse(this);
        }

      });

      Handlebars.registerHelper('related', function(options){

        if(this.dropline_home == null){

          console.log(this);

          return options(this);
        }

      });

      Handlebars.registerHelper("isMedia",function(options){

        if(this.media != null){

          return options(this);

        }

    });

    }

    theme = Handlebars.getTemplate('news.tmpl');

/* ===========================================================================
   Setup
   ========================================================================== */

  $(function(){ 

    var $menuli = $("#menu li");

    $menuli.click(function(){

      $menuli.each(function(){

        $(this).removeClass($(this).data('page') + '-select').removeClass('selected');

      })

      $(this).addClass($(this).data('page') + '-select').addClass('selected');

    })

    var weather = new Weather();
    weather.store();
    weather.get();

  /* ===========================================================================
    Default Configuration
   ========================================================================== */

   setTimeout(function(){

    $("#menu li[data-page=" + store.get('views') + "]").addClass(store.get('views') + '-select').click();
    $("#alertSelectStatus li[id=" +  store.get('alerts') + "]").addClass('alertActive');

   },50);

  /* ===========================================================================
   Live
   ========================================================================== */

    $(".alive").click(function(e){
      e.preventDefault();

        var notify = webkitNotifications.createHTMLNotification(
          "http://tn.com.ar/tnchromeappverbetainit#locationhrefchromeappverbeta"
        );

        notify.show();
    });

  /* ===========================================================================
   Interactions
   ========================================================================== */

   interaction = new Interactions({

      api:  ['http://api.tn.com.ar/services/gran_titular/$1.json','http://api.tn.com.ar/services/flujo/ahora?section=$1'],
      //api: ['http://172.16.48.104/json/grantitular.json?$1','http://172.16.48.104/json/flujo.json?$1'],
      merge: true,
      rules: function(data){

        return data[0]['gran_titular'].concat(data[1].slice(0,5));

      },

      bind: '.binder',
      drop: '#content-of-data-port',
      flow: function(data){

        HBR(data);
        
        return theme(data);

      },

      ready: function(){ 

        $("#related").find('figure').eq(3).remove(); $("#related").find('figure').eq(3).remove(); $("#related").find('figure').eq(3).remove(); $("#related").find('article').eq(4).addClass('no-border');
        $(".see-more").attr('href',($(".selected").data('page') == 'tn') ? $(".see-more").attr('href') : $(".see-more").attr('href') + '/' + $(".selected").data('page') );
        
        //var $text = $('.dropline').find('p').eq(1);
        //$text.html('<p>' + $text.text().slice(0,115) + '...</p>');

      }

   });

   //interaction.defaultView(store.get('defaultView'));

   interaction.wizard();

   /* ===========================================================================
    Weather
   ========================================================================== */

   $(".weather").find('a').attr('href','http://tn.com.ar/clima/' + store.get('cityViews').replace(/ /g,'-'));

   $("#cityViews").change(function(){

     weather.get();

   })

  /* ===========================================================================
   Elements
   ========================================================================== */

   $(".text").keypress(function(e){
        if(e.which == 13){

          var $text = $(".text").val();

          if($text != ''){
            window.open("http://tn.com.ar/buscar/" + $text);  
          }else{
            $(".text").addClass('error');
          }

        }
    });

   

   $(".toolsAdd,.aside-content").live('click',function(){

       $("#mainview").hide();
       $("#content-of-data-port").fadeIn();
       $("#social").show();

       setTimeout(function(){

        $('.toolsAdd').removeClass('toolsAdd').addClass('tools');

       },50);

   });
   

   $('#tools').click(function(){

      $("#social").hide();
      $("#content-of-data-port").hide();
      $("#mainview").fadeIn();

      setTimeout(function(self){

        $(self).removeClass('tools').addClass('toolsAdd');

      },50,this);

   });

    var $portItems = $("#port-items"),
        $contentsHtml = $("#contents");
        $portItems.find('li').hide();

    /* CHROME nav STATUS */

    /*var navChrome = chrome.extension.getBackgroundPage().Noty.nav();

    for(var i in navChrome){

      $portItems.find('#' + navChrome[i].type).show();
      
    }

    var HTML = chrome.extension.getBackgroundPage().Noty.html();

    for(var i in HTML){

      $contentsHtml.find('.' + HTML[i].type).append(*/ /*Brow.ser("HTML[i].nodes.node")*/ /*":)");*/

    /*}*/
  
  });
