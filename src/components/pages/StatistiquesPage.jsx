import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import athletesService from "@/services/api/athletesService";

const StatistiquesPage = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAthletes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await athletesService.getAll();
      setAthletes(data);
    } catch (err) {
      setError("Impossible de charger les statistiques");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAthletes();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadAthletes} />;
  if (athletes.length === 0) {
    return (
      <Empty 
        title="Aucune donnée statistique"
        description="Il n'y a pas encore d'athlètes enregistrés pour générer des statistiques."
        actionText="Enregistrer un athlète"
        actionPath="/enregistrer"
        icon="BarChart3"
      />
    );
  }

  // Calculate statistics
  const totalAthletes = athletes.length;
  
  // Discipline distribution
  const disciplineStats = athletes.reduce((acc, athlete) => {
    acc[athlete.disciplineSportive] = (acc[athlete.disciplineSportive] || 0) + 1;
    return acc;
  }, {});
  
  const topDisciplines = Object.entries(disciplineStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Age distribution
  const ages = athletes.map(athlete => {
    return new Date().getFullYear() - new Date(athlete.dateNaissance).getFullYear();
  });
  
  const ageRanges = {
    "10-17 ans": ages.filter(age => age >= 10 && age <= 17).length,
    "18-25 ans": ages.filter(age => age >= 18 && age <= 25).length,
    "26-35 ans": ages.filter(age => age >= 26 && age <= 35).length,
    "36-50 ans": ages.filter(age => age >= 36 && age <= 50).length,
  };

  // Monthly registrations (last 6 months)
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    last6Months.push({
      month: date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' }),
      count: athletes.filter(athlete => {
        const athleteDate = new Date(athlete.dateEnregistrement);
        return athleteDate.getMonth() === date.getMonth() && 
               athleteDate.getFullYear() === date.getFullYear();
      }).length
    });
  }

  const avgAge = Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length);
  const totalDisciplines = Object.keys(disciplineStats).length;
  const mostPopularDiscipline = topDisciplines[0]?.[0] || "N/A";
  const thisMonthRegistrations = last6Months[5]?.count || 0;

  // Chart configurations
  const disciplineChartOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: false }
    },
    colors: ['#0066CC', '#FFCC00', '#DC143C', '#22C55E', '#F59E0B'],
    labels: topDisciplines.map(([discipline]) => discipline),
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        }
      }
    }]
  };

  const ageChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    colors: ['#0066CC'],
    xaxis: {
      categories: Object.keys(ageRanges)
    },
    yaxis: {
      title: {
        text: 'Nombre d\'athlètes'
      }
    }
  };

  const monthlyChartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false }
    },
    colors: ['#0066CC'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: last6Months.map(m => m.month)
    },
    yaxis: {
      title: {
        text: 'Enregistrements'
      }
    },
    markers: {
      size: 6
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ApperIcon name="BarChart3" className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
          Statistiques des Athlètes
        </h1>
        <p className="text-gray-600">
          Analyse complète de la base de données des athlètes congolais
        </p>
      </motion.div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Athlètes"
          value={totalAthletes}
          icon="Users"
          color="primary"
          index={0}
        />
        <StatCard
          title="Disciplines"
          value={totalDisciplines}
          icon="Activity"
          color="secondary"
          index={1}
        />
        <StatCard
          title="Âge Moyen"
          value={`${avgAge} ans`}
          icon="Calendar"
          color="accent"
          index={2}
        />
        <StatCard
          title="Ce Mois"
          value={thisMonthRegistrations}
          icon="UserPlus"
          color="success"
          trend="up"
          trendValue="+8%"
          index={3}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Discipline Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-gray-900 font-display mb-6">
            Répartition par Discipline
          </h3>
          <Chart
            options={disciplineChartOptions}
            series={topDisciplines.map(([, count]) => count)}
            type="donut"
            height={350}
          />
        </motion.div>

        {/* Age Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-gray-900 font-display mb-6">
            Répartition par Âge
          </h3>
          <Chart
            options={ageChartOptions}
            series={[{
              name: 'Athlètes',
              data: Object.values(ageRanges)
            }]}
            type="bar"
            height={350}
          />
        </motion.div>
      </div>

      {/* Monthly Registrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 font-display mb-6">
          Évolution des Enregistrements (6 derniers mois)
        </h3>
        <Chart
          options={monthlyChartOptions}
          series={[{
            name: 'Enregistrements',
            data: last6Months.map(m => m.count)
          }]}
          type="line"
          height={300}
        />
      </motion.div>

      {/* Top Disciplines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 font-display mb-6">
          Top 5 des Disciplines
        </h3>
        <div className="space-y-4">
          {topDisciplines.map(([discipline, count], index) => (
            <div key={discipline} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{discipline}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-500">
                  {Math.round((count / totalAthletes) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatistiquesPage;