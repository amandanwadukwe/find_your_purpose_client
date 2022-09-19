import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Toggle from "react-toggle";
import "../Toggle.css";
import { CSSTransition } from 'react-transition-group';

export let userEmailFromSettings;

export default function Settings(props) {
  const [autosave, setAutosave] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [newPronouns, setNewPronouns] = useState("");
  const [settingsError, setSettingsError] = useState("This feature has been disabled");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNameSetting, setShowNameSetting] = useState(false);
  const [showSettingsError, setShowSettingsError] = useState(false);
  const [showNicknameSetting, setShowNicknameSetting] = useState(false);
  const [showPronounsSetting, setShowPronounsSetting] = useState(false);
  const [showPasswordSetting, setShowPasswordSetting] = useState(false);

  props.menu();

  let {email} = useParams();

    useEffect(() => {
        userEmailFromSettings = email;
       }, [email])

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
          <div>
            <button type="button" onClick={() => {
              setShowNameSetting(true);
              setShowSettingsError(false);
              setShowNicknameSetting(false);
              setShowPasswordSetting(false);
              setShowPronounsSetting(false);
            }}>Change name</button>
            <CSSTransition
              in={showNameSetting}
              timeout={300}
              classNames="primary-navigation"
              unmountOnExit
            >
              <form >
                <span className={showSettingsError ? "display" : "hide"}>{settingsError}</span><br />
                <label>First name:<input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} /></label><br />
                <label>Last name:<input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} /></label>
                <button type="submit" onClick={(e) => {
                  e.preventDefault();
                  setShowSettingsError(true);
                }}>Change Name</button>
              </form></CSSTransition>
          </div>
          <button type="button" onClick={() => {
            setShowNameSetting(false);
            setShowSettingsError(false);
            setShowNicknameSetting(true);
            setShowPasswordSetting(false);
            setShowPronounsSetting(false);
          }}>Change nickname</button>
          <CSSTransition
            in={showNicknameSetting}
            timeout={300}
            classNames="primary-navigation"
            unmountOnExit
          >
            <form>
              <span className={showSettingsError ? "display" : "hide"}>{settingsError}</span><br />
              <label>New nickname:<input type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} /></label>

              <button type="submit" onClick={(e) => {
                e.preventDefault();
                setShowSettingsError(true);
              }}>Change Nickname</button>
            </form>
          </CSSTransition>
          <button type="button" onClick={() => {
            setShowNameSetting(false);
            setShowSettingsError(false);
            setShowNicknameSetting(false);
            setShowPasswordSetting(false);
            setShowPronounsSetting(true);
          }}>Change pronouns</button>
          <CSSTransition
            in={showPronounsSetting}
            timeout={300}
            classNames="primary-navigation"
            unmountOnExit
          >
            <form>
              <span className={showSettingsError ? "display" : "hide"}>{settingsError}</span><br />
              <label>Pronouns:<input type="text" value={newPronouns} onChange={(e) => setNewPronouns(e.target.value)} /></label>
              <button type="submit" onClick={(e) => {
                e.preventDefault();
                setShowSettingsError(true);
              }}>Change Pronouns</button>
            </form></CSSTransition>
          <button type="button" onClick={() => {
            setShowNameSetting(false);
            setShowSettingsError(false);
            setShowNicknameSetting(false);
            setShowPasswordSetting(true);
            setShowPronounsSetting(false);
          }}>Change password</button>
          <CSSTransition
            in={showPasswordSetting}
            timeout={300}
            classNames="primary-navigation"
            unmountOnExit
          >
            <form>
              <span className={showSettingsError ? "display" : "hide"}>{settingsError}</span><br />
              <label>Old password:<input type="text" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /></label><br />
              <label>New password:<input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></label>
              <button type="submit" onClick={(e) => {
                e.preventDefault();
                setShowSettingsError(true);
              }}>Change Password</button>
            </form></CSSTransition>
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