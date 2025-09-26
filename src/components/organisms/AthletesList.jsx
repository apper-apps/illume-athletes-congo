import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AthleteCard from "@/components/molecules/AthleteCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import athletesService from "@/services/api/athletesService";

const AthletesList = () => {
  const [athletes, setAthletes] = useState([]);
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");

  const loadAthletes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await athletesService.getAll();
      setAthletes(data);
      setFilteredAthletes(data);
    } catch (err) {
      setError("Impossible de charger les athlètes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAthletes();
  }, []);

  useEffect(() => {
    let filtered = athletes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(athlete =>
        `${athlete.prenom} ${athlete.nom} ${athlete.postnom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.disciplineSportive.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by discipline
    if (selectedDiscipline) {
      filtered = filtered.filter(athlete => athlete.disciplineSportive === selectedDiscipline);
    }

    setFilteredAthletes(filtered);
  }, [athletes, searchTerm, selectedDiscipline]);

  const disciplines = [...new Set(athletes.map(a => a.disciplineSportive))].sort();

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadAthletes} />;
  if (athletes.length === 0) return <Empty />;

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Rechercher par nom ou discipline..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="min-w-[200px]">
            <Select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full"
            >
              <option value="">Toutes disciplines</option>
              {disciplines.map(discipline => (
                <option key={discipline} value={discipline}>
                  {discipline}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="Users" className="w-4 h-4" />
            <span>
              {filteredAthletes.length} athlète{filteredAthletes.length !== 1 ? "s" : ""} 
              {searchTerm || selectedDiscipline ? " trouvé(s)" : " enregistré(s)"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Athletes Grid */}
      {filteredAthletes.length === 0 ? (
        <Empty
          title="Aucun athlète trouvé"
          description="Aucun athlète ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
          actionText="Voir tous les athlètes"
          actionPath="/athletes"
          icon="Search"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAthletes.map((athlete, index) => (
            <AthleteCard
              key={athlete.Id}
              athlete={athlete}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AthletesList;