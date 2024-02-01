import { Helmet } from "react-helmet-async";
import config from "../config";

const usePageTitle = (title: string) => {
  return (
    <Helmet>
      <title>
        {title} : {config.APP_NAME}
      </title>
    </Helmet>
  );
};

export default usePageTitle;
