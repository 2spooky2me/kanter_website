import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../store/furnitureSlice";

const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === "en" ? "he" : "en";
        dispatch(setLanguage(newLanguage));
    };

    return (
        <button onClick={toggleLanguage}>
            {currentLanguage === "en" ? "עברית" : "English"}
        </button>
    );
};

export default LanguageSwitcher;
