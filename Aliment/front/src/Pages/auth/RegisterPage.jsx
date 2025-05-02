import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    genre: '',
    phone_number: '',
    role: '',
    disease: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const diseases = [
    { value: 'diabetes', label: 'Diabète' },
    { value: 'hypertension', label: 'Hypertension artérielle' },
    { value: 'favism', label: 'Favisme' },
    { value: 'cancer_liver', label: 'Cancer du foie' },
    { value: 'cancer_breast', label: 'Cancer du sein' },
    { value: 'malaria', label: 'Paludisme' },
    { value: 'elderly', label: 'Personne âgée' },
  ];

  /*useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard');
    }
  }, [navigate]);
  */

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email invalide';
      isValid = false;
    }

    if (!formData.genre) {
      newErrors.genre = 'Le genre est requis';
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = 'Le rôle est requis';
      isValid = false;
    }

    if (formData.role === 'patient' && !formData.disease) {
      newErrors.disease = 'La condition médicale est requise';
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = '8 caractères minimum';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToastMessage({
        type: 'error',
        title: 'Erreur de validation',
        description: 'Veuillez corriger les erreurs dans le formulaire.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          gender: formData.genre,
          phone_number: formData.phone_number,
          date_of_birth: formData.date_of_birth,
          role: formData.role,
          condition_medicale: formData.disease,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Réponse inattendue: ${text.substring(0, 100)}...`);
      }
  

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      setToastMessage({
        type: 'success',
        title: 'Inscription réussie',
        description: `Bienvenue ${formData.name} !`,
      });

      setTimeout(() => {
        navigate(formData.role === 'admin' ? '/admindashboard' : '/userdashboard');
      }, 1000);
    } catch (error) {
      console.error('Erreur:', error);
      setToastMessage({
        type: 'error',
        title: 'Erreur',
        description: error.message.includes('Failed to fetch') 
          ? 'Erreur de connexion au serveur' 
          : error.message || "Erreur lors de l'inscription",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Toast = ({ message }) => {
    if (!message) return null;

    return (
      <div className={`fixed top-4 right-4 p-4 rounded border shadow-md max-w-xs z-50 ${
        message.type === 'success' 
          ? 'bg-green-100 border-green-500 text-green-800' 
          : 'bg-red-100 border-red-500 text-red-800'
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{message.title}</p>
            <p className="text-sm">{message.description}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-4 text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toast message={toastMessage} />

      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900">Inscription</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Créez un compte pour accéder à nos services de suivi alimentaire
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4" noValidate>
          {/* Nom complet */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom complet *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone_number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Genre *
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.genre ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Sélectionnez votre sexe</option>
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
            {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}
          </div>

          {/* Rôle */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Rôle *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Sélectionnez votre rôle</option>
              <option value="patient">Patient</option>
              <option value="admin">Administrateur</option>
            </select>
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
          </div>

          {/* Date de naissance */}
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
              Date de naissance *
            </label>
            <input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth || ''}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.date_of_birth ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
          </div>

          {/* Condition médicale */}
          {formData.role === 'patient' && (
            <div>
              <label htmlFor="disease" className="block text-sm font-medium text-gray-700">
                Condition médicale *
              </label>
              <select
                id="disease"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.disease ? 'border-red-500' : 'border-gray-300'
                }`}
                required={formData.role === 'patient'}
              >
                <option value="">Sélectionnez votre condition</option>
                {diseases.map(disease => (
                  <option key={disease.value} value={disease.value}>
                    {disease.label}
                  </option>
                ))}
              </select>
              {errors.disease && <p className="mt-1 text-sm text-red-600">{errors.disease}</p>}
            </div>
          )}

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
              Se connecter
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            <Link to="/" className="hover:underline">
              Retour à l'accueil
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}