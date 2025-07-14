import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector(".delay");
const fulfilledRadio = document.querySelector('input[value="fulfilled"]');
const rejectedRadio = document.querySelector('input[value="rejected"]');

let delay;
input.addEventListener("input", event => {
    delay = +event.target.value;   
})

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    
    event.preventDefault();
    let currentDelay = delay;
    let promiseStatus;
    if (fulfilledRadio.checked) {
            promiseStatus = "fulfilled"
        } else if (rejectedRadio.checked) {
            promiseStatus = "rejected"
            } 
    setTimeout(() => {
        const promise = new Promise((resolve, reject) => {
            if (promiseStatus === "fulfilled") {
            resolve(`✅ Fulfilled promise in ${currentDelay}ms`
)
        } else if (promiseStatus === "rejected") {
            reject(`❌ Rejected promise in ${currentDelay}ms`
)
            }  
        })
    
        promise.then(value => {
            iziToast.show({
                message: value,
                backgroundColor: 'green',
                messageColor: 'white',
                position: 'topRight',
                close: false,
                progressBar: false,
        
            });
            console.log(value);
            
}
        ).catch(value => {iziToast.show({
    message: value,
    backgroundColor: 'red',
    messageColor: 'white',
    position: 'topRight',
    close: false,
    progressBar: false,
});
            console.log(value);}
    )
    }, currentDelay)
    
    form.reset();
}

