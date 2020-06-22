import {Injectable, SecurityContext} from '@angular/core';
import {Backpack} from './backpack.model';
import {HttpClient} from '@angular/common/http';
import {Item} from './item.model';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class BackpackServiceStorage {
  private Url = 'http://localhost:8080/backpacks';

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
  }

  backpacks: Backpack[];
  items: Item[];
  backpack: Backpack;

  generateDownloadJsonUri(backpack: Backpack, backpackName: string) {

    let theJSON = JSON.stringify(this.backpack);
    // var data = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    let data = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON)));
    let downloader = document.createElement('a');


    downloader.setAttribute('href', data);
    downloader.setAttribute('download', backpackName + '.json');
    downloader.click();


  }

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
    return this.httpClient.delete<Item>('http://localhost:8080/backpacks/' + backpackId);
  }
  public updateBackpack(backpack:Backpack,backpackId: number) {
    return this.httpClient.put<Backpack>('http://localhost:8080/backpacks/' + backpackId ,backpack);
  }
}
