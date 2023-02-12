const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals')

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');

const mealInfoEl = document.getElementById('meal-info');



getRandomMeal();
fetchFavMeals();


async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];


    console.log(randomMeal);

    addMeal(randomMeal, true);    
    

}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    // console.log(meal);

    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    // console.log(meals);

    const respData = await resp.json();
    const meals = respData.meals;

    // console.log(meal);

    return meals;
}

function addMeal(mealData, random = false) {

    console.log(mealData);


    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML =
        ` 
    <div class="meal-header">
    ${random ? `
        <span class="random">
            Random Recipe
        </span>` : ''}
        <img src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"/>

    </div>
    <div class="meal-body">
        <H4>${mealData.strMeal}</H4>
        <button class="fav-btn" >
            <i class="fas fa-heart"></i>
        </button>
    </div>
</div>`;

    const btn = meal.querySelector('.meal-body .fav-btn');


    btn.addEventListener('click', () => {
        // btn.classList.toggle('active');
        if (btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove('active');
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add('active');
        }



    });

    meal.addEventListener('click', () => {
        showMealInfo(mealData);
    })

    mealsEl.appendChild(meal);


}


function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));

}

function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));

}

function getMealsLS() {

    const mealIds = JSON.parse(localStorage.getItem('mealIds'));




    return mealIds === null ? [] : mealIds;
}


async function fetchFavMeals() {
    const mealIds = getMealsLS();



    for (i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];

        meal = await getMealById(mealId);
        // meals.push(meal);
        addMealFav(meal);
    }
    console.log(meals);

    //add to the screeen

}

function addMealFav(mealData) {

    const favMeal = document.createElement('li');

    meal.innerHTML = ` 
        <li>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span></li>;`;




    favoriteContainer.appendChild(favMeal);

}

searchBtn.addEventListener('click', async () => {

    mealsEl.innerHTML = "";

    const search = searchTerm.value;

    // console.log(search);
    const meals = await getMealsBySearch(search);

    if (meals) {

        meals.forEach((meal) => {
            addMeal(meal);

        });

    } else {
        mealsEl.innerHTML = "<br><center>No results found...Try a different word  :) </center><br>";

    }


});


popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
})


function showMealInfo(mealData) {
    const mealEl = document.createElement('div');

    const ingredients = [];


    for(let i=1;i<20;i++) {

        if (mealData['strIngredient'+i]) {

            ingredients.push(`${mealData['strIngredient' + i]} / ${mealData['strMeasure' + i]} `);
           


        } else {

            break;

        }
    }
    console.log(ingredients);


    mealEl.innerHTML = `
<h1>${mealData.strMeal}</h1>

<img src="${mealData.strMealThumb}" alt=""/>

<p>${mealData.strInstructions}
</p>
<h3>Ingredients / Measures </h3>
<ul>
    ${ingredients.map(ing => `

   <li>${ing}</li> 
    
    
    `).join("")}
</ul>

`;

    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');

}


