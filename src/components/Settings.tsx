import { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/Settings.scss";
import {
    faBars,
    faArrowRightFromBracket,
    faGear,
    faMusic,
    faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function Settings() {
    const [settings, setSettings] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(null);

    const toggleMenu = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };


    return (
        <div className="settings">

        </div>
    );
}

export default Settings;
