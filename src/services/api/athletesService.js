import athletesData from "@/services/mockData/athletes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AthletesService {
  constructor() {
    this.athletes = [...athletesData];
  }

  async getAll() {
    await delay(300);
    return [...this.athletes];
  }

  async getById(id) {
    await delay(250);
    const athlete = this.athletes.find(a => a.Id === id);
    if (!athlete) {
      throw new Error("Athlète introuvable");
    }
    return { ...athlete };
  }

  async create(athleteData) {
    await delay(400);
    
    const newId = this.athletes.length > 0 
      ? Math.max(...this.athletes.map(a => a.Id)) + 1 
      : 1;
    
    const newAthlete = {
      Id: newId,
      ...athleteData,
      dateEnregistrement: new Date().toISOString()
    };
    
    this.athletes.push(newAthlete);
    return { ...newAthlete };
  }

  async update(id, athleteData) {
    await delay(350);
    
    const index = this.athletes.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Athlète introuvable");
    }
    
    this.athletes[index] = {
      ...this.athletes[index],
      ...athleteData
    };
    
    return { ...this.athletes[index] };
  }

  async delete(id) {
    await delay(300);
    
    const index = this.athletes.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Athlète introuvable");
    }
    
    const deleted = this.athletes.splice(index, 1)[0];
    return { ...deleted };
  }
}

const athletesService = new AthletesService();
export default athletesService;