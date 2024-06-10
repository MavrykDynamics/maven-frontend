import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../utils/interfaces";
import {LIGHT_THEME, SPACE_THEME, themeSetterAction, ThemeType} from "../../../redux/actions/preferences.action";
import {useCallback} from "react";
import Toggle from "react-toggle";
import {HeaderIcon} from "../Header/Header.style";

export const ThemeToggle = () => {
    const dispatch = useDispatch()
    const darkThemeEnabled = useSelector((state: State) => state.preferences.themeSelected !== LIGHT_THEME)
    const setNewThemeHandler = useCallback((newTheme: ThemeType) => dispatch(themeSetterAction(newTheme)), [])

    const handleThemeToggle = () => {
        setNewThemeHandler(darkThemeEnabled ? LIGHT_THEME : SPACE_THEME)
    }
    return (
        <>
            <label>
                <Toggle
                    //defaultChecked={themeMode}
                    defaultChecked={darkThemeEnabled}
                    icons={{
                        checked: <HeaderIcon src="/images/moon.svg" />,
                        unchecked: <HeaderIcon src="/images/sun.svg" />,
                    }}
                    aria-label="Dark mode toggle"
                    onChange={handleThemeToggle}
                />
            </label>
        </>
    )
}
