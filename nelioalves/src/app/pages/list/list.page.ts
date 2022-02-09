import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  icons: string[];
  items: Array<{ id: number; title: string; note: string; icon: string }>;
  isSelected = 0;

  constructor() {
    this.icons = [
      'flask',
      'wifi',
      'beer',
      'football',
      'basketball',
      'paper-plane',
      'american-football',
      'boat',
      'bluetooth',
      'build',
    ];

    this.items = [];

    for (let i = 0; i < this.icons.length; i++) {
      this.items.push({
        id: i,
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[i],
      });
    }
  }

  selected(index: number): void {
    this.isSelected = index;
  }

  ngOnInit() {}
}
