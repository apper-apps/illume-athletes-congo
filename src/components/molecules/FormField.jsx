import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  required,
  options,
  className,
  ...props 
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      <Label required={required}>
        {label}
      </Label>
      {type === "select" ? (
        <Select error={error} {...props}>
          <option value="">Sélectionner...</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          error={error}
          {...props}
        />
      )}
      {error && (
        <p className="text-sm text-error-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;