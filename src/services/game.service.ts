import { Game } from "../models/Game";
import fetchAPI from "../utils/FetchAPI";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE + '/games';

export class GameService {

    static async getGames() {
        const response = await fetch(API_URL_BASE + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        return await response.json();
    }

    static async getGameById(id: number) {
        try {
            const response = await fetch(API_URL_BASE + '/' + id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Error al obtener el juego");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }

    static async createGame(game: Partial<Game>) {
        try {
            const response = await fetchAPI(API_URL_BASE + '/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Error al crear el juego");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }


    //Te añades como participante del juego, que se le pasa como id en la url
    static async enterGame(gameId: number) {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/${gameId}/entergame`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include" // Para enviar la cookie JWT
            });

            if (!response.ok) {
                throw new Error("No se pudo entrar al juego");
            }

            return await response.json();
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Error desconocido";
            throw new Error(msg);
        }
    }
}