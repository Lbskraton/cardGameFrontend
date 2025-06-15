import { Deck } from "../models/Deck"
import fetchAPI from "../utils/FetchAPI"

const API_URL_BASE=import.meta.env.VITE_API_URL_BASE+'/decks'


export class DeckService{

    static async getDecks(){
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

    static async getDeckCards(id:number){

    try{
         const response=await fetch(API_URL_BASE+'/'+id+'/',
                {method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                        //token si hubiera
                    },
                    credentials: "include" //para poder inyectar la cookie si se puede
                    
                })

             if(!response.ok){
                throw new Error("Error al inciar sesion")
            }
            
            return await response.json()

            

        } catch (error) {
            const msg= error instanceof Error ? error.message : "Error desconocido"
            throw new Error(msg)
        }
    }

    static async saveDeck(deck:Partial<Deck>){
        try{

            const response= await fetchAPI(API_URL_BASE+'/',{method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                            //token si hubiera
                        },
                        body: JSON.stringify(deck),
                        credentials: "include" //para poder inyectar la cookie si se puede 
                
                })

            if(!response.ok){
                throw new Error("Error al inciar sesion")
            }
            
            return await response.json()

        }catch (error) {
            const msg= error instanceof Error ? error.message : "Error desconocido"
            throw new Error(msg)
        }

        

    }

    static async saveCardToDeck(){}

}