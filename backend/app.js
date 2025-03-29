const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

const secretKey = '1234'; 
async function connectDB() {
  return mysql.createConnection(dbConfig);

}

app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const connection = await connectDB();
      const [users] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
      connection.end();

      if (users.length === 0) {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
      res.json({ token, user: {id: user.idUser, name: user.name, email: user.email, role: user.role} });
  } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ message: error.message });
  }
});
// Route d'inscription
app.post('/register', async (req, res) => {
  try {
      const { name, email, password, role } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const connection = await connectDB();
      const [existingUsers] = await connection.execute(
          'SELECT * FROM user WHERE email = ?', // Utilisation cohérente de "Users"
          [email]
      );

      if (existingUsers.length > 0) {
          connection.end();
          return res.status(400).json({ message: 'Utilisateur déjà enregistré' });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      await connection.execute(
          'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)', // Utilisation cohérente de "Users"
          [name, email, hashedPassword, role || 'user']
      );

      connection.end();
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      res.status(500).json({ message: error.message });
  }
});


// Route pour récupérer tous les utilisateurs (protégée)
app.get('/users', async (req, res) => {
  try {
      const connection = await connectDB();
      const [users] = await connection.execute('SELECT * FROM user');
      connection.end();

      // You might want to exclude sensitive data like password before sending the response
      const usersWithoutPassword = users.map(user => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
      });

      res.json(usersWithoutPassword);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Routes pour Etablissement
app.get('/etablissements', async (req, res) => {
    try {
      const connection = await connectDB();
      const [rows] = await connection.execute('SELECT * FROM Etablissement');
      connection.end();
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/etablissements/:n_etab', async (req, res) => {
    const { n_etab } = req.params;
    try {
      const connection = await connectDB();
      const [rows] = await connection.execute('SELECT * FROM Etablissement WHERE n_Etab = ?', [n_etab]);
      connection.end();
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: 'Établissement non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/etablissements', async (req, res) => {
    const { nom, Montant_Budget } = req.body;
    try {
      const connection = await connectDB();
      await connection.execute('INSERT INTO Etablissement (nom, Montant_Budget) VALUES (?, ?)', [nom, Montant_Budget]);
      connection.end();
      res.status(201).json({ message: 'Établissement créé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.put('/etablissements/:n_etab', async (req, res) => {
    const { n_etab } = req.params;
    const { nom, Montant_Budget } = req.body;
    try {
      const connection = await connectDB();
      await connection.execute('UPDATE Etablissement SET nom = ?, Montant_Budget = ? WHERE n_Etab = ?', [nom, Montant_Budget, n_etab]);
      connection.end();
      res.json({ message: 'Établissement mis à jour avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.delete('/etablissements/:n_etab', async (req, res) => {
    const { n_etab } = req.params;
    try {
      const connection = await connectDB();
      await connection.execute('DELETE FROM Etablissement WHERE n_Etab = ?', [n_etab]);
      connection.end();
      res.json({ message: 'Établissement supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Routes pour Depense
app.get('/depenses', async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM Depense');
    connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/depenses/:n_depense', async (req, res) => {
  const { n_depense } = req.params;
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM Depense WHERE n_depense = ?', [n_depense]);
    connection.end();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Dépense non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/depenses', async (req, res) => {
  const { n_Etab, depense,description } = req.body;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const decodedToken = jwt.decode(token);
  const email = decodedToken.email; 
    const connection = await connectDB();
    await connection.execute('SET @current_user_email = ?', [email]); // Insérer l'email ici
        await connection.execute('INSERT INTO depense (n_Etab, depense,description) VALUES (?, ?, ?)', [n_Etab, depense,description]);
    connection.end();
    res.status(201).json({ message: 'Dépense créée avec succès' });
  
});


app.put('/depenses/:n_depense', async (req, res) => {
  const { n_depense } = req.params;
  const { n_Etab, depense, description } = req.body;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const decodedToken = jwt.decode(token);
  if (!decodedToken || !decodedToken.email) {
    return res.status(400).json({ message: 'Token invalide ou email manquant' });
  }
  const email = decodedToken.email;

  try {
    const connection = await connectDB();
    await connection.execute('SET @current_user_email = ?', [email]); // Insérer l'email ici
    await connection.execute('UPDATE Depense SET n_Etab = ?, depense = ?, description = ? WHERE n_depense = ?', [n_Etab, depense, description, n_depense]);
    connection.end();
    res.json({ message: 'Dépense mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/depenses/:n_depense', async (req, res) => {
  const { n_depense } = req.params;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const decodedToken = jwt.decode(token);
  if (!decodedToken || !decodedToken.email) {
    return res.status(400).json({ message: 'Token invalide ou email manquant' });
  }
  const email = decodedToken.email;

  try {
    const connection = await connectDB();
    await connection.execute('SET @current_user_email = ?', [email]); // Insérer l'email ici
    await connection.execute('DELETE FROM Depense WHERE n_depense = ?', [n_depense]);
    connection.end();
    res.json({ message: 'Dépense supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes pour audit_Depense
app.get('/audit_depenses', async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM audit_Depense');
    connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/audit_depenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM audit_Depense WHERE id = ?', [id]);
    connection.end();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Entrée d\'audit non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});