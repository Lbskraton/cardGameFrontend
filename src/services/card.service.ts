import Card from "../models/Card";
import fetchAPI from "../utils/FetchAPI";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE + '/cards';

export class CardService {

  // Crear una nueva carta 
  static async createCard(cardData: Partial<Card>) {
    try {
      const response = await fetchAPI(API_URL_BASE+'/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al crear la carta");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      throw new Error(msg);
    }
  }

  // Actualizar una carta 
  static async updateCard(id: number, cardData: Partial<Card>) {
    try {
      const response = await fetchAPI(API_URL_BASE+'/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la carta");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      throw new Error(msg);
    }
  }

  // Eliminar una carta 
  static async deleteCard(id: number | string) {
    try {
      const response = await fetchAPI(API_URL_BASE+'/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la carta");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      throw new Error(msg);
    }
  }

}