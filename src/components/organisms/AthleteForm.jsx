import { useState } from "react";
import { motion } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import PhotoUpload from "@/components/molecules/PhotoUpload";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const AthleteForm = ({ athlete, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    nom: athlete?.nom || "",
    postnom: athlete?.postnom || "",
    prenom: athlete?.prenom || "",
    dateNaissance: athlete?.dateNaissance ? format(new Date(athlete.dateNaissance), "yyyy-MM-dd") : "",
    adresse: athlete?.adresse || "",
    disciplineSportive: athlete?.disciplineSportive || "",
    photoUrl: athlete?.photoUrl || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disciplinesSportives = [
    { value: "Football", label: "Football" },
    { value: "Basketball", label: "Basketball" },
    { value: "Athlétisme", label: "Athlétisme" },
    { value: "Tennis", label: "Tennis" },
    { value: "Volleyball", label: "Volleyball" },
    { value: "Handball", label: "Handball" },
    { value: "Natation", label: "Natation" },
    { value: "Cyclisme", label: "Cyclisme" },
    { value: "Boxe", label: "Boxe" },
    { value: "Judo", label: "Judo" },
    { value: "Taekwondo", label: "Taekwondo" },
    { value: "Gymnastique", label: "Gymnastique" },
    { value: "Haltérophilie", label: "Haltérophilie" },
    { value: "Lutte", label: "Lutte" },
    { value: "Escrime", label: "Escrime" },
    { value: "Autres", label: "Autres" },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.postnom.trim()) newErrors.postnom = "Le postnom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.dateNaissance) newErrors.dateNaissance = "La date de naissance est requise";
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    if (!formData.disciplineSportive) newErrors.disciplineSportive = "La discipline sportive est requise";

    // Validate age (must be between 10 and 50 years old)
    if (formData.dateNaissance) {
      const age = new Date().getFullYear() - new Date(formData.dateNaissance).getFullYear();
      if (age < 10 || age > 50) {
        newErrors.dateNaissance = "L'âge doit être compris entre 10 et 50 ans";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="card max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
          {isEditing ? "Modifier l'athlète" : "Enregistrer un nouvel athlète"}
        </h2>
        <p className="text-gray-600">
          Remplissez tous les champs obligatoires pour {isEditing ? "modifier" : "enregistrer"} l'athlète.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Nom de famille"
              value={formData.nom}
              onChange={(e) => handleChange("nom", e.target.value)}
              error={errors.nom}
              required
              placeholder="Kabila"
            />
            
            <FormField
              label="Postnom"
              value={formData.postnom}
              onChange={(e) => handleChange("postnom", e.target.value)}
              error={errors.postnom}
              required
              placeholder="Joseph"
            />
          </div>

          <FormField
            label="Prénom"
            value={formData.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
            error={errors.prenom}
            required
            placeholder="Laurent"
          />

          <FormField
            label="Date de naissance"
            type="date"
            value={formData.dateNaissance}
            onChange={(e) => handleChange("dateNaissance", e.target.value)}
            error={errors.dateNaissance}
            required
          />

          <FormField
            label="Adresse complète"
            value={formData.adresse}
            onChange={(e) => handleChange("adresse", e.target.value)}
            error={errors.adresse}
            required
            placeholder="Avenue Université, Kinshasa, RDC"
          />

          <FormField
            label="Discipline sportive"
            type="select"
            value={formData.disciplineSportive}
            onChange={(e) => handleChange("disciplineSportive", e.target.value)}
            error={errors.disciplineSportive}
            options={disciplinesSportives}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Photo de l'athlète
          </label>
          <PhotoUpload
            value={formData.photoUrl}
            onChange={(photoUrl) => handleChange("photoUrl", photoUrl)}
            error={errors.photoUrl}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          Annuler
        </Button>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[180px]"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {isEditing ? "Modification..." : "Enregistrement..."}
            </>
          ) : (
            <>
              <ApperIcon name={isEditing ? "Save" : "UserPlus"} className="w-4 h-4" />
              {isEditing ? "Modifier l'athlète" : "Enregistrer l'athlète"}
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default AthleteForm;