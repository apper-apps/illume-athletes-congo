import disciplinesData from "@/services/mockData/disciplines.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DisciplinesService {
  constructor() {
    this.disciplines = [...disciplinesData];
  }

  async getAll() {
    await delay(200);
    return [...this.disciplines];
  }

  async getById(id) {
    await delay(150);
    const discipline = this.disciplines.find(d => d.Id === id);
    if (!discipline) {
      throw new Error("Discipline introuvable");
    }
    return { ...discipline };
  }

  async create(disciplineData) {
    await delay(300);
    
    const newId = this.disciplines.length > 0 
      ? Math.max(...this.disciplines.map(d => d.Id)) + 1 
      : 1;
    
    const newDiscipline = {
      Id: newId,
      ...disciplineData
    };
    
    this.disciplines.push(newDiscipline);
    return { ...newDiscipline };
  }

  async update(id, disciplineData) {
    await delay(250);
    
    const index = this.disciplines.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Discipline introuvable");
    }
    
    this.disciplines[index] = {
      ...this.disciplines[index],
      ...disciplineData
    };
    
    return { ...this.disciplines[index] };
  }

  async delete(id) {
    await delay(200);
    
    const index = this.disciplines.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Discipline introuvable");
    }
    
    const deleted = this.disciplines.splice(index, 1)[0];
    return { ...deleted };
  }
}

const disciplinesService = new DisciplinesService();
export default disciplinesService;