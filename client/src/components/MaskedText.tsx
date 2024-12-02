import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

const MaskedText = ({ text }: { text: string | undefined }) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow((prev) => !prev);

  if (!text) return <></>;

  return (
    <div>
      {show ? (
        <p
          className="flex items-center gap-1 line-clamp-1 w-full"
          role="button"
        >
          <EyeIcon
            size="16"
            onMouseDown={handleToggle}
            onMouseUp={handleToggle}
          />
          {text}
        </p>
      ) : (
        <div className="flex items-center gap-1 h-full">
          <EyeClosedIcon
            size={"16"}
            onMouseDown={handleToggle}
            onMouseUp={handleToggle}
          />

          <p
            className="inline-flex items-center gap-[2px]"
            role="button"

            // onClick={handleToggle}
          >
            {text
              .slice(0, 10)
              .split("")
              .map(() => {
                return "*";
                // <span
                //   key={`${c}-${index}`}
                //   className="bg-black h-[5px] w-[5px] rounded-full"
                // ></span>
              })}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default MaskedText;
