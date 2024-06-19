import { useEffect, useRef, useState } from "react";
import "./style.css";
import Card from "./components/Card";
import randomiseArr from "./utilities/randomiseArr";

function App() {
  const [charList, setList] = useState([]);
  const [highestScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  if (score == 12) {
    alert("Congratulations! You Won");
    handleReset();
  }
  useEffect(() => {
    async function getData() {
      const response = await fetch("https://narutodb.xyz/api/akatsuki", {
        mode: "cors",
      });
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
    }
    getData();
  }, [highestScore]);
  function handleChange(id) {
    let obj = charList.find((item) => item.id == id);
    console.log(obj);
    if (obj.hasOwnProperty("clicked")) {
      alert(
        "You clicked one card more than once\nGame will be reset automatically"
      );
      handleReset();
      return;
    } else {
      let temp = [...charList];
      temp.find((item) => item.id == id)["clicked"] = true;
      randomiseArr(temp);
      setList(temp);
      // console.log(temp);
      setScore((score) => score + 1);
      console.log(score);
    }
  }

  function handleReset() {
    setScore(0);
    setHighScore(score);
  }
  return (
    <div className="cont">
      <div className="scoreCard">
        <h1>Score Card</h1>
        <h2>Score : {score}</h2>
        <h3>Highest Score : {score > highestScore ? score : highestScore}</h3>
        <p>
          <i>Rule : Don't Click one card twice</i>
        </p>
      </div>
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
    </div>
  );
}

export default App;
