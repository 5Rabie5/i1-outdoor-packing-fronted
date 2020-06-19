import {Component, OnInit, Input, ViewChild, Output, Renderer2, ElementRef} from '@angular/core';
import {Item} from '../../item.model';
import {BackpackService} from '../../packback.servise';
import {BackpackServiceStorage} from '../../backpack.service.storage';
import {Backpack} from '../../backpack.model';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {EventEmitter} from '@angular/core' ;

@Component({
  selector: 'app-backpack-item',
  templateUrl: './backpack-item.component.html',
  styleUrls: ['./backpack-item.component.css']
})


export class BackpackItemComponent implements OnInit {

  @Input() backpack: Backpack;
  @Input() item: Item;
  items: Item[];
  selectedItem = <Item>{};
  selectedBackpack = <Backpack>{};
  backpacks: Backpack[];
  itemForm: FormGroup;
  itemsCount: number;
  lF: number = 0;
  lm: number;
  ls: number;
  flag = false;
  editMode = false;
  addingNewItemActive = false;
  iconList = false;
  nu2: number;
  iconListBackpack = false;
  @ViewChild('iconList2') iconList2: ElementRef;
  @Output() dataEvent = new EventEmitter<Item>();

  constructor(private backpackService: BackpackService,
              private backpackServiceStorage: BackpackServiceStorage,
              private fb: FormBuilder,
              private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.dataEvent.subscribe((item: Item) => {
      this.selectedItem = item;
    });

    this.backpackService.backpackSelected.subscribe((backpack: Backpack) => {
      this.selectedBackpack = backpack;
      this.items = this.selectedBackpack.items;
      this.itemsCount = this.items.length;
    });
    this.initForm();
  }


  onSelected() {
    this.backpackService.backpackSelected.emit(this.backpack);
    this.backpackServiceStorage.getBackpacks().subscribe((data: Backpack[]) => {
      this.backpacks = data;
    });

    this.backpackService.backpackSelected.subscribe((backpack: Backpack) => {
      this.selectedBackpack = backpack;
      this.items = this.selectedBackpack.items;
      this.itemsCount = this.items.length;
    });
  }

  onSubmit() {
    if (!this.editMode) {
      this.addingNewItemActive = false;
      this.backpackServiceStorage.postNewItems(this.selectedBackpack.id, this.itemForm.value).subscribe(
        data => {
          this.getItemsForSelectedBackpack();
        },
        error => {
          console.log('Error', error);
        }
      );
    } else {
      this.backpackServiceStorage.updateItem(this.selectedBackpack.id, this.selectedItem.id, this.itemForm.value).subscribe(
        data => {
          this.getItemsForSelectedBackpack();
        },
        error => {
          console.log('Error', error);
        }
      );
      this.hideAddNewItemModel();
      this.editMode = false;
    }

  }


  onInputLength() {
    return this.itemForm.value['description'].length > 200;
  }

  onWritingWords() {
    return isNaN(this.itemForm.value['weight']);
  }

  private initForm() {

    const itemName = '';
    const itemWeight = '';
    const itemVolume = '';
    const itemDescription = '';
    const itemQuantity = '';
    const itemImage = '';
    const itemPriority = '';

    this.itemForm = new FormGroup({

      name: new FormControl(itemName, Validators.required),
      weight: new FormControl(itemWeight, Validators.required),
      volume: new FormControl(itemVolume),
      description: new FormControl(itemDescription,),
      quantity: new FormControl(itemQuantity,),
      image: new FormControl(itemImage),
      priority: new FormControl(itemPriority,),

    });
  }

  onNewItem() {
    this.editMode = false;
    this.addingNewItemActive = true;
    this.initForm();
  }

  checkPosition() {
    if (!this.flag) {
      this.lF = this.nu2
      this.renderer.setStyle(this.iconList2.nativeElement, 'top', this.lF + 'px');
      this.renderer.setStyle(this.iconList2.nativeElement, 'display', 'block');
      this.flag = true;
      this.lm = this.lF + 1;
      this.ls = this.lF - 1;
    }
  };


  public onHover(e) {
    this.nu2 = e.y - 300;
    let nu: number = e.target.id;
    let selectedItem2: Item = this.items.find(element => element.id == nu);
    //    let selectedItem2: Item   = new Item(100, "eeebie5",  2,  20,  "sasdrrrrasd",  2, "2", "https://cdn.pixabay.com/photo/2015/12/21/00/06/motivation-1101887_960_720.jpg");

    this.item = selectedItem2;
    this.dataEvent.emit(this.item);

    this.checkPosition();
    if (this.nu2 > this.lm || this.nu2 < this.ls) {
      this.renderer.setStyle(this.iconList2.nativeElement, 'display', 'none');
      this.flag = false;
      this.lm = 0;
      this.ls = 0;
      this.checkPosition();
    }
    this.iconList = true;
    return e.isTrusted;
  }

  public onLeave(event) {
    this.iconList = false;
  }

  public onEdit() {
    this.editMode = true;
    this.showAddNewItemModel();
    const itemName = this.selectedItem.name;
    const itemWeight = this.selectedItem.weight;
    const itemVolume = this.selectedItem.volume;
    const itemDescription = this.selectedItem.description;
    const itemQuantity = this.selectedItem.quantity;
    const itemImage = this.selectedItem.image;
    const itemPriority = this.selectedItem.priority;

    this.itemForm = new FormGroup({
      name: new FormControl(itemName),
      weight: new FormControl(itemWeight),
      volume: new FormControl(itemVolume),
      description: new FormControl(itemDescription),
      quantity: new FormControl(itemQuantity),
      image: new FormControl(itemImage),
      priority: new FormControl(itemPriority),
    })
  }

  public onDelete() {
    this.backpackServiceStorage.deleteItem(this.selectedBackpack.id, this.selectedItem.id).subscribe(
      data => {
        this.getItemsForSelectedBackpack();
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  public getItemsForSelectedBackpack() {
    this.backpackServiceStorage.getBackpackById(this.selectedBackpack.id).subscribe((backpack: any) => {
      this.selectedBackpack = backpack;
      this.items = this.selectedBackpack.items;
      this.itemsCount = this.items.length;
    });
  }

  public hideAddNewItemModel() {
    this.addingNewItemActive = false;
  }

  public showAddNewItemModel() {
    this.addingNewItemActive = true;
  }


}


