import { FC } from "react";

import Image from "next/image";

interface Props {
  name: string;
  className?: string;
}

const Icon: FC<Props> = ({ name, className }) => {
  return (
    <Image
      src={`/${name}.svg`}
      width="0"
      height="0"
      className={className}
      alt={`${name} icon`}
    />
  );
};

export default Icon;
