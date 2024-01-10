import { apiQuiz } from "./api";
import { showLoading, hideLoading } from "../stores/loadingStore.js";

export async function createQuiz(quizData) {
  try {
    showLoading();

    const response = await apiQuiz.post(
      "/savequiz",
      {
        quizData,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}
