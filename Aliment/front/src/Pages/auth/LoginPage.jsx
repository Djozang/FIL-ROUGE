import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [apiError, setApiError] = useState(''); // Renommé de setErrors pour éviter la confusion avec les erreurs du formulaire

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000); // Disparaît après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError(''); // Réinitialise les erreurs d'API avant chaque soumission
    
    try {
      await login(data.email, data.password);
      setToast({
        title: 'Connexion réussie',
        description: 'Vous êtes maintenant connecté.',
        variant: 'success'
      });
      navigate('/userdashboard'); // Redirige vers le tableau de bord utilisateur
    } catch (error) {
      setApiError(error.message || 'Email ou mot de passe incorrect.');
      setToast({
        title: 'Erreur de connexion',
        description: error.message || 'Email ou mot de passe incorrect.',
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="text-gray-600">
              Entrez vos identifiants pour accéder à votre compte
            </p>
          </div>

          {toast && (
            <div className={`p-4 rounded-md ${
              toast.variant === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              <h3 className="font-medium">{toast.title}</h3>
              <p className="text-sm">{toast.description}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="exemple@email.com"
                {...register('email', {
                  required: 'Email est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline hover:text-blue-700">
                  Mot de passe oublié?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                {...register('password', {
                  required: 'Mot de passe est requis',
                  minLength: {
                    value: 6,
                    message: 'Le mot de passe doit contenir au moins 6 caractères'
                  }
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {apiError && !toast && (
              <p className="text-sm text-red-600">{apiError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : 'Se connecter'}
            </button>
          </form>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600 mb-2">
            Vous n'avez pas de compte?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:underline hover:text-blue-700">
              S'inscrire
            </Link>
          </div>
          <div className="text-center">
            <Link to="/" className="text-sm text-gray-500 hover:underline hover:text-gray-600">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}