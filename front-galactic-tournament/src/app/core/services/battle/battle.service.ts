import { inject, Injectable, signal } from '@angular/core';
import { Species } from '../../../shared/types/species/species.interface';
import { firstValueFrom } from 'rxjs';
import environment from '../../../../../environment/environment';
import { ApiResponse } from '../../../shared/types/http/response.interface';
import { Battle, CreateBattle } from '../../../shared/types/battle/battle.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private http = inject(HttpClient);
  private contender1Sig = signal<Species | null>(null);
  private contender2Sig = signal<Species | null>(null);
  readonly contender1 = this.contender1Sig.asReadonly();
  readonly contender2 = this.contender2Sig.asReadonly();

  selectContender(species: Species) {
    const c1 = this.contender1Sig();
    const c2 = this.contender2Sig();

    if (!c1) {
      this.contender1Sig.set(species);
    } else if (!c2 && c1.id !== species.id) {
      this.contender2Sig.set(species);
    }
  }

  removeContender(slot: 1 | 2) {
    if (slot === 1) {
      this.contender1Sig.set(null);
    } else {
      this.contender2Sig.set(null);
    }
  }

  resetBattle() {
    this.contender1Sig.set(null);
    this.contender2Sig.set(null);
  }

  async createBattle(createBattle: CreateBattle) {
    return await firstValueFrom(this.http.post<ApiResponse<Battle>>(`${environment.apiUrl}battles`, createBattle));
  }
}
