import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      path: "/",
      icon: "Home",
      label: "Accueil",
    },
    {
      path: "/enregistrer",
      icon: "UserPlus",
      label: "Enregistrer",
    },
    {
      path: "/athletes",
      icon: "Users",
      label: "Athlètes",
    },
    {
      path: "/statistiques",
      icon: "BarChart3",
      label: "Stats",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
    >
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 relative transition-colors duration-200",
                isActive 
                  ? "text-primary-500" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-full"
                />
              )}
              
              <ApperIcon 
                name={item.icon} 
                className={cn(
                  "w-5 h-5 transition-all duration-200",
                  isActive && "transform scale-110"
                )} 
              />
              <span className={cn(
                "text-xs font-medium transition-colors duration-200",
                isActive && "text-primary-600"
              )}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;