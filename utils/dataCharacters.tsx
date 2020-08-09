type GetAllCharacters = () => { [key: string]: string };
type SaveCharacter = (elementId: string, url: string) => void;
type GetCharacter = (elementId: string) => boolean;
type deleteCharacter = (elementId: string) => void;

export const getAllCharacters: GetAllCharacters = () => {
  const storageData = localStorage.getItem("character");
  const data = JSON.parse(storageData);
  if (data) {
    return data;
  }
  return {};
};

export const saveCharacter: SaveCharacter = (characterId, url) => {
  const storageData = localStorage.getItem("character");
  let charactersData = JSON.parse(storageData);
  if (!charactersData) {
    charactersData = {};
  }
  charactersData[characterId] = url;
  localStorage.setItem("character", JSON.stringify(charactersData));
};

export const getCharacter: GetCharacter = (characterId) => {
  const storageData = localStorage.getItem("character");
  const characterData = JSON.parse(storageData);
  if (characterData && characterData[characterId]) return true;
  return false;
};

export const deleteCharacter: deleteCharacter = (characterId) => {
  const storageData = localStorage.getItem("character");
  const characterData = JSON.parse(storageData);
  if (characterData) {
    delete characterData[characterId];
    localStorage.setItem("character", JSON.stringify(characterData));
  }
};
