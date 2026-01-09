import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Species } from '../../shared/types/species/species';
import { Button } from "../../shared/components/ui/button/button";
import { Card } from "../../shared/components/ui/card/card";
import { SpeciesService } from '../../core/services/species/species.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle-arena',
  imports: [Button],
  templateUrl: './battle-arena.html',
})
export class BattleArena {
  @Input() contender1: Species | null = null;
  @Input() contender2: Species | null = null;
  @Output() onRemove = new EventEmitter<1 | 2>();
  @Output() onReset = new EventEmitter<void>();
  @Output() onBattle = new EventEmitter<void>();
  speciesService = inject(SpeciesService);

}
