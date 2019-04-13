import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BloggerProvider } from "../../providers/blogger/blogger";

@Component({
  selector: "page-blog",
  templateUrl: "blog.html"
})
export class BlogPage {
  name = Array<any>();
  name2: any;
  doc = Array<any>();
  doc2: Array<any>;
  len: any;
  n: any = 0;
  arr = new Map();
  arr1 = new Map();
  bool: boolean = false;

  constructor(
    public navCtrl: NavController,
    private service: BloggerProvider
  ) {}

  ionViewDidLoad() {
    this.service.getBlog().subscribe(info => {
      this.len = info.items.length; //length of array of blogs

      for (let element of info.items) {
        //this.doc.push(element.content);
        this.arr.set(element.title, element.content);
        this.doc.push({ name: element.title, status: element.content });
      }
      for (let element of info.items) {
        this.name.push(element.title);
      }

      this.arr1 = this.arr;

      // this.doc2 = info.items[0].content;
      console.log(this.arr1);
      this.bool = true;
    });
  }
}
