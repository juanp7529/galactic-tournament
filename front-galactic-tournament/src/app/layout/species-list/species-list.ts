import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Species } from '../../shared/types/species/species.interface';
import { Button } from '../../shared/components/ui/button/button';
import { Card } from '../../shared/components/ui/card/card';
import { Modal } from '../../shared/components/ui/modal/modal';
import { InputComponent } from '../../shared/components/ui/input/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [Button, Card, Modal, ReactiveFormsModule, InputComponent],
  templateUrl: './species-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesList {
  @Input() species: Species[] = [];
  @Output() onSelect = new EventEmitter<Species>();
  @Output() onSubmit = new EventEmitter<Species>();
  private router = inject(Router);
  isOpen = signal<boolean>(false);
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    power: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(0),
        Validators.max(100),
      ],
    }),
    ability: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  async handleSubmit(): Promise<void> {
    if (this.form.valid) {
      const { name, power, ability } = this.form.getRawValue();
      const newSpecies: Species = {
        name: name,
        power: Number(power),
        ability: ability,
      };
      this.onSubmit.emit(newSpecies);
      this.handleClose();
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }

  handleAdd(): void {
    this.isOpen.set(true);
    this.form.reset();
  }

  handleClose(): void {
    this.isOpen.set(false);
    this.form.reset();
  }

  navigateToRanking() {
    this.router.navigate(['/ranking']);
  }
}
