import GameType from "../models/GameType"
import fetchAPI from "../utils/FetchAPI"

const API_URL_BASE=import.meta.env.VITE_API_URL_BASE+'/gameType'


export class GameTypeService{

    static async saveGameType(gt:GameType){
        
        return await fetchAPI(API_URL_BASE+'/',{method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                    //token si hubiera
                },
                body: JSON.stringify(gt),
                credentials: "include" //para poder inyectar la cookie si se puede 
        
        })
    }

    static async getGameTypes(){
            console.log('URL falla?'+API_URL_BASE+'/')
            const response=await fetch(API_URL_BASE+'/',
                {method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                        //token si hubiera
                    },
                    credentials: "include" //para poder inyectar la cookie si se puede
                    
                })
            
            return await response.json()
        
    }


    static async getGameTypeById(id:number) {
    const response = await fetch(API_URL_BASE+'/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // Puedes añadir aquí el token si es necesario
        },
        credentials: "include" // para enviar cookies si es necesario
    });

    return await response.json();
}



    

}