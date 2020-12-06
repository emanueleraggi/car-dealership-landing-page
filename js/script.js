// hide preloader
window.addEventListener('load', () => document.querySelector('.preloader')
.classList.add('hidePreloader'));


// MODULE 1

const CreateCars = (() => {
    // car data
    const cars = [];
    // we could also have made an object: const cars = [{name: "bmw", etc...}];
    // however, because of the high number of properties it is not worth it 
    // to proceed this way.
    // SOLUTION: let's stick with: const cars = [];

    // car class
    class Car {
        // constructor: every time we will instantiate the class we are going to call this constructor
        constructor(make, country, img, special, model, price, type, trans, gas) {
            // after the constructor is set, we need to set these parameters equal to
            // their value
            this.make = make;
            this.country = country;
            this.img = img;
            this.special = special;
            this.model = model;
            this.price = price;
            this.type = type;
            this.trans = trans;
            this.gas = gas;
        }
    }

    // now we need to make a function that is going to call this car clss every time
    // we are going to run the function

    // car creation function : this class will be pushed to the previously 
    // declared array: const cars = []; 
    // In addition we are also setting potential default parameter into the function
    // Also the other good aspect is that we DONT need to worry for empty values
    // erroneously left because they will be taken over 
    function makeCar(make, country, img = 'img/car-default.jpeg', special = true, model = 'new model', price = 10000, type = 'sedan', trans = 'automatic', gas = '50') {
        const car = new Car(make, country, img, special, model, price, type, trans, gas);
        // now after creating the new instance, it is time to pass it to the 
        // previously declared array: consr cars = []
        cars.push(car);
    }

    // makeCar('chevy', 'american');
    // console.log(cars);

    // define  a new funcion : produceCars
    function produceCars() {
        makeCar('chevy', 'american');
        makeCar('mercedes', 'german', 'img/car-german-1.jpeg', true, 'new model', 5000, 'sedan', 'automatic');
        makeCar('bmw', 'german', 'img/car-german-2.jpeg', true, 'new model', 3000, 'sport', 'manual');
        makeCar('bmw', 'german', 'img/car-german-3.jpeg', false, 'new model', 6000, 'sport', 'automatic');
        makeCar('bmw', 'german', 'img/car-german-4.jpeg', undefined, 'new model', 10000, 'sedan', 'manual');
        makeCar('mercedes', 'german', 'img/car-german-5.jpeg', false, 'new model', 50000, 'sedan', 'automatic');
        makeCar('chevy', 'american', 'img/car-american-1.jpeg', true, 'new model', 5000, 'sedan', 'manual');
        makeCar('chevy', 'american', 'img/car-american-2.jpeg', false, 'new model', 15000, 'sedan', 'automatic');
        makeCar('chevy', 'american', 'img/car-american-3.jpeg', false, 'new model', 25000, 'sedan', 'manual');
        makeCar('chevy', 'american', 'img/car-american-4.jpeg', false, 'new model', 35000, 'sport', 'automatic');
        makeCar('chevy', 'american', 'img/car-american-5.jpeg', false, 'new model', 95000, 'sedan', 'manual');
    }

    produceCars();
    // console.log(cars);

    // special cars
    const specialCars = cars.filter(car => car.special === true);
    // console.log(specialCars);
    // automatic cars
    const automaticCars = cars.filter(car => car.trans === 'automatic');
    const manualCars = cars.filter(car => car.trans === 'manual');

    return {
        // ES6 Notation
        cars,
        specialCars,
        automaticCars,
        manualCars

        // Non ES6 Notation
        // cars: cars,
        // specialCars: specialCars

    }
})();

// this is the only way to externally access to the private members of a class
// console.log(CreateCars.cars);
// console.log(CreateCars.specialCars);

// MODULE 2

const DisplaySpecialCars = ((CreateCars) => {
    const specialCars = CreateCars.specialCars;
    // console.log(specialCars);

    const info = document.querySelector('.featured-info');
    // document loaded event
    document.addEventListener('DOMContentLoaded', () => {
        info.innerHTML = '';

        // variable that will hold everything when we are looping through
        let data = '';
        specialCars.forEach(item => {
            data += `
            <!-- single car item -->
            <div class="featured-item my-3 d-flex p-2 text-capitalize align-items-baseline flex-wrap">
              <span data-img="${item.img}" class="featured-icon mr-2">
                <i class="fas fa-car"></i>
              </span>
              <h5 class="font-weight-bold mx-1">${item.make}</h5>
              <h5 class="mx-1">${item.model}</h5>
            </div>
            <!-- end single car item -->
            `;
        })
        // after looping through the array we wnat to use the variable ad set it equak 
        // to info into html
        info.innerHTML = data;
    })

    // change image
    info.addEventListener('click', (event) => {
        //  console.log(event.target.parentElement);
        if(event.target.parentElement.classList.contains('featured-icon')) {
            const img = event.target.parentElement.dataset.img;
            // console.log(img);
            document.querySelector('.featured-photo').src = img;
        }
    })

})(CreateCars);


// MODULE 3
const DisplayCars = ((CreateCars) => {
    // all cars
    const cars = CreateCars.cars;
    // car container
    const inventory = document.querySelector('.inventory-container');
    // loop over the cars

    // content loaded
    document.addEventListener('DOMContentLoaded', () => {
        // ok here lets empty the card container
        inventory.innerHTML = '';


        let output = '';
        cars.forEach((car) => {
            output += `
            <!-- single car -->
            <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 col-xl-3 single-car ${car.country} ${car.trans}">
              <div class="card car-card">
                <img src="${car.img}" class="card-img-top car-img" alt="">
                <!-- card body -->
                <div class="card-body">
                  <div class="car-info d-flex justify-content-between">
                    <!-- first flex child -->
                    <div class="car-text text-uppercase">
                      <h6 class="font-weight-bold">${car.make}</h6>
                      <h6>${car.model}</h6>
                    </div>
                    <!-- second flex child -->
                    <h5 class="car-value align-self-center py-2 px-3">$
                      <span class="car-price">${car.price}</span>
                    </h5>
                  </div>
                </div>
                <!-- end card body -->
                <!-- card footer -->
                <div class="card-footer text-capitalize d-flex justify-content-between">
                  <p>
                    <span>
                      <i class="fas fa-car"></i>
                    </span>${car.type}
                  </p>
                  <p>
                    <span>
                      <i class="fas fa-cogs"></i>
                    </span>${car.trans}
                  </p>
                  <p>
                    <span>
                      <i class="fas fa-gas-pump"></i>
                    </span>${car.gas}
                  </p>
                </div>
                <div class="d-flex justify-content-between align-items-center container-for-controls text-capitalize p-2">
                  <!-- drop down type -->
                  <div class="justify-content-center align-items-center">
                    <label for="type" class="justify-content-center align-items-center text-uppercase font-weight-bold">type:</label>
                    <select name="type" class="text-muted cbox" id="cars">
                      <option class="all--options" value="sport">sport</option>
                      <option class="all--options" value="sedan">sedan</option>
                      <option class="all--options" value="hatchback">hatchback</option>
                    </select>
                  </div>
                  <!-- end drop down type -->
      
                  <!-- manual/auto type -->
                  <div class="justify-content-center align-items-center">
                    <label for="shift-type" class="justify-content-center align-items-center text-uppercase font-weight-bold">shift:</label>
                    <select name="shift-type" class="text-muted cbox" id="cars">
                      <option value="auto">auto</option>
                      <option value="manual">manual</option>
                    </select>
                  </div>
                  <!-- end manual/auto type -->
                </div>
                <!-- end of card footer -->
              </div>
            </div>
            <!-- end single car -->
            `;
        })
        inventory.innerHTML = output;
    })
})(CreateCars)


// MODULE 4

// In this case we are not passing any parameters
const FilterCars = (() => {
    const filterBtn = document.querySelectorAll('.filter-btn');
    // console.log(filterBtn);

    filterBtn.forEach((btn) => {
        // we want to grab the (event) because in the html 
        // we set the class of data-filter="all", data-filter="american" etc...
        btn.addEventListener('click', (event) => {
            // lets get the value we have in the filter
            const value = event.target.dataset.filter;
            // console.log(value);
            const singleCar = document.querySelectorAll('.single-car');
            // const transmission = document.querySelectorAll('.single-car');
            
            // console.log(singleCar);
            // Now after selecting all the cars, lets loop all the cars

            singleCar.forEach((car) => {
                if(value === 'all') {
                    car.style.display = 'block';
                }
                else{
                    (!car.classList.contains(value)) ? car.style.display = 'none' : car.style.display = 'block';
                }
            })
            
        })
    })
})();