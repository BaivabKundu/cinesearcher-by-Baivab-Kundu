import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import routes from "routes";
import useHomeQueryParamsStore from "stores/useHomeQueryParamsStore";
import { buildUrl } from "utils/url";

const Header = () => {
  const homeQueryParams = useHomeQueryParamsStore.pickFrom();

  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center space-x-6">
        <Typography className="font-medium">
          <span className="text-2xl text-blue-600">
            {t("header.logo.first")}
          </span>
          <span className=" text-2xl text-gray-800">
            {t("header.logo.second")}
          </span>
        </Typography>
        <NavLink
          activeClassName="text-blue-600"
          className="text-gray-600 hover:text-blue-600"
          to={buildUrl(routes.movies, homeQueryParams)}
        >
          {t("header.home")}
        </NavLink>
        <NavLink
          activeClassName="text-blue-600"
          className="text-gray-600 hover:text-blue-600"
          to={routes.favourites}
        >
          {t("header.favourites")}
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
