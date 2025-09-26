import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const AthleteCard = ({ athlete, index = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/athletes/${athlete.Id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="card cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50 border-2 hover:border-primary-200"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          {athlete.photoUrl ? (
            <img
              src={athlete.photoUrl}
              alt={`${athlete.prenom} ${athlete.nom}`}
              className="w-20 h-20 rounded-xl object-cover shadow-md border-2 border-white"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center shadow-md border-2 border-white">
              <ApperIcon name="User" className="w-8 h-8 text-primary-500" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-primary-500 text-white rounded-full p-1">
            <ApperIcon name="Trophy" className="w-3 h-3" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 truncate font-display">
            {athlete.prenom} {athlete.nom}
          </h3>
          <p className="text-sm text-gray-600 font-medium mb-1">
            {athlete.postnom}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <div className="px-2 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-medium rounded-full">
              {athlete.disciplineSportive}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" className="w-3 h-3" />
              {format(new Date(athlete.dateNaissance), "dd/MM/yyyy", { locale: fr })}
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="MapPin" className="w-3 h-3" />
              <span className="truncate max-w-24">{athlete.adresse}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <ApperIcon name="ChevronRight" className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default AthleteCard;