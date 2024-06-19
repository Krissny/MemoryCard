export default function ({ id, name, picture, onClick }) {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <img src={picture}></img>
      <h2>{name}</h2>
    </div>
  );
}
