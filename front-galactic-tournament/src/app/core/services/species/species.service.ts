import { Injectable, signal, computed, inject } from '@angular/core';
import { Species, SpeciesForm } from '../../../shared/types/species/species.interface';
import { HttpClient } from '@angular/common/http';
import environment from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ApiResponse } from '../../../shared/types/http/response.interface';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private http = inject(HttpClient);
  

  async getAllSpecies() {
    return await firstValueFrom(this.http.get<ApiResponse<Species[]>>(`${environment.apiUrl}species`));
  }

  async getTopSpecies() {
    return await firstValueFrom(this.http.get<ApiResponse<Species[]>>(`${environment.apiUrl}species/top`));
  }

  async createSpecies(species: Species) {
    return await firstValueFrom(this.http.post<ApiResponse<Species>>(`${environment.apiUrl}species`, species));
  }
}
