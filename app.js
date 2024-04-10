
const dropdwons = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for (let select of dropdwons) {
    for (currCode in countryList) {
      let newOption = document.createElement("option")
      newOption.innerHTML = currCode;
      newOption.value = currCode;
      if(select.name === "from" && currCode === "USD") {
        newOption.selected = "selected"
      } else if (select.name === "to" && currCode === "INR"){
        newOption.selected = "selected"
      } 
      select.append(newOption)

    }
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target); 
    });
}

const updateFlag = (element) => {
    console.log(element);
    let currCode = element.value
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }

    // console.log(fromCurr.value, toCurr.value);
    const URL = "https://v6.exchangerate-api.com/v6/6a12ec1863c0cf2ad997a790/latest"
    let response = await fetch(`${URL}/${fromCurr.value}`)
    let data = await response.json();
    console.log(data);
    let rate = data.conversion_rates[toCurr.value];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
});
