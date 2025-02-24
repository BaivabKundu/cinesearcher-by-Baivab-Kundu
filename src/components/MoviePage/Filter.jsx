import { useState, useEffect } from "react";

import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Filter as FilterIcon, Close } from "neetoicons";
import { Dropdown, Checkbox, Input, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { yearSchema, DEFAULT_PAGE_NUMBER } from "./constants";

const Filter = ({ searchTerm }) => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const [yearInput, setYearInput] = useState(queryParams.year || "");
  const [yearError, setYearError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUpdateYearParams = useFuncDebounce(yearValue => {
    const params = {
      ...queryParams,
      year: yearValue || undefined,
      page: searchTerm ? DEFAULT_PAGE_NUMBER : undefined,
    };
    history.push(buildUrl(routes.movies, filterNonNull(params)));
  });

  useEffect(() => {
    setYearInput(queryParams.year || "");
  }, [queryParams.year]);

  const handleYearChange = async value => {
    setYearInput(value);
    try {
      await yearSchema.validate(value);
      setYearError("");
      handleUpdateYearParams(value);
    } catch (error) {
      setYearError(error.message);
    }
  };

  const handleTypeChange = typeValue => {
    let newType;

    if (!queryParams.type) {
      newType = typeValue === "movie" ? "series" : "movie";
    } else if (queryParams.type === typeValue) {
      newType = undefined;
    } else {
      newType = undefined;
    }

    const params = {
      ...queryParams,
      type: newType,
      page: searchTerm ? DEFAULT_PAGE_NUMBER : undefined,
    };
    history.push(buildUrl(routes.movies, filterNonNull(params)));
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Dropdown
      closeOnSelect={false}
      isOpen={isDropdownOpen}
      customTarget={
        <FilterIcon
          className="h-5 w-5 cursor-pointer text-gray-700"
          onClick={() => setIsDropdownOpen(true)}
        />
      }
      onClose={() => setIsDropdownOpen(false)}
    >
      <div className="p-5">
        <div className="flex justify-end">
          <Close
            className="h-4 w-4 cursor-pointer"
            onClick={handleDropdownClose}
          />
        </div>
        <div className="mb-4">
          <Typography className="mb-2 font-medium" variant="body1">
            {t("labelText.year")}
          </Typography>
          <Input
            className="w-full"
            error={yearError}
            pattern="[0-9]*"
            placeholder={t("inputPlaceholders.yearInput")}
            type="number"
            value={yearInput}
            onChange={event => handleYearChange(event.target.value)}
            onKeyDown={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onPaste={event => {
              const pastedText = event.clipboardData.getData("text");
              if (!/^\d+$/.test(pastedText)) {
                event.preventDefault();
              }
            }}
          />
        </div>
        <div>
          <Typography className="mb-2 font-medium" variant="body1">
            {t("labelText.type")}
          </Typography>
          <div className="flex gap-6">
            <Checkbox
              checked={!queryParams.type || queryParams.type === "movie"}
              label={t("labelText.movie")}
              onChange={() => handleTypeChange("movie")}
            />
            <Checkbox
              checked={!queryParams.type || queryParams.type === "series"}
              label={t("labelText.series")}
              onChange={() => handleTypeChange("series")}
            />
          </div>
        </div>
      </div>
    </Dropdown>
  );
};

export default Filter;
