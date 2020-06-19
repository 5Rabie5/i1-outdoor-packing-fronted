import { Item } from './item.model';
export class Backpack{
public id: number ;
public name: string ;
public description: string ;
public category: string ;
public items: Item[] ;
public image: string ;
public totalWeight: number ;


constructor(id: number , name: string , description: string , category: string , items: Item[] , image: string, totalWeight: number ){
this.id = id ;
this.name = name ;
this.description = description ;
this.category = category;
this.items = items ;
this.image = image ;
this.totalWeight = totalWeight;


}
}
