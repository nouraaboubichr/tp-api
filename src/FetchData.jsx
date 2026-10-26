import { useState, useEffect } from 'react';

function FetchData() {
  const [posts, setPosts] = useState([]); // Liste des articles
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur éventuelle

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/posts', {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        // Une requête annulée n'est pas une vraie erreur
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    // Nettoyage : annule la requête si le composant disparaît
    return () => controller.abort();
  }, []); // Tableau vide : l'effet ne s'exécute qu'une fois au montage

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Articles chargés avec fetch()</h2>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;