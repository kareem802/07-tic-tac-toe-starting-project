import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  let [playerName, setPlayerName] = useState(initialName);
  let playerNameHolder = <span className="player-name">{playerName}</span>;
  let buttonText = "Edit";

  if (isEditing) {
    playerNameHolder = (
      <input
        required
        type="text"
        value={playerName}
        onChange={handleChange}
      ></input>
    );
    buttonText = "Save";
  }

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li>
      <span className="player">
        {playerNameHolder}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonText}</button>
    </li>
  );
}
