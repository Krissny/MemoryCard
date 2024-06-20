import { useEffect, useRef, useState } from "react";
import "./style.css";
import Card from "./components/Card";
import randomiseArr from "./utilities/randomiseArr";
import naruto from "./assets/naruto.gif";
import Logo from "./assets/logo.png";

function App() {
  const [charList, setList] = useState([]);
  const [highestScore, setHighScore] = useState(0);
  const [gameOver, setGame] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      // console.log("I am running");
      try {
        const response = await fetch("https://narutodb.xyz/api/akatsuki", {
          mode: "cors",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await response.json();
        setList(
          data.akatsuki.filter((char) => {
            return (
              char.id != 400 &&
              char.id != 627 &&
              char.id != 195 &&
              char.id != 166 &&
              char.id != 396 &&
              char.id != 736 &&
              char.id != 559 &&
              char.id != 735
            );
          })
        );
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
        // console.log("off loading");
      }
    }
    getData();
  }, [gameOver]);

  function handleChange(id) {
    let obj = charList.find((item) => item.id == id);
    // console.log(obj);
    if (obj.hasOwnProperty("clicked")) {
      setGame(true);
      // handleReset();
      return;
    } else {
      let temp = [...charList];
      temp.find((item) => item.id == id)["clicked"] = true;
      randomiseArr(temp);
      setList(temp);
      // console.log(temp);
      setScore((score) => score + 1);
      // console.log(score);
      if (score >= 11) {
        setGame(true);
      }
    }
  }

  function handleReset() {
    setGame(false);
    setScore(0);
    setLoading(true);
    setHighScore(score);
  }
  return (
    <div className="cont">
      {loading && (
        <div
          className="loading"
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <img
            src={naruto}
            style={{
              height: "120px",
            }}
          ></img>
          <h1>Loading...</h1>
        </div>
      )}
      {!loading && (
        <div className="scoreCard">
          <div className="header">
            <img src={Logo} alt="" />
            <h1>Memory Game</h1>
          </div>
          <div className="score">
            <h2 className="curr">Score : {score}</h2>
            <h2 className="high">
              Highest Score : {score > highestScore ? score : highestScore}
            </h2>
          </div>
          <div className="rule">
            <p>
              <i>Rule : Don't click one card more than once</i>
            </p>
          </div>
        </div>
      )}
      {!loading && (
        <div className="cards">
          {charList.map((char) => {
            return (
              <Card
                key={char.id}
                id={char.id}
                name={char.name}
                picture={char.images[0]}
                onClick={handleChange}
              ></Card>
            );
          })}
        </div>
      )}
      {gameOver && (
        <div className="gameOver">
          <h1>{score >= 12 ? "Congratulation! You Won" : "Game Over"}</h1>
          <h2>Score : {score}</h2>
          <h2>Highest score : {score > highestScore ? score : highestScore}</h2>
          <button onClick={handleReset}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
