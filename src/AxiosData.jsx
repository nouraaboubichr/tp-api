import { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosData() {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur éventuelle

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal,
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        // Une requête annulée n'est pas une vraie erreur
        if (axios.isCancel(err)) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Utilisateurs chargés avec axios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosData;