import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur">
            <ApperIcon name="Trophy" className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold font-display tracking-wide">
              RÉSEAU NATIONAL DES ATHLÈTES CONGOLAIS
            </h1>
            <p className="text-sm opacity-90 font-medium">
              République Démocratique du Congo
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-1 bg-gradient-to-r from-transparent via-white via-50% to-transparent opacity-20"></div>
    </motion.header>
  );
};

export default Header;