type ButtonProps3 = React.ComponentProps<"button">;

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
  else btnVariant = "bg-secondary text-white";

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
