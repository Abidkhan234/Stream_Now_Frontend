import { useField } from "formik";
import {
  AnimatePresence, motion

} from "motion/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPassword = ({ name, placeholder, noError = false, labelText }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [field, meta] = useField(name);

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center border rounded-[22px] px-4 sm:ps-3 w-full ${!noError && meta.touched && meta.error
          ? "border-red-500"
          : "border-[#313131]"
          }`}
      >
        <div className="w-full overflow-hidden">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            autoComplete="off"
            id={name}
            className={`py-3 bg-transparent text-white placeholder:text-white placeholder:opacity-80 text-base outline-none w-full`}
            {...field}
          />
        </div>
        <button
          type="button"
          className="text-2xl cursor-pointer shrink-0"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {!noError && (
        <AnimatePresence>
          {meta.touched && meta.error && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="text-red-500 sm:text-sm text-xs ms-2 text-start pt-1 absolute">
              {meta.error}
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default InputPassword;
