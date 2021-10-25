import logo from '../../resources/images/main-logo.png';
import chemicalguys_logo from '../../resources/images/sites-icons/chemicalguys.png';
import meguiars_logo from '../../resources/images/sites-icons/meguiars.png';
import koch_chemie_logo from '../../resources/images/sites-icons/koch-chemie.png';

import './Header.scss';

export const Header = ({ setUserSelectSite, setLanguage, language }) => {
    const availableSites = [
        {
            idSite: 4,
            inputId: 'chemicalguys_ua',
            inputName: 'chemicalguys_ua',
            srcLogo: chemicalguys_logo,
            altLogo: 'Chemicalguys.ua',
            url: 'https://chemicalguys.ua/'
        },
        {
            idSite: 5,
            inputId: 'meguiars_com_ua',
            inputName: 'meguiars_com_ua',
            srcLogo: meguiars_logo,
            altLogo: 'Meguiars.com.ua',
            url: 'https://meguiars.com.ua/'
        },
        {
            idSite: 6,
            inputId: 'koch_chemie_com_ua',
            inputName: 'koch_chemie_com_ua',
            srcLogo: koch_chemie_logo,
            altLogo: 'Koch-chemie.com.ua',
            url: 'https://koch-chemie.com.ua/'
        }
    ];

    const getSelectedSite = e => {
        let userClick = e.target.id;
        const [selectedSite] = availableSites.filter(({ inputId }) => {
            return inputId === userClick;
        });

        // console.log('[selectedSite]', selectedSite);
        return setUserSelectSite(selectedSite);
    };

    const handleLanguageSelect = e => {
        let userClick = e.target;

        userClick.className === 'header__laguage-en' && setLanguage('EN');
        userClick.className === 'header__laguage-ua' && setLanguage('UA');
        userClick.className === 'header__laguage-ru' && setLanguage('RU');
    }

    return (
        <header className="header">
            <section className="header__logo">
                <img src={logo} alt={'Price Parcer logo'} className="header__logo-img" />
                <p className="header__logo-subtitle">Price Parcer</p>
            </section>

            <section className="header__resources">
                <div></div>
                <div className="header__sites-for-parse">
                    {availableSites.map(({ idSite, srcLogo, altLogo, inputId, inputName }) => {
                        return (
                            <div className="header__site" key={idSite} onClick={getSelectedSite}>
                                <input type="checkbox" id={inputId} name={inputName} />
                                <label htmlFor={inputId} className="header__site-label">
                                    <img
                                        src={srcLogo}
                                        alt={altLogo}
                                        className="header__site_logo"
                                    />
                                </label>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="header__right-block">
                <p className="header__laguage-title">
                    {!language && 'Language'}
                    {language === 'EN' && 'Language'}
                    {language === 'UA' && 'Мова'}
                    {language === 'RU' && 'Язык'}
                </p>
                <div className="header__laguage-container">
                    <p className="header__laguage-en" onClick={handleLanguageSelect}>EN</p>
                    <p className="header__laguage-ua" onClick={handleLanguageSelect}>UA</p>
                    <p className="header__laguage-ru" onClick={handleLanguageSelect}>RU</p>
                </div>
            </section>
        </header>
    );
};
