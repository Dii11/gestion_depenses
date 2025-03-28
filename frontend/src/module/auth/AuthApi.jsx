const API_URL = "http://localhost:3000/users";
const API = "http://localhost:3000";


const fetchUsers = async (token) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok)
      throw new Error("Erreur lors du chargement des utilisateurs");
    return await response.json();
  } catch (error) {
    console.error("Erreur de chargement des utilisateurs:", error);
    throw new Error("Impossible de récupérer les données");
  }
};



const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            // Tentative de lire le corps de la réponse en JSON pour obtenir des détails sur l'erreur
            let errorDetails = `Erreur HTTP: ${response.status} - ${response.statusText}`;
            try {
                const errorBody = await response.json();
                if (errorBody && errorBody.message) {
                    errorDetails += ` - ${errorBody.message}`;
                }
            } catch (jsonError) {
                console.error("Erreur lors de la lecture du corps de la réponse JSON:", jsonError);
            }
            throw new Error(errorDetails);
        }

        const data = await response.json();
        const { token, ...user } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return data;

    } catch (error) {
        console.error("Erreur de connexion:", error);
        throw new Error("Impossible de se connecter");
    }
};

export const registerUser = async (name, email, password, role) => {
  try {
      const CONTENT_TYPE = 'application/json';

      // 1. Récupération de la liste des utilisateurs existants
      const usersResponse = await fetch(`${API}/users`);
      if (!usersResponse.ok) {
          throw new Error(`Erreur lors de la récupération des utilisateurs: ${usersResponse.status} - ${usersResponse.statusText}`);
      }
      const users = await usersResponse.json();

      // 2. Vérification de l'email existant
      if (users.some(user => user.email === email)) {
          throw new Error("Cet email est déjà utilisé.");
      }

      // 3. Inscription de l'utilisateur
      const response = await fetch(`${API}/register`, {
          method: 'POST',
          headers: {
              'Content-Type': CONTENT_TYPE,
          },
          body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
          // Tentative de lire le corps de la réponse en JSON pour obtenir des détails sur l'erreur
          let errorDetails = `Erreur HTTP: ${response.status} - ${response.statusText}`;
          try {
              const errorBody = await response.json();
              if (errorBody && errorBody.message) {
                  errorDetails += ` - ${errorBody.message}`;
              }
          } catch (jsonError) {
              console.error("Erreur lors de la lecture du corps de la réponse JSON:", jsonError);
          }
          throw new Error(errorDetails);
      }

      let data;
      try {
          data = await response.json();
      } catch (jsonError) {
          console.error("Erreur lors de la conversion de la réponse en JSON:", jsonError);
          throw new Error("Réponse du serveur invalide");
      }

      console.log(data);

      // Vérifiez la structure de la réponse (par exemple, si elle contient un message de succès)
      if (!data || !data.message) {
          throw new Error("Réponse du serveur incomplète");
      }

      return data; // Retourne les données de la réponse
  } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw new Error("Erreur d'inscription: " + error.message);
  }
};

export { fetchUsers, loginUser };