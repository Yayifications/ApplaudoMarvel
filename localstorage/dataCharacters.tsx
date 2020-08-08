import { type } from "os";

type GetAllCharacters = () => {[key:string]:string}
type SaveCharacter = (elementId : string,url : string) => void;
type GetCharacter = (elementId: string) => boolean;
type deleteCharacter = (elementId : string) => void;
type DataCharactersReturn = [GetAllCharacters,SaveCharacter,GetCharacter,deleteCharacter];

const dataCharacters = () : DataCharactersReturn =>{
    const getAllCharacters : GetAllCharacters = () =>{
        const storageData = localStorage.getItem('character');
        const data = JSON.parse(storageData);
        if(data){
            return data;
        }
        return {};
    };
    
    const saveCharacter : SaveCharacter = (elementId,url) =>{
        const storageData = localStorage.getItem('character');
        let data = JSON.parse(storageData);
        if(data == undefined){
            data = {};
        }
        data[elementId] = url;
        localStorage.setItem('character',JSON.stringify(data));
    };
    
    const getCharacter : GetCharacter = (elementId) =>{
        const storageData = localStorage.getItem('character');
        const data = JSON.parse(storageData);
        if(data && data[elementId]) return true;
        return false;
    }
    
    const deleteCharacter : deleteCharacter = (elementId) => {
        const storageData = localStorage.getItem('character');
        const data = JSON.parse(storageData);
        if(data){
            delete data[elementId];
            localStorage.setItem('character',JSON.stringify(data));
        }
        
    };

    return [getAllCharacters,saveCharacter,getCharacter,deleteCharacter]
}

export default dataCharacters;