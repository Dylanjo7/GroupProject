/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"

export default function App() {
  const [table, setTable] = useState({side: [], bottom: []});
  const [inputs, setInputs] = useState([]);
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
    }
    catch (e) 
    {
      console.log(e)
    }
  }

  function inputClicked(e, i, j) {
    const newInputs = inputs.map((row) => [...row]);

    newInputs[i][j] = e.target.checked;

    setInputs(newInputs);

    checkWin(newInputs);
  }

  // A puzzle can have more than one valid answer, so compare against the clues
  // instead of the generated grid.
  function checkWin(grid) {
    const win = grid.every((row, i) =>
      row.reduce((sum, cell, j) => sum + (cell ? j + 1 : 0), 0) === table.side[i]
    ) && grid[0].every((_, j) =>
      grid.reduce((sum, row, i) => sum + (row[j] ? i + 1 : 0), 0) === table.bottom[j]
    );
    if (win) {
      setTimeout(() => alert("You won!"), 0);
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
      inputRows[i][j] = <td key={j}><input type="checkbox" checked={inputs[i]? inputs[i][j] : false} onChange={(e) => inputClicked(e, i, j)}></input></td>
    }
  }

  const topRow = [];

  for (let i = 0; i < gridSize; i++) {
    topRow[i] = <td key={i}>{i + 1}</td>
  }

  return (
    <>
      <header>
        <h1>Kakurasu</h1>
        <p>Check cells so each row and column adds up to its clue. A cell is worth its column number in its row, and its row number in its column.</p>
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
              return <tr key={index}><td>{index + 1}</td>{row}<td>{table.side[index]}</td><td className="currentNum">{currentSideNums[index]}</td></tr>;
              })}
            <tr><td></td>{table.bottom.map((value, j) => <td key={j}>{value}</td>)}<td></td></tr>
            <tr><td className="currentNum"></td>{currentBottomNums.map((value, j) => <td key={j} className="currentNum">{value}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
