const endDate = document.querySelector("input[name='endDate']");
const clock = document.querySelector(".clock");
let timeInterval;
let timestop = true;
const saveValue=localStorage.getItem("countdown")||false;
if(saveValue){
  startClock(saveValue);
  let inputValue=new Date(saveValue);
  endDate.valueAsDate=inputValue;
}
endDate.addEventListener("change", function (e) {
  e.preventDefault();
  const temp = new Date(endDate.value);
  localStorage.setItem("countdown",temp);
  clearInterval(timeInterval);
  startClock(temp);
  timestop=true;
});
function startClock(d) {
  function updatecounter() {
    let tl = timeLeft(d);
    //console.log(tl.total);
    if (tl.total <= 0) {
      timestop = false;
    }
    for (let pro in tl) {
      let el = clock.querySelector("." + pro);
      if (el) {
        el.innerHTML = tl[pro];
      }
    }
    if (timestop) {
      timeInterval = setInterval(updatecounter, 1000);
    }
    else{
      clearInterval(timeInterval);
    }
  }
  updatecounter();
}
function timeLeft(d) {
  let currenttime = new Date();
  let t = Date.parse(d) - Date.parse(currenttime);
  //console.log(result);
  let second = Math.floor((t / 1000) % 60);
  let minuts = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minuts: minuts,
    second: second,
  };
}