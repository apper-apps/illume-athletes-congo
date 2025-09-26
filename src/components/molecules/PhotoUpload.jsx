import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const PhotoUpload = ({ value, onChange, error, className }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange?.(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200",
          isDragOver 
            ? "border-primary-500 bg-primary-50" 
            : "border-gray-300 hover:border-primary-400 hover:bg-gray-50",
          error && "border-error-500",
          "min-h-[200px] flex flex-col items-center justify-center"
        )}
      >
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt="Photo de l'athlète"
              className="w-32 h-32 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-200 flex items-center justify-center">
              <ApperIcon name="Edit" className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ApperIcon name="Camera" className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">
              Ajouter une photo
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Glissez-déposez une image ou cliquez pour sélectionner
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ApperIcon name="Image" className="w-4 h-4" />
              JPG, PNG, GIF jusqu'à 5MB
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </motion.div>
      
      {error && (
        <p className="text-sm text-error-500">{error}</p>
      )}
    </div>
  );
};

export default PhotoUpload;