import { useCallback, useEffect, useState } from "react";
import { IApp } from "../types";
import Button from "./Button";
import { EyeClosedIcon, EyeIcon, SaveIcon } from "lucide-react";

type PasswordFormProps = {
  onSave: (formData: IApp | Omit<IApp, "_id">) => void;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  data?: Omit<IApp, "_id">;
  editMode?: boolean;
};

const PasswordForm = ({
  onSave,
  onCancel,
  editMode = false,
  data
}: PasswordFormProps) => {
  const [formData, setFormData] = useState<Omit<IApp, "_id">>({
    name: "",
    username: "",
    password: "",
    website: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (editMode && data) {
      setFormData(data);
    }
  }, [editMode, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (e.target.name === "password" && e.target.value.length > 0) {
      setPasswordTouched(true);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: "",
      username: "",
      password: "",
      website: ""
    });
  };

  const validatePassword = useCallback(() => {
    const lengthRegex = /.{8,}/; // At least 8 characters
    const numberRegex = /\d/; // At least 1 number
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // At least 1 special character

    if (!lengthRegex.test(formData.password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!numberRegex.test(formData.password)) {
      return "Password must contain at least one number.";
    }
    if (!specialCharRegex.test(formData.password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  }, [formData.password]);

  useEffect(() => {
    const err = validatePassword();
    if (passwordTouched) setPasswordErr(err);

    return () => {
      setPasswordTouched(false);
    };
  }, [formData.password, validatePassword, passwordTouched]);

  return (
    <>
      <form className="grid grid-cols-2 gap-x-4">
        <div className="mb-3">
          <label htmlFor="name">Application Name</label>
          <input
            type="text"
            placeholder="App Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              className={passwordErr ? "border border-red-500" : ""}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {!showPassword ? (
              <EyeClosedIcon
                onClick={handlePasswordToggle}
                className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/3 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={handlePasswordToggle}
                className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/3 cursor-pointer"
              />
            )}
          </div>
          {passwordErr && (
            <div>
              <p className="text-red-500 text-sm">{passwordErr}</p>
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <Button onClick={handleSubmit}>
            <SaveIcon size={"16"} />
          </Button>

          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default PasswordForm;
