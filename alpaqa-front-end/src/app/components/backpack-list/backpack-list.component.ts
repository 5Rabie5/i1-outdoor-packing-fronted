import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Backpack} from '../backpacks/backpack.model';
import {BackpackService} from '../backpacks/packback.servise';
import {BackpackServiceStorage} from '../backpacks/backpack.service.storage';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-backpack-list',
  templateUrl: './backpack-list.component.html',
  styleUrls: ['./backpack-list.component.css'],
})
export class BackpackListComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('iconListBackpack2') iconListBackpack2: ElementRef;

  backpacks: Backpack[];
  backpackForm: FormGroup;
  selectedBackpackId: number;
  iconListBackpack = false;
  editMode = false;
  addNewBackpackActive = false;

  constructor(private backpackService: BackpackService,
              private backpackServiceStorage: BackpackServiceStorage) {
  }

  ngOnInit() {
    this.getBackpacks();
    this.initForm();

  }

  getBackpacks() {
    this.backpackServiceStorage.getBackpacks().subscribe((data: Backpack[]) => {
      this.backpacks = data;
    });
  }


  onSubmit() {
    if (this.editMode) {
    // todo implement edit logic
    } else {
      this.backpackServiceStorage.postNewBackpacks(this.backpackForm.value)
        .subscribe(() => {
          this.addNewBackpackActive = false;
          this.getBackpacks();
        });
    }
  }

  onInputSameName() {
    if(!this.editMode){
    return this.backpacks.find(element => element.name == this.backpackForm.value['name']);
    }else{
      return false;
    }
  }

  onInputLength() {
    return this.backpackForm.value['description'].length > 200;
  }

  private initForm() {
    const backpackName = '';
    const backpackImage = '';
    const backpackDescription = '';


    this.backpackForm = new FormGroup({
      name: new FormControl(backpackName, Validators.required),
      image: new FormControl(backpackImage),
      description: new FormControl(backpackDescription),

    });
  }

  onNewBackpack() {
    this.showAddNewBackpackModel();
    this.initForm();
  }

  public onHover(backpack:Backpack) {
    this.selectedBackpackId = backpack.id;
    this.iconListBackpack = true;

  }

  public onLeave(event) {
    this.iconListBackpack = false;
  }

  public onEdit(backpack: Backpack) {
    this.editMode = true;
    this.showAddNewBackpackModel();
    const backpackName = backpack.name;
    const backpackImage = backpack.image;
    const backpackDescription = backpack.description;


    this.backpackForm = new FormGroup({
      name: new FormControl(backpackName),
      image: new FormControl(backpackImage),
      description: new FormControl(backpackDescription),
    });
  }

  public onDelete(backpack: Backpack) {
    this.backpackServiceStorage.deleteBackpack(backpack.id).subscribe(
      data => {
        this.getBackpacks();
      },
      error => {
        console.log('Error', error);
      }
    );

  }

  public hideAddNewBackpackModel() {
    this.addNewBackpackActive = false;
  }

  public showAddNewBackpackModel() {
    this.addNewBackpackActive = true;
  }

}

