import FileLogo from "./FileLogo";
import HtmlLogo from "./HtmlLogo";
import JsLogo from "./JsLogo";
import JsonLogo from "./JsonLogo";

interface Props {
  language: string,
  className?: string,
  width?: number,
  height?: number
};

const LanguageLogo = ({
  language,
  className = "bi bi-filetype-html",
  width = 16, height
}: Props) => {
  height = height || width;

  const language2Logo: (language: string) => JSX.Element = (language: string) => {
    const dict = {
      "html": <HtmlLogo />,
      "javascript": <JsLogo />,
      "json": <JsonLogo />
    } as Record<string, JSX.Element>;
    if (dict.hasOwnProperty(language))
      return dict[language];
    else
      return <FileLogo />;
  };

  const languageLogo = language2Logo(language);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} height={height}
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      {languageLogo}
    </svg>
  );
};

export default LanguageLogo;
