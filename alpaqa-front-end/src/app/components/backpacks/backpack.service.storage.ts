import {Injectable} from '@angular/core';
import {Backpack} from './backpack.model';
import {HttpClient} from '@angular/common/http';
import {Item} from './item.model';

@Injectable({
  providedIn: 'root'
})
export class BackpackServiceStorage {
  private Url = 'http://localhost:8080/backpacks';

  constructor(private httpClient: HttpClient) {
  }

  backpacks: Backpack[];
  items: Item[];

  public getBackpacks() {
    return this.httpClient.get<Backpack[]>(this.Url);
  }


  public postNewBackpacks(backpack: Backpack) {
    return this.httpClient.post(this.Url, backpack);
  }


  public postNewItems(backpackId: number, item: Item) {
    return this.httpClient.put<Item>('http://localhost:8080/backpacks/' + backpackId + '/add-new-item', item);
  }

  //////////////////
  public getItemsById(backpackId: number, itemId: number) {
    this.httpClient.get('http://localhost:8080/backpacks/' + backpackId + '/items/' + itemId);
  }

  public updateItem(backpackId: number, itemId: number, item: Item) {
    return this.httpClient.put<Item>('http://localhost:8080/backpacks/' + backpackId + '/items/' + itemId, item);
  }

  public deleteItem(backpackId: number, itemId: number) {
    return this.httpClient.delete<Item>('http://localhost:8080/backpacks/' + backpackId + '/items/' + itemId);
  }

  public getBackpackById(backpackId: number) {
    return this.httpClient.get<Backpack[]>('http://localhost:8080/backpacks/' + backpackId);
  }

  public deleteBackpack(backpackId: number) {
    return this.httpClient.delete<Item>('http://localhost:8080/backpacks/' + backpackId );
  }
}
