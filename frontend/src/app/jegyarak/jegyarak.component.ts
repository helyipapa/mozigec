import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jegyarak',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './jegyarak.component.html',
  styleUrls: ['./jegyarak.component.scss']
})
export class JegyarakComponent {
  searchText: string = '';
}
