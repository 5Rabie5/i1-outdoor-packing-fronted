import { Component, OnInit } from '@angular/core';
import { BackpackService } from './packback.servise';
import { Backpack } from './backpack.model';
import { Item } from './item.model';
import { BackpackServiceStorage } from './backpack.service.storage';

@Component({
  selector: 'app-backpacks',
  templateUrl: './backpacks.component.html',
  styleUrls: ['./backpacks.component.css'],
  providers: [BackpackService]
})
 export class BackpacksComponent implements OnInit {
  selectedBackpack: Backpack;
  selectedItem: Item;
  backpacks: Backpack[];
  constructor(private backpackService: BackpackService, private backpackServiceStorage: BackpackServiceStorage) { }

  ngOnInit(){
    this.backpackServiceStorage.getBackpacks();
    this.backpackService.backpackSelected.subscribe(
      ( backpack: Backpack ) => {
      this.selectedBackpack = backpack ;
    });



  }
 }
