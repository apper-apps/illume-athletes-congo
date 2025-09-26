import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import athletesService from "@/services/api/athletesService";
import { format, differenceInYears } from "date-fns";
import { fr } from "date-fns/locale";

const ProfilAthletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadAthlete = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await athletesService.getById(parseInt(id));
      setAthlete(data);
    } catch (err) {
      setError("Impossible de charger les informations de l'athlète");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAthlete();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'athlète ${athlete.prenom} ${athlete.nom} ?`)) {
      return;
    }

    try {
      setDeleting(true);
      await athletesService.delete(athlete.Id);
      toast.success("Athlète supprimé avec succès");
      navigate("/athletes");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading type="form" />;
  if (error) return <Error message={error} onRetry={loadAthlete} />;
  if (!athlete) return <Error message="Athlète introuvable" />;

  const age = differenceInYears(new Date(), new Date(athlete.dateNaissance));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/athletes")}
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 font-display">
          Profil de l'Athlète
        </h1>
      </motion.div>

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo and basic info */}
          <div className="text-center lg:text-left">
            {athlete.photoUrl ? (
              <img
                src={athlete.photoUrl}
                alt={`${athlete.prenom} ${athlete.nom}`}
                className="w-48 h-48 object-cover rounded-2xl shadow-lg mx-auto lg:mx-0 border-4 border-white"
              />
            ) : (
              <div className="w-48 h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-lg border-4 border-white">
                <ApperIcon name="User" className="w-24 h-24 text-primary-500" />
              </div>
            )}
            
            <div className="mt-6">
              <div className="inline-flex px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-full shadow-md">
                {athlete.disciplineSportive}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-display mb-2">
                {athlete.prenom} {athlete.nom}
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                {athlete.postnom}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Calendar" className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date de naissance</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(athlete.dateNaissance), "dd MMMM yyyy", { locale: fr })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="User" className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Âge</p>
                    <p className="font-semibold text-gray-900">{age} ans</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="MapPin" className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Adresse</p>
                    <p className="font-semibold text-gray-900">{athlete.adresse}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Clock" className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Enregistré le</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(athlete.dateEnregistrement), "dd/MM/yyyy", { locale: fr })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 font-display mb-4">
          Actions
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => navigate(`/athletes/${athlete.Id}/modifier`)}
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
            Modifier les informations
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            <ApperIcon name="Printer" className="w-4 h-4" />
            Imprimer le profil
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={deleting}
            className="text-error-600 border-error-300 hover:bg-error-50 hover:border-error-400"
          >
            {deleting ? (
              <>
                <div className="w-4 h-4 border-2 border-error-600 border-t-transparent rounded-full animate-spin" />
                Suppression...
              </>
            ) : (
              <>
                <ApperIcon name="Trash2" className="w-4 h-4" />
                Supprimer
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilAthletePage;