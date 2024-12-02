// type Color = "red" | "blue" | "green";

// type ButtonProps = {
//   style: {
//     backgroundColor: Color;
//     textColor: Color;
//     fontSize: number;
//     pillShape?: boolean;
//     padding: number[];
//     margin: [number, number, number]; // tuple- array with particular type for particular elemts
//   };
// };

// type ButtonProps2 = {
//   style: React.CSSProperties;
// };

type ButtonProps3 = React.ComponentProps<"button">;

// type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
//     variant?: 'primary'
//      'secondary'
// }

// type ButtonProps4 = Omit<ButtonProps, 'style'>

type Variant = "outline" | "primary" | "danger";

type ButtonProps = {
  variant?: Variant;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  variant = "primary",
  onClick
}: ButtonProps & ButtonProps3) {
  let btnVariant = "";

  if (variant === "outline")
    btnVariant = "border border-transparent text-white";
  else if (variant === "danger") btnVariant = "bg-red-800 text-white";
  else btnVariant = "bg-[#3a3a3a] text-white";

  return (
    <>
      <button
        className={`rounded text-xs px-4 py-2 ${btnVariant}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
