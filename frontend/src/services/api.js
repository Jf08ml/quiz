import axios from "axios";
import EventBus from "../utils/eventBus";

const createAxiosInstance = (endpoint) => {
  const baseURL = process.env.VUE_APP_BASE_URL + endpoint;

  const api = axios.create({
    baseURL,
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error.response.data.message);
      if (
        error.response.status === 401 &&
        error.response.data.message === "jwt expired"
      ) {
        EventBus.emit("logout");
      }
      throw error;
    }
  );

  return api;
};

const apiAuth = createAxiosInstance("/user");
const apiQuestion = createAxiosInstance("/question");
const apiQuiz = createAxiosInstance("/quiz");

export { apiAuth, apiQuestion, apiQuiz };
