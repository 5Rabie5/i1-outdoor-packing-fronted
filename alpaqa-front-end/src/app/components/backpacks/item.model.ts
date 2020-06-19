export class Item{
public id: number ;
public name: string ;
public weight: number ;
public volume: number ;
public description: string ;
public quantity: number ;
public priority: string ;
public image: string ;
constructor( id: number, name: string, weight: number, volume: number, description: string,  quantity: number, priority: string, image: string){
this.id = id;
this.name = name;
this.weight = weight;
this.volume = volume;
this.description = description;
this.quantity = quantity;
this.priority = priority;
this.image = image;
}




}
