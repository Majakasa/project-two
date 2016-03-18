var bossDropdown = document.querySelector('#dropdown');
var rawTemplate = document.querySelector('#template').innerHTML;
var template = Handlebars.compile(rawTemplate);
var bossDisplay = document.querySelector('.display');
var rawZoneTemplate = document.querySelector('#zoneTemplate').innerHTML;
var zoneTemplate = Handlebars.compile(rawZoneTemplate);
var zoneDisplay = document.querySelector('.zoneDisplay');

window.onload = function (){
console.log("loaded");



  var bossList = 'https://us.api.battle.net/wow/boss/?locale=en_US&apikey='+ key;
  $.ajax({
    url: bossList
  }).done(function(bossData){
    console.log(bossData);
    console.log(bossData.bosses[0].description);

    for (var i = 0; i < bossData.bosses.length; i++) {

      var name = bossData.bosses[i].name;
      var optionEl = document.createElement('option');
      optionEl.innerHTML = name;
      optionEl.value = bossData.bosses[i].id;
      bossDropdown.appendChild(optionEl);
    }
  }).fail(function(bossData){
    console.log(bossData);
  }).always(function(bossData){
  })//ajax one

  var submit = document.querySelector('#submit')
  submit.addEventListener('click', function(){


  $.ajax({
    url: 'https://us.api.battle.net/wow/boss/'+ bossDropdown.value +'?locale=en_US&apikey=' + key

  }).done(function(bossData){
    var html = template(bossData);
    bossDisplay.innerHTML = html;
    // var zoneTag = document.querySelector('#zoneTag');
    var zone = bossData.zoneId;

    $.ajax({
      url: 'https://us.api.battle.net/wow/zone/'+ zone +'?locale=en_US&apikey=' + key
    }).done(function(zoneData){
      console.log('zone up');
      console.log(zoneData);
      var html = zoneTemplate(zoneData);
      zoneDisplay.innerHTML = html;

    })


  }).fail(function(bossData){
    console.log(bossData);
  })//ajax 2

  })//submit button

// timestamp converstion
// var myDate = new Date( epoch date * 1000);
// document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());

//
// //thumbnail <region> reffers to the server region not the realm
// http:// <region> + .battle.net/static-render/ + <region> + / + <the string you got from API as thumbnail>
//   //      us                                      us




}
