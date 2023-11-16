import React from "react";

function Toggle({onToggleChange}) {
    const handleToggle = () => {
      onToggleChange();
    };
  return (
    <div className="mx-auto my-2">
      <label className="toggleSwitch">
        <input type="checkbox" name="toggle" id="toggle" className="toggle" onChange={handleToggle} />
        <span className="content"></span>
        <span className="text" id="toggleValue" off="Color" on="Texture"></span>
      </label>
    </div>
  );
}

export default Toggle;
