import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../category';
import { PfmService } from '../pfm.service';
import { FormGroup, FormBuilder } from '@angular/forms';






@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public category: Category[] = [];
  selected: any;
  submitting: string = "";
  form!: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transacionService: PfmService, public formBuilder: FormBuilder, public dialogRef: MatDialogRef<CategoryComponent>) { }

  ngOnInit(): void {

    this.transacionService.getCategories().subscribe((categories: Category[]) => {

      this.category = categories;
    });

    this.form = this.formBuilder.group({
      kategori: '',
      sabkategori: ''
    })
  }
  submit(form: any) {
    console.log(this.data.element.id);
    const a = this.data.element.id;
    const b = form.value.kategori;
    this.transacionService.addCategory(a, { "catcode": `${form.value.kategori}` }).subscribe(res => {
      console.log(res);
    });
    //this.dialogRef.close(``);


    for (let index = 0; index < this.category.length; index++) {
      if (this.category[index].code == `${form.value.kategori}`) {
        this.submitting = this.category[index].name;
        console.log(this.submitting);
      }

    }

    this.dialogRef.close(this.submitting);

  }

}
