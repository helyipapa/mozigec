import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mediaajanlat',
  templateUrl: './mediaajanlat.component.html',
  styleUrls: ['./mediaajanlat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class MediaajanlatComponent {
  searchText: string = '';
  
  formData = {
    name: '',
    email: '',
    phone: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    alert('Köszönjük! Kollégánk 48 órán belül felveszi Önnel a kapcsolatot.');
    // Reset form
    this.formData = {
      name: '',
      email: '',
      phone: ''
    };
  }
}
