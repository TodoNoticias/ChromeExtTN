var Interactions = function(options){

    this.defaultView = function(view){ }

		var mod = {

			get: function(type){

        console.log(type);

				var xhr = $.ajax({

          type: "GET",
          url: type,
          dataType: "json"

        });

        return xhr;

			},

      view: function(){

        var content;

        $(options.bind).click(function(){

          console.log('----->',$(this),$(this).data('page'));

          if(options.merge){

            $("<div id='preloader'></div>").appendTo('#content-of-data-port'); //FORK
            content = mod.merge.apply(this,[options.api]);

          }else{

            $("<div id='preloader'></div>").appendTo('#content-of-data-port'); //FORK

            content = mod.get( options.api + $(this).data('page') + '.json' );

            content.success(function(data){

                mod.content(data);
                options.ready();

            });

          }

        });

      },

      merge: function(apis){

        var mergeOn, result,
            mergeArr = [];

          for(var i in apis){

            mergeOn = mod.get( apis[i].replace('$1',$(this).data('page')) );
            mergeOn.success(function(data){

              mergeArr.push(data);

              if(i++ == apis.length){

                result = (typeof options.rules == 'function' && options.rules !== undefined) ? options.rules(mergeArr) : mergeArr;

                console.log(result);

                mod.content(result);
                options.ready();

              }

            });

          }

      },

      content: function(data){

        var rendering = options.flow(data);
        $(options.drop).empty().append(rendering).fadeIn();

      }

		}

    return {

      constructor: Interactions,

      get: function(type){

        return mod.get(type);

      },
      
      wizard: function(){

        return mod.view();

      }

    }

	}