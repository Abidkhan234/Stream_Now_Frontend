import { useField } from "formik";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const CheckBox = ({ name }) => {
  const [field, meta] = useField(name);

  return (
    <label htmlFor="checkbox" className="group flex items-center">
      <div className="min-[425px]:size-7 size-6 bg-[#161616] flex justify-center items-center rounded-md relative">
        <input
          id="checkbox"
          type="checkbox"
          {...field}
          checked={field.value}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <AnimatePresence>
          {field.value && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="pointer-events-none"
            >
              <Check className="max-[425px]:size-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="min-[335px]:ml-3 ml-2 text-white font-medium cursor-pointer min-[425px]:text-base text-sm">
        Remember Me
      </span>
    </label>
  );
};

export default CheckBox;
