import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item.model';
import { Backpack } from '../backpack.model';
import { BackpackService } from '../packback.servise';

@Component({
  selector: 'app-backpack-details',
  templateUrl: './backpack-details.component.html',
  styleUrls: ['./backpack-details.component.css']
})
export class BackpackDetailsComponent implements OnInit {
selectedBackpack: Backpack;
backpacks: Backpack[];
 items: Item[];

  constructor(private backpackService: BackpackService) { }

  ngOnInit(){
//   this.backpackService.backpackSelected.subscribe(
//   ( backpack: Backpack ) => {
//   this.selectedBackpack = backpack ;
//   this.items = this.backpackService.getItemByBackpackId(this.selectedBackpack.id).items;
//   }
//     );
  }



}
