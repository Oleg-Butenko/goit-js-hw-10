import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector(".delay");
// const radio = document.querySelector(".radio-fildset");
const fulfilledRadio = document.querySelector('input[value="fulfilled"]');
const rejectedRadio = document.querySelector('input[value="rejected"]');
let delay;
let promiseStatus;
input.addEventListener("input", event => {
    delay = +event.target.value;   
})

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    if (fulfilledRadio.checked) {
            promiseStatus = "fulfilled"
        } else if (rejectedRadio.checked) {
            promiseStatus = "rejected"
            } 
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => { 
//             if (fulfilledRadio.checked) {
//             resolve("Yes")
//         } else if (rejectedRadio.checked) {
//             reject("No")
//             }  
            
//         },
//         delay) 
//     })
    // promise.then(value => console.log(value)
    // ).catch(value => console.log(value))
    setTimeout(() => {
        const promise = new Promise((resolve, reject) => {
            if (promiseStatus === "fulfilled") {
            resolve("Yes")
        } else if (promiseStatus === "rejected") {
            reject("No")
            }  
        })
        promise.then(value => {
            console.log(value)
            
        }
        ).catch(value => {
            console.log(value)
            
        }
        )
    }, delay)
}

// radio.addEventListener("change", event => {
//     console.log(event.target.value);
// })

// let delay;
// let promiseStatus;   
// form.addEventListener("submit", handleSubmit);
// input.addEventListener("input", event => {
//     delay = +event.target.value;   
// })
// radio.addEventListener("change", event => {
//     promiseStatus = event.target.value;
// })

// function handleSubmit(event) {
//     event.preventDefault();
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (promiseStatus === 'fulfilled') {
//             resolve(console.log(`✅ Fulfilled promise in ${delay}ms`)
// )
//             } else if (promiseStatus === 'rejected') {
//                 reject(console.log(`❌ Rejected promise in ${delay}ms`)
// )
//             }
//         }, delay) 
//     })
//     promise.then(value => iziToast.show({
//         message: value,
//         backgroundColor: 'green',
//         messageColor: 'white',
//         position: 'topRight',
//         close: false,
// })).catch(value => iziToast.show({
//     message: value,
//     backgroundColor: 'red',
//     messageColor: 'white',
//     position: 'topRight',
//     close: false,
// })
//     )
// }



