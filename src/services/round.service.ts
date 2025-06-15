import Round from "../models/Round";
import fetchAPI from "../utils/FetchAPI";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE + '/rounds';

export class RoundService {

    
    static async createRound(gameId: number, roundData?: Partial<Round>) {
        try {
            const response = await fetchAPI(API_URL_BASE+'/'+gameId+'/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: roundData ? JSON.stringify(roundData) : undefined,
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Error al crear la ronda");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }

    
    static async getRoundsByGame(gameId: number) {
        try {
            const response = await fetchAPI(API_URL_BASE+'/'+gameId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Error al obtener las rondas");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }

    
    static async getLatestRoundId(gameId: number) {
        try {
            const response = await fetchAPI(API_URL_BASE+'/'+gameId+'/latest', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Error al obtener la última ronda");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }

    
    static async updateRound(gameId: number, roundData: Partial<Round>) {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/${gameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(roundData),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Error al actualizar la ronda");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }

    
    static async deleteRound(gameId: number) {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/${gameId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la ronda");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }


    static async getScoresByUserAndGame(gameId: number){
    try {
      const response = await fetchAPI(API_URL_BASE+'/'+gameId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include" // Importante para enviar el token JWT (cookie)
      });

      if (!response.ok) {
        
        throw new Error("Error al consultar puntuaciones del juego");
      }

      return await response.json();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido al obtener los scores del usuario";
      throw new Error(msg);
    }
  }
}