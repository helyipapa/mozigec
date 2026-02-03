import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teremberles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './teremberles.component.html',
  styleUrls: ['./teremberles.component.scss']
})
export class TermeberlesComponent {
  searchText: string = '';
  
  formData = {
    name: '',
    email: '',
    phone: ''
  };
  
  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Itt lehet hozzáadni az űrlap elküldési logikát
    alert('Köszönjük! Kollégánk 48 órán belül felveszi Önnel a kapcsolatot.');
    this.formData = { name: '', email: '', phone: '' };
  }
}
