export default params => {
    const apiKey = process.env.MARVEL_API;
    const url = `https://gateway.marvel.com/v1/public/${params}&apikey=${apiKey}`;
    return [url, apiKey];
  };