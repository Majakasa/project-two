var bossDropdown = document.querySelector('#dropdown');
var rawTemplate = document.querySelector('#template').innerHTML;
var template = Handlebars.compile(rawTemplate);
var display = document.querySelector('.display');

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
  display.innerHTML = html;



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
// http://render-api-us.worldofwarcraft.com/static-render/us/medivh/210/139817938-avatar.jpg
// https://us.api.battle.net/wow/auction/data/Dunemaul?locale=en_US&apikey=c6ynev23bmuh52seyjn8yt6xnwyth5ty
//   $.ajax({
//     url: 'https://us.api.battle.net/wow/boss/?locale=en_US&apikey=c6ynev23bmuh52seyjn8yt6xnwyth5ty'
//   // url:  'http://us.battle.net/api/wow/character/winterhoof/Eilee?jsonp=foo'
//
//
//
//
//
//   }).done(function(data){
//     console.log(data);
//   // console.log(data.files[0].url);
//   console.log("yay");
//
//  // var auctionDataURL = data.files[0].url;
//
//
//
//   // var auctionHouseDataQ = data.files[0].url;
//   //     $.ajax({
//   //       async: false,
//   //       dataType: 'jsonp',
//   //       jsonp : 'jsonp',
//   //       type: 'GET',
//   //       url: auctionHouseDataQ
//               // http://auction-api-us.worldofwarcraft.com/auction-data/ad09238337ad5f5aa1d2aae04af6d849/auctions.json
//         // callback: 'jsonp',
//         // jsonp: 'callback'
//
//         // Origin: 'https://us.api.battle.net/',
//         // AccessControlAllowOrigin: 'https://us.api.battle.net/'
//
// // http://auction-api-us.worldofwarcraft.com/auction-data/ad09238337ad5f5aa1d2aae04af6d849/auctions.jsonp=?
//
//
//       // }).done(function(data){
//       //     console.log("step 2")
//       //
//       //
//       // }).fail(function(data){
//       // console.log("nope 2");
//       // });
//   }).fail(function(data){
//   console.log("nope");
// });





}
