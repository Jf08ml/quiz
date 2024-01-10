import { apiQuestion } from "./api";
import { showLoading, hideLoading } from "../stores/loadingStore.js";
import { useAuthStore } from "../stores/auth.js";

const useAuth = useAuthStore();
const token = useAuth.token;

export async function createQuestion(questionData) {
  const { text, correctAnswer, observation } = questionData;
  try {
    showLoading();

    const response = await apiQuestion.post(
      "/questions",
      {
        text,
        correctAnswer,
        observation,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}

export async function getAllQuestions() {
  try {
    showLoading();

    const response = await apiQuestion.get("/questions", {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}

export async function getQuestionById(id) {
  try {
    showLoading();

    const response = await apiQuestion.get(`/questions/${id}`, {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}

export async function updateQuestion(id, questionData) {
  const { text, correctAnswer, observation } = questionData;
  try {
    showLoading();

    const response = await apiQuestion.put(`/questions/${id}`, { text, correctAnswer, observation }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}

export async function deleteQuestion(id) {
  try {
    showLoading();

    const response = await apiQuestion.delete(`/questions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}

export async function generateQuiz() {
  try {
    showLoading();

    const response = await apiQuestion.get("/generatequiz", {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}
