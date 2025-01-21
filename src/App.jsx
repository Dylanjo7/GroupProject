/* eslint-disable react/react-in-jsx-scope */
import { nanoid } from "nanoid";
import { useState } from "react"

export default function App() {
  const [table, setTable] = useState({side: [], bottom: []});
  const [inputs, setInputs] = useState([]);
  const [solvedPuzzle, setSolvedPuzzle] = useState([]);
  const [gridSize, setGridSize] = useState(0);

  function generatePuzzle() {
    try 
    {
      const gridSize = Number(prompt("What size grid would you like? (3-10)"));

      if (gridSize < 3 || gridSize > 10) {
        throw new Error();
      }

      setGridSize(gridSize);

      const completedGrid = [];
      const tempInputs = [];

      for (let i = 0; i < gridSize; i++) {
        let numFound = false;
        completedGrid[i] = [];
        tempInputs[i] = [];
        for (let j = 0; j < gridSize; j++) {
          tempInputs[i][j] = false;
          if (Math.random() * 2 > 1 || !numFound && gridSize - 1 === j) {
            completedGrid[i].push(1);
            numFound = true;
          }
          else 
          {
            completedGrid[i].push(0);
          }
        }
      }

      setInputs(tempInputs);

      const newSideNums = [];

      const newBottomNums = [];

      completedGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (!newBottomNums[j])
            {
              newBottomNums[j] = 0;
            }
          if (!newSideNums[i]) 
            {
              newSideNums[i] = 0;
            }
          if (cell) {
            newSideNums[i] += (j + 1);
            newBottomNums[j] += (i + 1);
          }
        })
      })

      setTable({side: newSideNums, bottom: newBottomNums});
      setSolvedPuzzle(completedGrid);
    }
    catch (e) 
    {
      console.log(e)
    }
  }

  function inputClicked(e, i, j) {
    const newInputs = [...inputs];

    newInputs[i][j] = e.target.checked;

    setInputs(newInputs);

    checkWin();
  }
  
  function checkWin() {
    let win = true;
    inputs.forEach((inputRow, i) => {
      inputRow.forEach((input, j) => {
      if (Boolean(solvedPuzzle[i][j]) !== input) {
        win = false;
      }
    })})
    if (win === true) {
      alert("You WOn!!!!")
    }
  }

  const currentSideNums = [];
  const currentBottomNums = [];

  inputs.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!currentBottomNums[j])
        {
          currentBottomNums[j] = 0;
        }
      if (!currentSideNums[i]) 
        {
          currentSideNums[i] = 0;
        }
      if (cell) {
        currentSideNums[i] += (j + 1);
        currentBottomNums[j] += (i + 1);
      }
    })
  })

  const inputRows = [];

  for (let i = 0; i < gridSize; i++) {
    inputRows[i] = []
    for (let j = 0; j < gridSize; j++) {
      inputRows[i][j] = <td key={nanoid()}><input type="checkbox" checked={inputs[i]? inputs[i][j] : false} onChange={(e) => inputClicked(e, i, j)}></input></td>
    }
  }

  const topRow = [];

  for (let i = 0; i < gridSize; i++) {
    topRow[i] = <td>{i + 1}</td>
  }

  return (
    <>
      <header>
        <h1>Kakurasu (like the sins of the father one from osrs) (Dylan's Version)</h1>
        <button onClick={generatePuzzle}>Generate New Puzzle</button>
      </header>
      <div>
        <table>
          <tbody>
            <tr>
              <td></td>
              {topRow}
              <td></td>
            </tr>
            {inputRows.map((row, index) => {
              return <tr key={nanoid()}><td>{index + 1}</td>{row}<td>{table.side[index]}</td><td className="currentNum">{currentSideNums[index]}</td></tr>;
              })}
            <tr><td></td>{table.bottom.map((value) => <td key={nanoid()}>{value}</td>)}<td></td></tr>
            <tr><td className="currentNum"></td>{currentBottomNums.map((value) => <td key={nanoid()} className="currentNum">{value}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
