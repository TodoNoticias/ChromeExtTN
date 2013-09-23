(function(win){

  var config = {

  'Ninja':{

               giancarlo: {
                          nick:'Giancarlo',
                          name:'Giancarlo Barrientos',
                          email:'gianzest@gmail.com',
                          site: 'setbeat.com',
                          twitter:'@gianbarp',
                          facebook:'Giancarlo Barrientos',
                          nationality:'Peruana',
                          career: 'Informatics Engineering',
                          linkedin:'http://www.linkedin.com/in/giandotcom',
                          location: 'Buenos Aires - Argentina'
                         }

              }
  }

var c=window.console,arr=[],activity={_:function(e,t){for(i in e){c.log(e[i].name)}},__data__:function(e){for(i in e){if(e.hasOwnProperty(i)){c.__proto__[e[i].nick]={all:e[i], me:e[i]}}}}};c.humans={all:function(){c.log(config)},Ninja:function(){activity._(config.Ninja)},backEnds:function(){activity._(config.backEnds)},sysAdmins:function(){activity._(config.sysAdmins)},designers:function(){activity._(config.designers)},analytics:function(){activity._(config.analytics)},managers:function(){activity._(config.managers)},linkedin:function(e){window.location.href=e},tweet:function(e){window.open("http://twitter.com/share?url=http://humansjs.com.ar&text=Contact me: ___ "+e+"&via=humansjs","","toolbar=0, status=0, width=550, height=320, top=240, left=380");}};humans=c.humans;info=console;linkedin=humans.linkedin;tweet=humans.twitter;arr.push(config.Ninja,config.backEnds,config.sysAdmins,config.designers,config.analytics,config.managers);for(var i in arr){activity.__data__(arr[i])}


}(window));