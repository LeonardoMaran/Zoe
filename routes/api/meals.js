const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const axios = require("axios");
const Meal = require('../../models/Meal');

router.get("user/:user_id/meals", (req, res) => {
    Meal.find()
        .then(meals => res.json(meals))
        .catch(err => res.status(404).json({ nomealsfound: 'No meals found'}));
});


axios({
  method: "GET",
  url:
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
  },
  params: {
    targetCalories: "2000",
    timeFrame: "day",
  },
})
  .then((response) => {
    data = response;
    let meal_ingredients;
    let meals = data.data.meals;
    meals.forEach((meal) => {
      let meal_id = meal.id;
      axios({
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meal_id}/ingredientWidget.json`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.API_KEY,
        },
      })
        .then((response) => {
          console.log(meal);
          let meal_ingredients = response.data.ingredients;
          console.log(meal_ingredients);
          console.log("break between each meal");
          //save to meal DB at this point using the meal and the meal_ingredients
          let new_meal = new Meal({
            //schema details
          });
          //new_meal.save();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = router;
