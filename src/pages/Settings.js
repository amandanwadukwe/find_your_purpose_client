import { useState } from "react";
import Toggle from "react-toggle";
import "../Toggle.css";

export default function Settings(props) {
  const [autosave, setAutosave] = useState(false);

  props.menu();

  return (
    <section className="settings-container">
      <div className="general">
        <p><b>General</b></p>
        <label className="toggle-label">
          <span>Autosave</span>
          <Toggle
            defaultChecked={autosave}
            className="custom-classname"
            onChange={() => setAutosave(!autosave)}
          />
        </label>
        <button type="button">Reset account</button>
      </div>
      <div className="account">
        <p><b>Account</b></p>
        <div>
            <button type="button">Change name</button>
            <button type="button">Change nickname</button>
            <button type="button">Change pronouns</button>
            <button type="button">Change password</button>
        </div>
      </div>
      <div className="privacy">
        <p><b>Privacy</b></p>
        <label className="toggle-label">
          <span>Make name visible</span>
          <Toggle
            defaultChecked={autosave}
            className="custom-classname"
            onChange={() => setAutosave(!autosave)}
          />
        </label>
      </div>
      <div className="theme">
        <p><b>Theme</b></p>
        <label className="toggle-label">
          <span>Light/Dark</span>
          <Toggle
            defaultChecked={autosave}
            className="custom-classname"
            onChange={() => setAutosave(!autosave)}
          />
        </label>
      </div>
    </section>
  );
}