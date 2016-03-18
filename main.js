var bossDropdown = document.querySelector('#dropdown');
var rawTemplate = document.querySelector('#template').innerHTML;
var template = Handlebars.compile(rawTemplate);
var bossDisplay = document.querySelector('.display');
var locationDropdown = document.querySelector('#locationDropdown');
var rawZoneTemplate = document.querySelector('#zoneTemplate').innerHTML;
var zoneTemplate = Handlebars.compile(rawZoneTemplate);
var zoneDisplay = document.querySelector('.zoneDisplay');
var levelDropdown = document.querySelector('#levelDropdown');




// if(selected >= advisedMinLevel  selected = advisedMaxLevel)

for (var i = 15; i < 101; i++) {

  var name = i;
  var optionEl = document.createElement('option');
  optionEl.innerHTML = name;
  optionEl.value = i;
  levelDropdown.appendChild(optionEl);
}

levelDropdown.addEventListener('change', function() {
  console.log(levelDropdown.value);
  locationDropdown.options.length = 0;

var selectedLevel = levelDropdown.value;
  var zoneList = 'https://us.api.battle.net/wow/zone/?locale=en_US&apikey='+ key;
  $.ajax({
    url: zoneList
  }).done(function(zoneListData){
    console.log(zoneListData);

    for (var i = 0; i < zoneListData.zones.length; i++) {
      var minLevel = zoneListData.zones[i].advisedMinLevel;
      var maxLevel = zoneListData.zones[i].advisedMaxLevel;
      if(selectedLevel >= minLevel && selectedLevel <= maxLevel){
      var name = zoneListData.zones[i].name;
      var optionEl = document.createElement('option');
      optionEl.innerHTML = name;
      optionEl.value = zoneListData.zones[i].id;
      locationDropdown.appendChild(optionEl);
      }
    }

  }).fail(function(zoneListData){
    console.log(zoneListData);
  }).always(function(zoneListData){
  })//ajax one
})//level change event


locationDropdown.addEventListener('change', function() {
  console.log(locationDropdown.value);
  dropdown.options.length = 0;

  $.ajax({
    url: 'https://us.api.battle.net/wow/zone/'+ locationDropdown.value +'?locale=en_US&apikey=' + key
  }).done(function(zoneData){
    console.log('zone up');
    console.log(zoneData);
    var html = zoneTemplate(zoneData);
    zoneDisplay.innerHTML = html;
      for (var i = 0; i < zoneData.bosses.length; i++) {
        var name = zoneData.bosses[i].name;
        var optionEl = document.createElement('option');
        optionEl.innerHTML = name;
        optionEl.value = zoneData.bosses[i].id;
        dropdown.appendChild(optionEl);

      }
  })
})




  // var bossList = 'https://us.api.battle.net/wow/boss/?locale=en_US&apikey='+ key;
  // $.ajax({
  //   url: bossList
  // }).done(function(bossData){
  //   console.log(bossData);
  //   console.log(bossData.bosses[0].description);
  //
  //   for (var i = 0; i < bossData.bosses.length; i++) {
  //
  //     var name = bossData.bosses[i].name;
  //     var optionEl = document.createElement('option');
  //     optionEl.innerHTML = name;
  //     optionEl.value = bossData.bosses[i].id;
  //     bossDropdown.appendChild(optionEl);
  //   }
  // }).fail(function(bossData){
  //   console.log(bossData);
  // }).always(function(bossData){
  // })//ajax one
  //
  var submit = document.querySelector('#submit')
  dropdown.addEventListener('change', function(){


  $.ajax({
    url: 'https://us.api.battle.net/wow/boss/'+ bossDropdown.value +'?locale=en_US&apikey=' + key

  }).done(function(bossData){
    var html = template(bossData);
    bossDisplay.innerHTML = html;
    // var zoneTag = document.querySelector('#zoneTag');
    var zone = bossData.zoneId;

  //   $.ajax({
  //     url: 'https://us.api.battle.net/wow/zone/'+ zone +'?locale=en_US&apikey=' + key
  //   }).done(function(zoneData){
  //     console.log('zone up');
  //     console.log(zoneData);
  //     var html = zoneTemplate(zoneData);
  //     zoneDisplay.innerHTML = html;
  //
  //   })
  //
  //
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
