import { chemicalguysCategories } from '../../modules/chemicalguys-ua/chemicalguysAvailableCategories';
import { meguiarsCategories } from '../../modules/meguiars-com-ua/meguiarsAvailableCategories';
import { koch_chemie_Categories } from '../../modules/koch_chemie_com_ua/koch_chemie_AvailableCategories';

import './Sidebar.scss';

export const Sidebar = ({ userSelectSite, setUserSelectCategory, language }) => {
    let selectedSite = userSelectSite?.altLogo;
    // console.log('[selectedSite]', selectedSite);

    let filteredCategories = null;

    if (selectedSite && selectedSite === 'Chemicalguys.ua') {
        filteredCategories = chemicalguysCategories.filter(
            ({ siteName }) => siteName === selectedSite
        );
    }

    if (selectedSite && selectedSite === 'Meguiars.com.ua') {
        filteredCategories = meguiarsCategories.filter(
            ({ siteName }) => siteName === selectedSite
        );
    }

    if (selectedSite && selectedSite === 'Koch-chemie.com.ua') {
        filteredCategories = koch_chemie_Categories.filter(
            ({ siteName }) => siteName === selectedSite
        );
    }

    const handleCategorySelect = e => {
        let detectedCategoryName = e.target.firstChild.data;
        // console.log('[detectedCategoryName]', detectedCategoryName);

        const getSelectedCategory = availableCategories => {
            let selectedCategory = null;

            availableCategories.forEach(({ categories }) => {
                categories.forEach(siteObj => {
                    if (siteObj.categoryName === detectedCategoryName) {
                        selectedCategory = siteObj;
                    } else {
                        siteObj.subcategories &&
                            siteObj.subcategories.forEach(siteObj => {
                                siteObj.categoryName === detectedCategoryName &&
                                    (selectedCategory = siteObj);

                                siteObj.categoryName !== detectedCategoryName &&
                                    siteObj.subcategories &&
                                    siteObj.subcategories.forEach(siteObj => {
                                        siteObj.categoryName === detectedCategoryName &&
                                            (selectedCategory = siteObj);

                                        siteObj.categoryName !== detectedCategoryName &&
                                            siteObj.subcategories &&
                                            siteObj.subcategories.forEach(siteObj => {
                                                siteObj.categoryName === detectedCategoryName &&
                                                    (selectedCategory = siteObj);
                                            });
                                    });
                            });
                    }
                });
            });

            return setUserSelectCategory(selectedCategory);
        };

        selectedSite === 'Chemicalguys.ua' && getSelectedCategory(chemicalguysCategories);
        selectedSite === 'Meguiars.com.ua' && getSelectedCategory(meguiarsCategories);
        selectedSite === 'Koch-chemie.com.ua' && getSelectedCategory(koch_chemie_Categories);
    };

    return (
        <aside className="sidebar">
            <p className="sidebar__title">
                {!language && 'Available categories'}
                {language === 'EN' && 'Available categories'}
                {language === 'UA' && 'Доступні категорії'}
                {language === 'RU' && 'Доступные категории'}
            </p>

            <ul className="sidebar__categories-list">
                {filteredCategories
                    ? filteredCategories[0].categories.map(
                          ({ categoryId, categoryName, subcategories }) => {
                              return (
                                  <li
                                      key={categoryId}
                                      className="sidebar__categories-top-item"
                                      onClick={handleCategorySelect}
                                  >
                                      {categoryName}

                                      <ul className="sidebar__subcategories-list">
                                          {subcategories && subcategories.length
                                              ? subcategories.map(
                                                    ({
                                                        categoryId,
                                                        categoryName,
                                                        subcategories
                                                    }) => {
                                                        return (
                                                            <li
                                                                key={categoryId}
                                                                className="sidebar__subcategories-item"
                                                                onClick={handleCategorySelect}
                                                            >
                                                                {categoryName}

                                                                <ul className="sidebar__sub-subcategories-list">
                                                                    {subcategories &&
                                                                    subcategories.length
                                                                        ? subcategories.map(
                                                                              ({
                                                                                  categoryId,
                                                                                  categoryName,
                                                                                  subcategories
                                                                              }) => {
                                                                                  return (
                                                                                      <li
                                                                                          key={
                                                                                              categoryId
                                                                                          }
                                                                                          className="sidebar__sub-subcategories-item"
                                                                                          onClick={
                                                                                              handleCategorySelect
                                                                                          }
                                                                                      >
                                                                                          {
                                                                                              categoryName
                                                                                          }

                                                                                          <ul className="sidebar__sub-sub-subcategories-list">
                                                                                              {subcategories &&
                                                                                              subcategories.length
                                                                                                  ? subcategories.map(
                                                                                                        ({
                                                                                                            categoryId,
                                                                                                            categoryName,
                                                                                                            subcategories
                                                                                                        }) => {
                                                                                                            return (
                                                                                                                <li
                                                                                                                    key={
                                                                                                                        categoryId
                                                                                                                    }
                                                                                                                    className="sidebar__sub-sub-subcategories-item"
                                                                                                                    onClick={
                                                                                                                        handleCategorySelect
                                                                                                                    }
                                                                                                                >
                                                                                                                    {
                                                                                                                        categoryName
                                                                                                                    }
                                                                                                                </li>
                                                                                                            );
                                                                                                        }
                                                                                                    )
                                                                                                  : null}
                                                                                          </ul>
                                                                                      </li>
                                                                                  );
                                                                              }
                                                                          )
                                                                        : null}
                                                                </ul>
                                                            </li>
                                                        );
                                                    }
                                                )
                                              : null}
                                      </ul>
                                  </li>
                              );
                          }
                      )
                    : null}
            </ul>
        </aside>
    );
};
