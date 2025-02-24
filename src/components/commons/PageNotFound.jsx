import { t } from "i18next";
import { NoData } from "neetoui";
import routes from "routes";
import withTitle from "utils/withTitle";

const PageNotFound = () => (
  <div className="mt-96 flex h-full justify-center">
    <NoData
      title={t("errorPages.notFound.title")}
      primaryButtonProps={{
        label: t("errorPages.notFound.description"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withTitle(PageNotFound, t("errorPages.notFound.title"));
