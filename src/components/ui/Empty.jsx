import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Aucun athlète enregistré",
  description = "Commencez par enregistrer votre premier athlète congolais dans la base de données.",
  actionText = "Enregistrer un athlète",
  actionPath = "/enregistrer",
  icon = "Users"
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-primary-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(actionPath)}
        className="btn btn-primary flex items-center gap-2 px-8 py-3 text-lg"
      >
        <ApperIcon name="Plus" className="w-5 h-5" />
        {actionText}
      </motion.button>
    </motion.div>
  );
};

export default Empty;