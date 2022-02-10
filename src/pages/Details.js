import { useSelector } from "react-redux";

function Details() {
  const details = useSelector((state) => state.details);

  if (details.loading) {
    return <div>Loading...</div>;
  }

  const { name, birth_year, skin_color, mass } = details.data;

  return (
    <div>
      <h1>{name}</h1>
      <h4>Birth year: {birth_year}</h4>
      <p>
        skin: {skin_color}; Mass: {mass}
      </p>
    </div>
  );
}

export default Details;
