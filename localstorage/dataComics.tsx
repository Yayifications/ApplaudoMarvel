

type GetAllComics = () => {[key:string]:string}
type SaveComic = (elementId : string,url : string) => void;
type GetComic = (elementId: string) => boolean;
type DeleteComic = (elementId : string) => void;
type DataComicsReturn = [GetAllComics,SaveComic,GetComic,DeleteComic];

const dataComics = () : DataComicsReturn =>{
    const getAllComics : GetAllComics= () =>{
        const storageData = localStorage.getItem('comic');
        const data = JSON.parse(storageData);
        if(data){
            return data;
        }
        return [];
    }
    
    const saveComic : SaveComic = (elementId,url) =>{
        const storageData = localStorage.getItem('comic');
        let data = JSON.parse(storageData);
        if(!data){
            data = {};
        }
        data[elementId] = url;
        localStorage.setItem('comic',JSON.stringify(data));
      
    }
    
    const getComic : GetComic = (elementId) => {
        const storageData = localStorage.getItem('comic');
        const data = JSON.parse(storageData);
        if(data && data[elementId]) return true;
        return false;
    }
    
    const deleteComic : DeleteComic = (elementId) => {
        const storageData = localStorage.getItem('comic');
        const data = JSON.parse(storageData);
        if(data){
            delete data[elementId];
            localStorage.setItem('comic',JSON.stringify(data));
        }
      
    }

    return [getAllComics,saveComic,getComic,deleteComic];
}

export default dataComics;