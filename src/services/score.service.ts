import { Score } from "../models/Score";
import fetchAPI from "../utils/FetchAPI";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE + '/score';

export class ScoreService {

  
  static async createScore(idRound:number,score: Partial<Score>) {
    try {
      const response = await fetchAPI(API_URL_BASE+'/'+idRound, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(score),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al crear el score");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      throw new Error(msg);
    }
  }

  /*
  static async getScoresByRound(idRound: number) {
    try {
      const response = await fetchAPI(API_URL_BASE+'/round/'+idRound, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al obtener los scores de la ronda");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      throw new Error(msg);
    }
  }*/

 
  static async updateScore(idRound: number,score: Partial<Score>) {
    try {
      const response = await fetchAPI(API_URL_BASE+'/'+idRound, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(score),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el score");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      throw new Error(msg);
    }
  }

  
  static async delete(idRound: number, idGameParticipant: number) {
    try {
      const response = await fetchAPI(API_URL_BASE+'/'+idRound, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idRound, idGameParticipant }),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el score");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      throw new Error(msg);
    }
  }


  
}