let recipe = document.querySelector("#recipe");
let search = document.querySelector("#search");
let recipe_box = document.querySelector(".recipe-box");
let steps = document.querySelector(".steps")

search.addEventListener("click", async () => {
    let Recipe_value = recipe.value.trim();

    if (Recipe_value == "") {
        recipe_box.innerHTML = "<p>invalid search</p>";
        return
    }

    try {
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${Recipe_value}`
        );

        let data = await response.json();

        let meals = data.meals;

        if (meals && meals.length > 0) {
            display(meals);
        }

        else {
            recipe_box.innerHTML = "<p>meal is not available</p>"
        }

    } catch (error) {
        console.error("Error:", error);
    }

    function display(meals) {
        recipe_box.innerHTML = " ";
        steps.style.display = "none"
        recipe_box.style.display = "flex";

        meals.forEach((meal) => {
            const card = document.createElement("div");
            card.classList = "w-[20%] border-2 border-black-100 p-4 rounded-2xl max-[1024px]:w-[30%] max-[768px]:w-[30%] max-[600px]:w-[100%]  text-left";
            card.innerHTML = `
            <img class="w-[100%] h-52 object-cover mb-2 rounded-2xl" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
             
            <button id="recipe-link" class=" block text-center px-4 py-2 bg-blue-500 text-white rounded mt-4">recipe</button>`;
            recipe_box.appendChild(card);

            const link = card.querySelector("#recipe-link");
            link.onclick = (event) => {
                event.preventDefault();
                recipe_box.style.display = "none"; 
                const stepsArray = meal.strInstructions.split('.').filter(step => step.trim() !== '');

                steps.innerHTML = `
                <h3 class="mx-5 font-bold text-2xl">${meal.strMeal}</h3>
                <h2 class="mx-5 mb-4">Instructions</h2>
                <ol class="list-decimal mx-8">
                ${stepsArray.map(step => `<li class="mb-2">${step.trim()}</li>`).join('')}
                </ol>`;
                steps.style.display = "block";

            }

        });
    }
});