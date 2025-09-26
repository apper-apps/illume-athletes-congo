import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = "primary",
  trend,
  trendValue,
  className,
  index = 0
}) => {
  const colorClasses = {
    primary: "from-primary-500 to-primary-600 text-white",
    secondary: "from-secondary-500 to-secondary-600 text-gray-900",
    accent: "from-accent-500 to-accent-600 text-white",
    success: "from-success-500 to-green-600 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "card relative overflow-hidden",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-10",
        colorClasses[color]
      )} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
            colorClasses[color]
          )}>
            <ApperIcon name={icon} className="w-6 h-6" />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              trend === "up" ? "bg-success-100 text-success-700" : "bg-error-100 text-error-700"
            )}>
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                className="w-3 h-3" 
              />
              {trendValue}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900 font-display mb-1">
            {value}
          </h3>
          <p className="text-gray-600 font-medium">
            {title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;