import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Button } from "../../shared/components/ui/button/button";
import { SpeciesService } from '../../core/services/species/species.service';
import { Species } from '../../shared/types/species/species.interface';
import { WinnerModal } from '../../shared/components/ui/winner-modal/winner-modal';

@Component({
  selector: 'app-battle-arena',
  standalone: true,
  imports: [Button, WinnerModal],
  templateUrl: './battle-arena.html',
})
export class BattleArena {
  @Input() contender1: Species | null = null;
  @Input() contender2: Species | null = null;
  @Input() winnerName: string | null = null;
  @Output() onRemove = new EventEmitter<1 | 2>();
  @Output() onReset = new EventEmitter<void>();
  @Output() onBattle = new EventEmitter<void>();
  @Output() onCloseWinner = new EventEmitter<void>();
  
}
