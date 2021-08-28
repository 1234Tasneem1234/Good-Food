const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" onclick = "loadMealDetail('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">${meal.strMeal}</h3>
          <h5 class="card-text">It is a ${meal.strArea} food.. <br> It is a ${meal.strCategory}</h5>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetail = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal =>{
    const mealDetails = document.getElementById('meal-details');
    console.log(meal);
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
        ${meal.strInstructions.slice(0,150)}
        </p>
        <a href="https://www.foodpanda.com.bd/" class="btn btn-outline-danger" target = "_blank">Order this..</a>
      </div>
    `;
    mealDetails.appendChild(div);
}