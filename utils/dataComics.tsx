type GetAllComics = () => { [key: string]: string };
type SaveComic = (elementId: string, url: string) => void;
type GetComic = (elementId: string) => boolean;
type DeleteComic = (elementId: string) => void;
type DataComicsReturn = [GetAllComics, SaveComic, GetComic, DeleteComic];


 export const getAllComics: GetAllComics = () => {
    const storageData = localStorage.getItem("comic");
    const comicData = JSON.parse(storageData);
    if (comicData) {
      return comicData;
    }
    return [];
  };

export const saveComic: SaveComic = (comicId, url) => {
    const storageData = localStorage.getItem("comic");
    let comicData = JSON.parse(storageData);
    if (!comicData) {
      comicData = {};
    }
    comicData[comicId] = url;
    localStorage.setItem("comic", JSON.stringify(comicData));
  };

 export const getComic: GetComic = (comicId) => {
    const storageData = localStorage.getItem("comic");
    const comicData = JSON.parse(storageData);
    if (comicData && comicData[comicId]) return true;
    return false;
  };

  export const deleteComic: DeleteComic = (comicId) => {
    const storageData = localStorage.getItem("comic");
    const comicData = JSON.parse(storageData);
    if (comicData) {
      delete comicData[comicId];
      localStorage.setItem("comic", JSON.stringify(comicData));
    }
  };

 

