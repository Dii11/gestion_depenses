const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const cors = require('cors');


const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

async function connectDB() {
  return mysql.createConnection(dbConfig);
}

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
  try {
    const connection = await connectDB();
    await connection.execute('INSERT INTO Depense (n_Etab, depense,description) VALUES (?, ?, ?)', [n_Etab, depense,description]);
    connection.end();
    res.status(201).json({ message: 'Dépense créée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/depenses/:n_depense', async (req, res) => {
  const { n_depense } = req.params;
  const { n_Etab, depense,description } = req.body;
  try {
    const connection = await connectDB();
    await connection.execute('UPDATE Depense SET n_Etab = ?, depense = ?,description = ? WHERE n_depense = ?', [n_Etab, depense,description, n_depense]);
    connection.end();
    res.json({ message: 'Dépense mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/depenses/:n_depense', async (req, res) => {
  const { n_depense } = req.params;
  try {
    const connection = await connectDB();
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