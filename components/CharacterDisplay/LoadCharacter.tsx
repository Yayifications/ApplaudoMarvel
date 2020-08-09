import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import CharacterDisplay from "./CharacterDisplay";
import MarvelURL from "../../utils/marvelUrl";
import axios from "axios";

const LoadCharacter: React.FC = () => {
  const router = useRouter();
  const { characterId } = router.query;
  const [perfil, setPerfil] = useState([]);

  const cargarCharacter = async () => {
    const marvel = MarvelURL("characters/" + characterId + "?");
    axios
      .get(marvel[0])
      .then((res) => {
        const data = res.data.data;
        setPerfil([...data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (characterId) {
      cargarCharacter();
    }
  }, [characterId]);

  if (perfil.length > 0) {
    return (
      <Layout>
        <CharacterDisplay
          id={perfil[0].id}
          name={perfil[0].name}
          description={
            perfil[0].description
              ? perfil[0].description
              : "We couldn't find a description."
          }
          imgURL={
            perfil[0].thumbnail.path + "." + perfil[0].thumbnail.extension
          }
          comics={perfil[0].comics.items.map((c) => c.name)}
          stories={perfil[0].stories.items.map((c) => c.name)}
        />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }
};

export default LoadCharacter;
