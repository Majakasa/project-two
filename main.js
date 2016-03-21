var bossDropdown = document.querySelector('#dropdown');
var rawTemplate = document.querySelector('#template').innerHTML;
var template = Handlebars.compile(rawTemplate);
var displayA = document.querySelector('.display');
var locationDropdown = document.querySelector('#locationDropdown');
var rawZoneTemplate = document.querySelector('#zoneTemplate').innerHTML;
var zoneTemplate = Handlebars.compile(rawZoneTemplate);
var displayB = document.querySelector('.zoneDisplay');
var levelDropdown = document.querySelector('#levelDropdown');
var petDropdown = document.querySelector('#petDropdown');
var petLevelDropdown = document.querySelector('#petLevelDropdown');
var qualityDropdown = document.querySelector('#qualityDropdown');
var rawPetTemplate = document.querySelector('#petTemplate').innerHTML;
var petTemplate = Handlebars.compile(rawPetTemplate);
var rawPetStatTemplate = document.querySelector('#petStatTemplate').innerHTML;
var petStatTemplate = Handlebars.compile(rawPetStatTemplate);

var submit = document.querySelector('#submit');



// if(selected >= advisedMinLevel  selected = advisedMaxLevel)

for (var i = 15; i < 101; i++) {

  var name = i;
  var optionEl = document.createElement('option');
  optionEl.innerHTML = name;
  optionEl.value = i;
  levelDropdown.appendChild(optionEl);
}
for (var i = 1; i < 26; i++) {

  var name = i;
  var optionEl = document.createElement('option');
  optionEl.innerHTML = name;
  optionEl.value = i;
  petLevelDropdown.appendChild(optionEl);
}
for (var i = 1; i < 6; i++) {

  var name = i;
  var optionEl = document.createElement('option');
  optionEl.innerHTML = name;
  optionEl.value = i;
  qualityDropdown.appendChild(optionEl);
}


levelDropdown.addEventListener('change', function() {
  console.log(levelDropdown.value);
  locationDropdown.options.length = 0;
  dropdown.options.length = 0;

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
      displayB.innerHTML = null;
      displayA.innerHTML = null;
      displayA.style.visibility='hidden'
      displayB.style.visibility='hidden'
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
    displayB.innerHTML = html;
      for (var i = 0; i < zoneData.bosses.length; i++) {
        var name = zoneData.bosses[i].name;
        var optionEl = document.createElement('option');
        optionEl.innerHTML = name;
        optionEl.value = zoneData.bosses[i].id;
        dropdown.appendChild(optionEl);
        displayB.style.visibility='visible'
        displayA.style.visibility='hidden'
        displayA.innerHTML = null;

      };
  });
});

dropdown.addEventListener('change', function(){


  $.ajax({
    url: 'https://us.api.battle.net/wow/boss/'+ bossDropdown.value +'?locale=en_US&apikey=' + key

  }).done(function(bossData){
    var html = template(bossData);
    displayA.innerHTML = html;
    // var zoneTag = document.querySelector('#zoneTag');
    var zone = bossData.zoneId;
    displayA.style.visibility='visible'


  }).fail(function(bossData){
    console.log(bossData);
  });//ajax 2

});//submit button



// populate pet dropdown
  $.ajax({
    url: 'https://us.api.battle.net/wow/pet/?locale=en_US&apikey=' + key
  }).done(function(petData){
    console.log('pets up');
    console.log(petData);
    var html = zoneTemplate(petData);

      for (var i = 0; i < petData.pets.length; i++) {
        var name = petData.pets[i].name;
        var optionEl = document.createElement('option');
        optionEl.innerHTML = name;
        optionEl.value = petData.pets[i].stats.speciesId;
        petDropdown.appendChild(optionEl);


      };
  });

  petDropdown.addEventListener('change', function() {
    console.log(petDropdown.value);

    $.ajax({
      url: 'https://us.api.battle.net/wow/pet/species/' + petDropdown.value + '?locale=en_US&apikey=' + key
    }).done(function(petData){
      console.log('pets up');
      console.log(petData);
      var html = petTemplate(petData);
      displayB.innerHTML = html;
      displayB.style.visibility='visible'
      displayA.style.visibility='hidden'

    });
  });

petLevelDropdown.addEventListener('change', function() {

  $.ajax({
    url: ' https://us.api.battle.net/wow/pet/stats/' + petDropdown.value + '?level=' + petLevelDropdown.value + '&breedId=5&qualityId=' + qualityDropdown.value + '&locale=en_US&apikey=' + key
  }).done(function(petStatsData){
    var html = petStatTemplate(petStatsData);
    displayA.innerHTML = html;
    displayA.style.visibility='visible'
  });
});
qualityDropdown.addEventListener('change', function() {

  $.ajax({
    url: ' https://us.api.battle.net/wow/pet/stats/' + petDropdown.value + '?level=' + petLevelDropdown.value + '&breedId=5&qualityId=' + qualityDropdown.value + '&locale=en_US&apikey=' + key
  }).done(function(petStatsData){
    var html = petStatTemplate(petStatsData);
    displayA.innerHTML = html;
    displayA.style.visibility='visible'
  });
});

// https://us.api.battle.net/wow/pet/stats/258?level=25&breedId=5&qualityId=5&locale=en_US&apikey=c6ynev23bmuh52seyjn8yt6xnwyth5ty





// timestamp converstion
// var myDate = new Date( epoch date * 1000);
// document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());

//
// //thumbnail <region> reffers to the server region not the realm
// http:// <region> + .battle.net/static-render/ + <region> + / + <the string you got from API as thumbnail>
//   //      us                                      us
