
setTimeout(() => { window.history.forward() }, 1000);
window.onload = function () {
    // window.history.back().onclick = function () {
    //   window.history.go(0);
    // };  
//     window.history.pushState(null, null, window.location.href);
// window.onpopstate = function () {
//     window.history.go(1);
// };
window.history.go(1);
        let counter = 9;
          
        const interval = setInterval(function() {
            document.getElementById('btn').innerHTML=counter
          console.log(counter);
          counter--;
            
          if (counter < 0 ) {
            clearInterval(interval);
            document.getElementById('btn').disabled = false;
            document.getElementById('btn').innerHTML='Get Your Reward'
            console.log('Ding!');
          }
        }, 1000);
      
    // document.getElementById('btn')
}
function GetTokens() {
  console.log("fjlhfljkl")
  document.getElementById('btn').disabled = true;
  window.history.back()

}
