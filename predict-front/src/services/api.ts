/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// URL base da sua API
const API_URL = "http://localhost:5000"; // Substitua pelo seu URL da API

// Função para fazer a requisição POST para predizer a nota
export const predictGrade = async (inputData: any) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, inputData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer requisição:", error);
    throw error;
  }
};
