import React from "react";

function Toggle() {
  return (
    <div className="mx-auto my-2 flex-end">
      <label className="toggleSwitch">
        <input type="checkbox" name="toggle" id="toggle" className="toggle" />
        <span className="content"></span>
        <span className="text" id="toggleValue" off="Color" on="Texture"></span>
      </label>
    </div>
  );
}

export default Toggle;
