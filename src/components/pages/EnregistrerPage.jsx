import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AthleteForm from "@/components/organisms/AthleteForm";
import athletesService from "@/services/api/athletesService";

const EnregistrerPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const newAthlete = await athletesService.create({
        ...formData,
        dateEnregistrement: new Date().toISOString()
      });
      
      toast.success(`Athlète ${formData.prenom} ${formData.nom} enregistré avec succès !`);
      navigate(`/athletes/${newAthlete.Id}`);
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de l'athlète");
      throw error;
    }
  };

  return <AthleteForm onSubmit={handleSubmit} />;
};

export default EnregistrerPage;