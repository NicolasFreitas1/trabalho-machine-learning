import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    school: "GP",
    sex: "F",
    age: 18,
    address: "U",
    famsize: "GT3",
    Pstatus: "T",
    Medu: 3,
    Fedu: 2,
    Mjob: "teacher",
    Fjob: "teacher",
    reason: "course",
    guardian: "mother",
    traveltime: 2,
    studytime: 3,
    failures: 0,
    schoolsup: "yes",
    famsup: "yes",
    paid: "no",
    activities: "yes",
    nursery: "yes",
    higher: "yes",
    internet: "yes",
    romantic: "no",
    famrel: 5,
    freetime: 4,
    goout: 3,
    Dalc: 1,
    Walc: 1,
    health: 5,
    absences: 4,
    G1: 15,
    G2: 16,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      alert(`A previsão de nota final é: ${response.data.prediction}`);
    } catch (error) {
      console.error("Erro ao enviar dados", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Previsão de Nota Final</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Escola:
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
            >
              <option value="GP">Gabriel Pereira</option>
              <option value="MS">Mousinho da Silveira</option>
            </select>
          </label>
          <label>
            Sexo:
            <select name="sex" value={formData.sex} onChange={handleChange}>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </label>
          <label>
            Idade (15-22):
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="15"
              max="22"
            />
          </label>
          <label>
            Endereço:
            <select
              name="address"
              value={formData.address}
              onChange={handleChange}
            >
              <option value="U">Urbano</option>
              <option value="R">Rural</option>
            </select>
          </label>
          <label>
            Tamanho da Família:
            <select
              name="famsize"
              value={formData.famsize}
              onChange={handleChange}
            >
              <option value="LE3">Até 3 membros</option>
              <option value="GT3">Mais de 3 membros</option>
            </select>
          </label>
          <label>
            Estado dos Pais:
            <select
              name="Pstatus"
              value={formData.Pstatus}
              onChange={handleChange}
            >
              <option value="T">Juntos</option>
              <option value="A">Separados</option>
            </select>
          </label>
          <label>
            Escolaridade da Mãe:
            <select name="Medu" value={formData.Medu} onChange={handleChange}>
              <option value="0">Nenhuma</option>
              <option value="1">Primário</option>
              <option value="2">Secundário</option>
              <option value="3">Superior</option>
            </select>
          </label>
          <label>
            Escolaridade do Pai:
            <select name="Fedu" value={formData.Fedu} onChange={handleChange}>
              <option value="0">Nenhuma</option>
              <option value="1">Primário</option>
              <option value="2">Secundário</option>
              <option value="3">Superior</option>
            </select>
          </label>
          <label>
            Profissão da Mãe:
            <select name="Mjob" value={formData.Mjob} onChange={handleChange}>
              <option value="teacher">Professora</option>
              <option value="health">Saúde</option>
              <option value="services">Serviços</option>
              <option value="at_home">Em casa</option>
              <option value="other">Outro</option>
            </select>
          </label>
          <label>
            Profissão do Pai:
            <select name="Fjob" value={formData.Fjob} onChange={handleChange}>
              <option value="teacher">Professor</option>
              <option value="health">Saúde</option>
              <option value="services">Serviços</option>
              <option value="at_home">Em casa</option>
              <option value="other">Outro</option>
            </select>
          </label>
          <label>
            Motivo para Escolher a Escola:
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            >
              <option value="course">Curso</option>
              <option value="home">Proximidade</option>
              <option value="reputation">Reputação</option>
              <option value="other">Outro</option>
            </select>
          </label>
          <label>
            Guardião:
            <select
              name="guardian"
              value={formData.guardian}
              onChange={handleChange}
            >
              <option value="mother">Mãe</option>
              <option value="father">Pai</option>
              <option value="other">Outro</option>
            </select>
          </label>
          <label>
            Tempo de Viagem:
            <select
              name="traveltime"
              value={formData.traveltime}
              onChange={handleChange}
            >
              <option value="1">Até 15 minutos</option>
              <option value="2">16 a 30 minutos</option>
              <option value="3">31 a 60 minutos</option>
              <option value="4">Mais de 1 hora</option>
            </select>
          </label>
          <label>
            Tempo de Estudo:
            <select
              name="studytime"
              value={formData.studytime}
              onChange={handleChange}
            >
              <option value="1">Menos de 2 horas</option>
              <option value="2">2 a 5 horas</option>
              <option value="3">5 a 10 horas</option>
              <option value="4">Mais de 10 horas</option>
            </select>
          </label>
          <label>
            Falhas (0-3):
            <input
              type="number"
              name="failures"
              value={formData.failures}
              onChange={handleChange}
              min="0"
              max="3"
            />
          </label>
          <label>
            Apoio Escolar:
            <select
              name="schoolsup"
              value={formData.schoolsup}
              onChange={handleChange}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Apoio Familiar:
            <select
              name="famsup"
              value={formData.famsup}
              onChange={handleChange}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Pagamento Extra de Aulas:
            <select name="paid" value={formData.paid} onChange={handleChange}>
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Atividades Extra Curriculares:
            <select
              name="activities"
              value={formData.activities}
              onChange={handleChange}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Frequentou Creche:
            <select
              name="nursery"
              value={formData.nursery}
              onChange={handleChange}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Pretende Ensino Superior:
            <select
              name="higher"
              value={formData.higher}
              onChange={handleChange}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Acesso à Internet:
            <select
              name="internet"
              value={formData.internet}
              onChange={handleChange}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Relacionamento Romântico:
            <select
              name="romantic"
              value={formData.romantic}
              onChange={handleChange}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          <label>
            Relacionamento Familiar (1-5):
            <input
              type="number"
              name="famrel"
              value={formData.famrel}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </label>
          <label>
            Tempo Livre (1-5):
            <input
              type="number"
              name="freetime"
              value={formData.freetime}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </label>
          <label>
            Tempo de Saída (1-5):
            <input
              type="number"
              name="goout"
              value={formData.goout}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </label>
          <label>
            Consumo de Álcool Diário (1-5):
            <input
              type="number"
              name="Dalc"
              value={formData.Dalc}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </label>
          <label>
            Consumo de Álcool no Fim de Semana (1-5):
            <input
              type="number"
              name="Walc"
              value={formData.Walc}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </label>
          <label>
            Saúde (1-5):
            <input
              type="number"
              name="health"
              value={formData.health}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </label>
          <label>
            Faltas:
            <input
              type="number"
              name="absences"
              value={formData.absences}
              onChange={handleChange}
            />
          </label>
          <label>
            Nota 1 (G1):
            <input
              type="number"
              name="G1"
              value={formData.G1}
              onChange={handleChange}
            />
          </label>
          <label>
            Nota 2 (G2):
            <input
              type="number"
              name="G2"
              value={formData.G2}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submit-btn">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
