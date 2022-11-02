import { Component, OnInit } from '@angular/core';
import { Update } from 'src/app/model/update';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  updates: any;
  id: string = ''
  title: string = ''
  date: string = ''
  shortDescription: string = ''
  Description: string = ''
  mainImage: {
      url: string
      title: string
      alt: string
  } = {
    url: '',
    title: '',
    alt: ''
  }
  tags: string = ''

  imagesAlt: string = ''
  imagesUrl: string = ''
  imagesTitle: string =''

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllUpdates()
    console.log()
  }

  logout() {
    this.auth.logout()
  }

  getAllUpdates() {
    this.data.getAllUpdates().subscribe( data => {
      this.id = String(data.length)
      this.updates = data
      console.log(data)
    })
  }

  createUpdate() {

    let update = {
      id: this.id,
      title: this.title,
      date: this.date,
      shortDescription: this.shortDescription,
      Description: this.Description,
      mainImage: {
          url: this.mainImage.url,
          title: this.mainImage.title,
          alt: this.mainImage.alt,
      } ,
      tags: this.tags,
      images: [ { url: this.imagesUrl,
        title: this.imagesTitle,
        alt: this.imagesAlt}]
    }

    console.log(update)

    this.data.createUpdate(update)



    this.clearInputs()
  }


  clearInputs() {
    this.id = ''
    this.title = ''
    this.date = ''
    this.shortDescription = ''
    this.Description = ''
    
    this.mainImage.url = ''
    this.mainImage.title = ''
    this.mainImage.alt = ''
    
    this.tags = ''
  }

}
