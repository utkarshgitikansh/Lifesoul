import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BloggerProvider {  
    url;
    url2;
    link;
    add;
    blogID='8337522737151010272';
    postID;
    apiKey='AIzaSyAmfLjybozTodarDPXI4yXEXY26Wng3-ms';


    constructor(public http: Http) {
      this.url = 'https://www.googleapis.com/blogger/v3/blogs/8337522737151010272/posts?key=AIzaSyAmfLjybozTodarDPXI4yXEXY26Wng3-ms';
      this.link='https://www.googleapis.com/blogger/v3/blogs/'+ this.blogID + '/posts/' +this.postID+'?key='+ this.apiKey;
    }
    
    getBlog(){
         
         return this.http.get(this.url).map(res =>res.json()); 
      }
  }
  