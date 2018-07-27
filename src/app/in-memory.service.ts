import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService{
  createDb() {
    const data = [
      {"city_id": 22, "city_name": "Thiruvanathapuram", "area": "infosys"},
      {"city_id": 1, "city_name": "Bangalore", "area": "infosys"},
      {"city_id": 16, "city_name": "Mangalore", "area": "infosys"},
      {"city_id": 3, "city_name": "Mumbai", "area": "infosys"},
      {"city_id": 18, "city_name": "Chandigarh", "area": "infosys"},
      {"city_id": 21, "city_name": "Mysore", "area": "infosys"},
      {"city_id": 2, "city_name": "Hyderabad", "area": "infosys"},
      {"city_id": 5, "city_name": "Chennai", "area": "infosys"},
      {"city_id": 7, "city_name": "Gurgaon", "area": "infosys"},
      {"city_id": 6, "city_name": "Pune", "area": "infosys"},
      {"city_id": 23, "city_name": "Jaipur", "area": "infosys"},
      {"city_id": 24, "city_name": "Bhubaneswar", "area": "infosys"}
    ];
    return {data};
  }
  constructor() { }
}

