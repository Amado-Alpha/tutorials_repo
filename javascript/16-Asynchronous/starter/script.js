'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Old school way of making ajax calls
// const getCountryData = function(country){
//     const request = new XMLHttpRequest;
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`); 
//     request.send();

//     // Waiting for the load event
//     request.addEventListener('load', function(){
//         //console.log(this.responseText); // this===request (you could write request.responseText)
//         const[data]= this.responseText;
//         console.log(data);

//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//         </article>
//         `;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('portugal');
// getCountryData('tanzania');

// NOTE: On refresh of the page, you can see that country flags are changing positions after each
// page reload. This is due to the fact that there's no order of execution of them ajax calls, the
// first one to return a response is the one which will render first, hence such a behaviour.
// A SOLUTION to that are the callbacks which can set the order at which call will go first and
// which will follow.


// Now let's create a sequence of ajax calls that will run one after another. 
// THE IDEA: In our data, there is a neighbouring country for each country we choose to fetch data
// about. We need to get that neighbouring country, and it makes total sense to get the neighbouring
// country after we get our target country data.

const renderCountry = function(data, className = ''){
    // a card for a neighbouring country is designed to be a bit smaller, so we pass in
    // className arg to make that distinction, if not specified in that case for country 1
    // then a normal class will be rendered.
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags['png']}" />
            <div class="country__data">
                <h3 class="country__name">${data.name['common']}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
                <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
            </div>
        </article>
        `;

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1; //move to finally() block
};

/*
const getCountryAndNeighbour = function(country){
    // Ajax call country 1
    const request = new XMLHttpRequest;
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`); 
    request.send();

    // Waiting for the load event
    request.addEventListener('load', function(){
        //console.log(this.responseText); // this===request (you could write request.responseText)
        const [data] = JSON.parse(this.responseText);
        //console.log(data);

        // Render country 1
        renderCountry(data);

        // Get neighbour country
        const [neighbour] = data.borders;
        
        // Check if a country actually has a neighbouring country
        if(!neighbour) return;

        // Ajax call country 2
        // A neighbouring country doesn't come with a name but a code eg. ESP for spain
        // So we need to modify our end point below to fetch country data using a country code
        const request2 = new XMLHttpRequest;
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`); 
        request2.send();

        request2.addEventListener('load', function(){
            //console.log(this.responseText);
            const [data2] = JSON.parse(this.responseText);
            //console.log(data2);
            renderCountry(data2, 'neighbour');

        })
    });
};

getCountryAndNeighbour('kenya');
//getCountryAndNeighbour('tanzania');


// Nested callbacks(callback hell 😡) - these are implemented to make asynchronous tasks execute in sequence
// Like above example we have a callback for country 2 inside country 1, meaning that country
// 2 will always execute after country 1.

// Let's check another demonstration below

setTimeout(() => {
    console.log('1 second passed')

    setTimeout(() => {
        console.log('2 seconds passed')

        setTimeout(() => {
            console.log('3 seconds passed')

            setTimeout(() => {
                console.log('4 seconds passed')
            }, 1000)

        }, 1000)

    }, 1000)

}, 1000)

*/

// NB: Code that's hard to understand and hard to reason about is a bad code
// A SOLUTION to callback hell is promises

// const request = new XMLHttpRequest;
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`); 
// request.send();

// const request = fetch('https://restcountries.com/v3.1/name/tanzania');
// console.log(request);

// Re-writing the above task in a morden way
// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then( function(response){
//         //console.log(response);
//         return response.json(); // json() is an async. method to, so we need to write another promise
//     }).then(function(data){
//         console.log(data);
//         renderCountry(data[0]);
//     })
// };

// getCountryData('portugal');

// Simplified version of the above code
// const getCountryData = function(country){
//     // Country 1
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//         renderCountry(data[0])

//         const neighbour = data[0].borders[0];
//         if(!neighbour) return;

//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'));
// };

// getCountryData('tanzania');


// Error Handling, Taking the above code and modifying it
// const renderError = function(msg){
//     countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1; move this to finally block
// };

// const getCountryData = function(country){
//     // Country 1
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//         renderCountry(data[0])

//         const neighbour = data[0].borders[0];
//         if(!neighbour) return;
        
//         // Country 2
//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//         console.log(`${err}🤬🤬🤬`);
//         renderError(`Something went wrong ${err.message}🤬🤬🤬`);
//     })
//     .finally(() => { // This method runs regardless the outcome. In other words this is the method
//                      // that will always run. One usecase is hiding the loading spinner, we need to
//                      // to  hide it regardless the fetch was successful or not
//         countriesContainer.style.opacity = 1;
//     })
// };

// // getCountryData('tanzania');

// I have added the button here so as to simulate loosing connection, when a user makes a reques
// when the page is already loaded (Visit the network part(neighbour to console then change it to
// offline and then click the button again))
// Another way is to manually turn off PC internet after loading the page, with that way then you
// don't need the button below.
// btn.addEventListener('click', function(){
//     getCountryData('tanz');
// });

// In the above code, we are handling errors but for some responses, such errors are not well de
// descriptive to the user. Suppose we were to search for a country that doesn't exist. It would
// throw a misleading error that would not tell the user what exactly went wrong.
// For such scenarios we need to handle errors manually. So the below code is modified version of
// the above.

/*
// A function that handles the errors
const getJSON = function(url, errorMsg = 'Something went wrong'){
    return fetch(url)
    .then(response => {
        // console.log(response)
        if(!response.ok) 
            throw new Error(`${errorMsg} (${response.status})`)
        return response.json()
    })
}

const getCountryData = function(country){
    // Country 1
    // fetch(`https://restcountries.com/v3.1/name/${country}`)
    // .then(response => {
    //     // console.log(response)
    //     if(!response.ok) 
    //         throw new Error(`Country not found (${response.status})`)
    //     return response.json()
    // })
    getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
        renderCountry(data[0])

        // There are countries like australia that got no neighbours
        // Throw a more specific error in such circumstances
        let neighbour;
        if (data[0].hasOwnProperty('borders')){
            neighbour = data[0].borders[0]
        }else{
             throw new Error('No neighbour found');
        }
            
       
        console.log(data[0])
        
        // Country 2
        //return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found')
    })
    //.then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
        console.log(`${err}🤬🤬🤬`);
        renderError(`Something went wrong ${err.message}🤬🤬🤬`);
    })
    .finally(() => { 
        countriesContainer.style.opacity = 1;
    })
};


btn.addEventListener('click', function(){
    getCountryData('australia');
});

*/

/*
// CODING CHALLENGE
const whereAmI = function(lat, long){
    fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=148702824096921118162x118249`)
    .then(response => {
        if(!response.ok) 
            throw new Error(`Too many requests in short time (${response.status})`)
        return response.json();
    })
    .then(data => {
        console.log(data)
        console.log(`You are in ${data.city}, ${data.country}`);

        return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
        // console.log(response)
        if(!response.ok) 
            throw new Error(`Country not found (${response.status})`)
        return response.json()
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
        console.log(`${err.message}🤬🤬🤬`);
    });
};

whereAmI(52.508, 13.381);
*/


/*
// EVENT LOOP IN PRACTICE
console.log('Test Start!');

// The idea is to check which callback will have a higher priority than another
// Both execute at the same time, since we have set the timeer at 0 sec
// Promise value will be returned in priority to timer's bcuz it is microtask and 
// eventually it will reside in microtask queue which has a higher priority than normal
// call back que
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Now let's try with a more time consuming task
// A 0 sec timer has to wait for several seconds till the execution of the promise
// before its execution
Promise.resolve('Resolved promise 2').then(res => {
    for(let i=0; i<10000000000; i++) {}
    console.log(res);
});;
console.log('Test End!');
*/

/*
// CREATING OUR OWN PROMISES

// What we are doing below is encapsulation an asynchronous behaviour i.e setTimeout in a 
// promise. The process to do that is what's called promisifying (wrapping old callback bas
// ed functions into promises
// promise)
const lotteryPromise = new Promise(function(resolve, reject){
    
    setTimeout(function(){
        if(Math.random() >= 0.5){
            resolve('You won');
        }else{
            reject(new Error('You lost your money'));
        }
    }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds * 1000);
    });
};

// Consuming a promise
wait(2)
    .then(() => {
        console.log('I waited for 2 seconds!');
        return wait(1);
    })
    .then(() => {
        console.log('I waited for 1 second!');
    });

// Promisifying geolocation API

// Let's start with a callback based API
// navigator.geolocation.getCurrentPosition(
//     position => console.log(position), // Callback one
//     err => console.log(err) // Callback 2
// );

// Now let's promisify it

const getPosition = function(){
    return new Promise(function(resolve, reject){
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // );
        // Simplified to 
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

//getPosition().then(pos => console.log(pos));

const whereAmI = function(){
    getPosition().then( pos =>{
        const {latitude:lat , longitude:long} = pos.coords;

        return fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=148702824096921118162x118249`)
    })
    .then(response => {
        if(!response.ok) 
            throw new Error(`Too many requests in short time (${response.status})`)
        return response.json();
    })
    .then(data => {
        console.log(data)
        console.log(`You are in ${data.city}, ${data.country}`);

        return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
        // console.log(response)
        if(!response.ok) 
            throw new Error(`Country not found (${response.status})`)
        return response.json()
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
        console.log(`${err.message}🤬🤬🤬`);
    });
};

btn.addEventListener('click', whereAmI);

*/


// CODING CHALLENGE
// const wait = function(seconds){
//     return new Promise(function(resolve){
//         setTimeout(resolve, seconds * 1000);
//     });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function(imgPath){
//     return new Promise(function(resolve, reject){
//         const img = document.createElement('img');
//         img.src = imgPath;

//         img.addEventListener('load', function(){
//             imgContainer.append(img);
//             resolve(img);
//         });

//         img.addEventListener('error', function(){
//             reject(new Error('Image not found'))
//         })
//     });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//         console.log('Image 1 is loaded')
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImage('img/img-2.jpg');
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Image 2 is loaded')
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//     })
//     .catch(err => console.log(err));


// USING async await TO CONSUME PROMISES
// Eliminates the use of the then method but behind the scene what happens is the then statement
// being executed

// NB: In the case of error handling in async await we use try ... catch, not just catch b'cuz we
// can't attach it anywhere
/*
const renderError = function(msg){
        countriesContainer.insertAdjacentText('beforeend', msg);
        countriesContainer.style.opacity = 1; 
};
const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI = async function(){
    try {
        // Geolocation
        const pos = await getPosition();
        const { latitude:lat, longitude:long } = pos.coords;

        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=148702824096921118162x118249`);
        if(!resGeo.ok) throw new Error('Problem getting location data');

        const dataGeo = await resGeo.json()
        console.log(dataGeo);

        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
        if(!res.ok) throw new Error('Problem getting country');

        const data = await res.json();
        //console.log(data[0]);
        renderCountry(data[0]);
    } catch(err) {
        console.error(`😫${err}`);
        renderError(`😫${err.message}`);
    }
};

whereAmI();
whereAmI();
whereAmI();
*/

/*
const getJSON = function(url, errorMsg = 'Something went wrong'){
    return fetch(url)
    .then(response => {
        // console.log(response)
        if(!response.ok) 
            throw new Error(`${errorMsg} (${response.status})`)
        return response.json()
    })
}

const get3Countries = async function(c1, c2, c3){
    try{
        // Running promises in series
        // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

        // console.log([data1.capital, data2.capital, data3.capital].flat());

        // Running promises in parallel (This saves time)
        // NB: If one promise fails, all of them do
        // Main use case of Promise.all() is when you need to return promises that don't depend
        // on each other
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`)
        ])
        
        //console.log(data);
        console.log(data.map(d => d[0].capital).flat());
    }catch(err){
        console.error(err);
    }
}

get3Countries('tanzania', 'portugal', 'brazil');

// Another combinator is Promise.race()
// This returns only one output whose promise wins the race(uses lesser time to complete)
// NB: Even a rejected promise can win the race
// A good use case is when a user i making a request using a very bad internet connection,
// It might take too long, so its wise to create a timeout promise that rejects after a certain
// amount of time has passed

(async function(){
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/italy`),
        getJSON(`https://restcountries.com/v3.1/name/mexico`),
        getJSON(`https://restcountries.com/v3.1/name/kenya`)
    ])
    console.log(res[0].name['common'])
    //console.log(res);
})();

const timeout = function(sec){
    return new Promise(function (_, reject){
        setTimeout(function(){
            reject(new Error('Request took too long!'))
        }, sec * 1000)
    });
};

// Just felt like using a then()😉, you can still use async await 

Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    timeout(0.1) // Experiment with different values
])
    .then(res => console.log(res[0].name['common']))
    .catch(err => console.error(err));

// Promise.allSettled(), This will return all the promises regardless of the status
Promise.allSettled([
    Promise.resolve('success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success!')
])
    .then(res => console.log(res))
    .catch(err => console.err(err));

// Promise.any(), Returns the first fullfilled promise
Promise.any([
    Promise.resolve('success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success!')
])
    .then(res => console.log(res))
    .catch(err => console.err(err));

*/


// CODING CHALLENGE 03(Finale😂)

const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds * 1000);
    });
};

const imgContainer = document.querySelector('.images');

const createImage = function(imgPath){
    return new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function(){
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function(){
            reject(new Error('Image not found'))
        })
    });
};

// let currentImg;

// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//         console.log('Image 1 is loaded')
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImage('img/img-2.jpg');
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Image 2 is loaded')
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//     })
//     .catch(err => console.log(err));

const loadAndPause = async function(){
    try{
        let img = await createImage('img/img-1.jpg');
        console.log('Image 1 is loaded');
        await wait(2);
        img.style.display = 'none';

        img = await createImage('img/img-2.jpg');
        console.log('Image 2 is loaded');
        await wait(2);
        img.style.display = 'none';

    }catch(err){
        console.log(err)
    }
}

// loadAndPause();

const loadAll = async function(imgArr){
    try{
        const imgs = imgArr.map(async img => await createImage(img));
        console.log(imgs); // This returns promises
        const imgEl = await Promise.all(imgs); // This is how you get the images from promises
        console.log(imgEl);
        imgEl.forEach(img => img.classList.add('parallel'));

    }catch(err){
        console.log(err)
    };
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

