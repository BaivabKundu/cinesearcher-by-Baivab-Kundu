import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";

const EmptyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="my-96 flex h-full justify-center">
      <NoData title={t("displayMessages.emptySearch")} />
    </div>
  );
};

export default EmptyPage;
