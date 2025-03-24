import { t } from "i18next";
import { NoData } from "neetoui";
import routes from "routes";
import withTitle from "utils/withTitle";

const PageNotFound = () => (
  <div className="mt-96 flex h-full justify-center">
    <NoData
      title={t("messages.error.notFound.title")}
      primaryButtonProps={{
        label: t("messages.error.notFound.description"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withTitle(PageNotFound, t("messages.error.notFound.title"));
