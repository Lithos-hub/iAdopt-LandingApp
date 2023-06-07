import { FC, useEffect, useRef } from "react";

interface Props {
  html: string;
}

const TextHtml: FC<Props> = ({ html }) => {
  const htmlRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (htmlRef.current) {
      htmlRef.current.innerHTML = html;
    }
  }, [html]);

  return <span ref={htmlRef} />;
};

export default TextHtml;
