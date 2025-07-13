body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3e8ff;
  margin: 0;
  padding: 20px;
  color: #4c1d95;
}

h1 {
  text-align: center;
  color: #6b21a8;
  margin-bottom: 40px;
  font-size: 2.5rem;
}

.malla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  max-width: 1200px;
  margin: auto;
}

.ramo {
  background-color: #f5d0fe;
  border: 2px solid #e879f9;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  font-weight: 500;
  cursor: not-allowed;
  opacity: 0.4;
  transition: background-color 0.3s, opacity 0.3s, transform 0.2s;
  user-select: none;
}

.ramo.activo {
  cursor: pointer;
  opacity: 1;
}

.ramo.activo:hover {
  background-color: #e9d5ff;
  transform: scale(1.03);
}

.ramo.aprobado {
  background-color: #a855f7;
  color: white;
  text-decoration: line-through;
  border-color: #7e22ce;
}

.ciclo {
  grid-column: 1 / -1;
  background-color: #ede9fe;
  color: #5b21b6;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  margin-top: 30px;
}

@media (max-width: 600px) {
  .malla {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
  h1 {
    font-size: 2rem;
  }
}
