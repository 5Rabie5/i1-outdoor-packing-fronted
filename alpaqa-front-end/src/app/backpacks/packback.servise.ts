import { EventEmitter } from '@angular/core' ;
import { Backpack } from './backpack.model';
import { Item } from './item.model';




export class BackpackService {
backpackSelected = new EventEmitter<Backpack>();
}

