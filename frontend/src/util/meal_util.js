import axios from "axios";

export const getUserMeals = ({ userId, mealDate }) => {
  debugger;
  return axios.get(`/api/meals/user/${userId}/meals/${mealDate}`);
};

// export const createMeals = (data) => {
//     return axios.get(`/api/meals/user/${}`)
// }
// export const getTweets = () => {
//   return axios.get('/api/tweets')
// };

// export const getUserTweets = id => {
//   return axios.get(`/api/tweets/user/${id}`)
// };

// export const writeTweet = data => {
//   return axios.post('/api/tweets/', data)
// }
// © 2020 GitHub, Inc.
