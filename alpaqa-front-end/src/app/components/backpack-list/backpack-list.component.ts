import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Backpack} from '../backpacks/backpack.model';
import {BackpackService} from '../backpacks/packback.servise';
import {Item} from '../backpacks/item.model';
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
  hoverbackpack: Backpack;
  backpackForm: FormGroup;
  id: number;
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
    this.backpackServiceStorage.postNewBackpacks(this.backpackForm.value)
      .subscribe(() => {
        this.addNewBackpackActive=false;
        this.getBackpacks();
      });

  }

  onInputSameName() {
    return this.backpacks.find(element => element.name == this.backpackForm.value['name']);
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

  public onSave() {
    // this.closebutton.nativeElement.click();
  }

  public onHover(e) {

    this.iconListBackpack = true;

    let txt: string = (e.target as HTMLDivElement).innerText.split('\n')[2];
    this.hoverbackpack = this.backpacks.find(element => element.name == txt);
    console.log();
    this.id = this.hoverbackpack.id;
  }

  public onLeave(event) {
    this.iconListBackpack = false;
  }

  public onEdit() {
    this.editMode = true;
    this.showAddNewBackpackModel();
    const backpackName = this.hoverbackpack.name;
    const backpackImage = this.hoverbackpack.image;
    const backpackDescription = this.hoverbackpack.description;


    this.backpackForm = new FormGroup({
      name: new FormControl(backpackName, Validators.required),
      image: new FormControl(backpackImage),
      description: new FormControl(backpackDescription),

    });
  }

  public onDelete() {
    this.backpackServiceStorage. deleteBackpack(this.hoverbackpack.id).subscribe(
      data => {
        this.getBackpacks() ;
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

