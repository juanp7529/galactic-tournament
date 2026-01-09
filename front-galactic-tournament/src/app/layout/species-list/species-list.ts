import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Species } from '../../shared/types/species/species';
import { Button } from "../../shared/components/ui/button/button";
import { Card } from "../../shared/components/ui/card/card";
import { Modal } from "../../shared/components/ui/modal/modal";
import { InputComponent } from "../../shared/components/ui/input/input";
import { SpeciesService } from '../../core/services/species/species.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [Button, Card, Modal, ReactiveFormsModule, InputComponent],
  templateUrl: './species-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesList {
  species: Species[] = [
    { id: '1', name: 'Xenomorph', power: 95, ability: 'Venomous bite' },
    { id: '2', name: 'Predator', power: 90, ability: 'Predator language' },
    { id: '3', name: 'Wookie', power: 85, ability: 'Laser vision' },
    { id: '4', name: 'Ewok', power: 30, ability: 'Telekinesis' },
    { id: '5', name: 'Klingon', power: 88, ability: 'Klingon language' },
  ];
  @Output() onSelect = new EventEmitter<Species>();
  @Output() onAdd = new EventEmitter<Species>();

  isOpen = signal<boolean>(false);

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    power: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0), Validators.max(100)] }),
    ability: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  speciesService = inject(SpeciesService);
  router = inject(Router);



  handleSubmit(): void {
    if (this.form.valid) {
      const { name, power, ability } = this.form.getRawValue();
      const newSpecies: Species = {
        id: crypto.randomUUID(),
        name: name,
        power: Number(power),
        ability: ability
      };
      this.onAdd.emit(newSpecies);
      this.handleClose();
    }
  }

  handleAdd(): void {
    this.isOpen.set(true);
  }

  handleClose(): void {
    this.isOpen.set(false);
    this.form.reset();
  }

  navigateToRanking() {
    this.router.navigate(['/ranking']);
  }
}
