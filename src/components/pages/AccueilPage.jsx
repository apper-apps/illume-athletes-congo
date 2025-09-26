import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatCard from "@/components/molecules/StatCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import athletesService from "@/services/api/athletesService";

const AccueilPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentAthletes, setRecentAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const athletes = await athletesService.getAll();
      
      // Calculate statistics
      const totalAthletes = athletes.length;
      const disciplines = [...new Set(athletes.map(a => a.disciplineSportive))];
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const newThisMonth = athletes.filter(a => 
        new Date(a.dateEnregistrement) >= thisMonth
      ).length;
      
      const avgAge = athletes.length > 0 
        ? Math.round(athletes.reduce((sum, a) => {
            const age = new Date().getFullYear() - new Date(a.dateNaissance).getFullYear();
            return sum + age;
          }, 0) / athletes.length)
        : 0;

      setStats({
        totalAthletes,
        totalDisciplines: disciplines.length,
        newThisMonth,
        avgAge
      });

      // Get 3 most recent athletes
      const recent = athletes
        .sort((a, b) => new Date(b.dateEnregistrement) - new Date(a.dateEnregistrement))
        .slice(0, 3);
      setRecentAthletes(recent);

    } catch (err) {
      setError("Impossible de charger les données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ApperIcon name="Trophy" className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
          Tableau de Bord
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gérez efficacement la base de données des athlètes congolais et suivez les statistiques en temps réel.
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Athlètes"
          value={stats?.totalAthletes || 0}
          icon="Users"
          color="primary"
          index={0}
        />
        <StatCard
          title="Disciplines"
          value={stats?.totalDisciplines || 0}
          icon="Activity"
          color="secondary"
          index={1}
        />
        <StatCard
          title="Nouveaux ce mois"
          value={stats?.newThisMonth || 0}
          icon="UserPlus"
          color="success"
          trend="up"
          trendValue="+12%"
          index={2}
        />
        <StatCard
          title="Âge moyen"
          value={`${stats?.avgAge || 0} ans`}
          icon="Calendar"
          color="accent"
          index={3}
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-gray-900 font-display mb-6">
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="primary"
            className="h-16 text-lg"
            onClick={() => navigate("/enregistrer")}
          >
            <ApperIcon name="UserPlus" className="w-6 h-6" />
            Enregistrer Athlète
          </Button>
          
          <Button
            variant="outline"
            className="h-16 text-lg"
            onClick={() => navigate("/athletes")}
          >
            <ApperIcon name="Users" className="w-6 h-6" />
            Voir Athlètes
          </Button>
          
          <Button
            variant="outline"
            className="h-16 text-lg"
            onClick={() => navigate("/statistiques")}
          >
            <ApperIcon name="BarChart3" className="w-6 h-6" />
            Statistiques
          </Button>
        </div>
      </motion.div>

      {/* Recent Athletes */}
      {recentAthletes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-display">
              Athlètes Récents
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate("/athletes")}
            >
              Voir tout
              <ApperIcon name="ArrowRight" className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentAthletes.map((athlete, index) => (
              <motion.div
                key={athlete.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(`/athletes/${athlete.Id}`)}
              >
                {athlete.photoUrl ? (
                  <img
                    src={athlete.photoUrl}
                    alt={`${athlete.prenom} ${athlete.nom}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="w-6 h-6 text-primary-500" />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {athlete.prenom} {athlete.nom}
                  </h3>
                  <p className="text-sm text-gray-600">{athlete.disciplineSportive}</p>
                </div>
                
                <ApperIcon name="ChevronRight" className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AccueilPage;