import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeciesList } from './layout/species-list/species-list';
import { BattleArena } from './layout/battle-arena/battle-arena';
import { SpeciesService } from './core/services/species/species.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}
