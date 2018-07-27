import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../api.service';
import * as  $ from 'jquery';
import * as moment from 'moment';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  private resp: Array<object> = [];
  private cities: Array<object> = [];
  private venues: Array<object> = [];
  private stations_list: Array<object> = [];
  private show_dates;
  private offer_dates;
  private prod_col_ht;
  private offer_eligible;
  user_sesh = {
    city: '',
    location: ''
  };
  location: string;
  private select_products: Array<object> = [ {
                id: 767,
                count: 0,
                price: 199,
                name: 'Instant Health Check',
                sub_name: '',
                list: [
                    {
                        icon: 'HC Icons-10',
                        text: 'Heart Health'
                    },
                    {
                        icon: 'HC Icons-05',
                        text: 'Anemia Profile'
                    },
                    {
                        icon: 'HC Icons-04',
                        text: 'Body Vitals'
                    },
                    {
                        icon: 'HC Icons-08',
                        text: 'Diabetes'
                    }
                ]
            },
            {
                id: 772,
                count: 0,
                price: 799,
                name: 'Complete Body Profile',
                sub_name: 'Instant Health Check Plus',
                list: [
                    {
                        icon: 'HC Icons-03',
                        text: 'Kidney Profile'
                    },
                    {
                        icon: 'HC Icons-01',
                        text: 'Liver Profile'
                    },
                    {
                        icon: 'HC Icons-06',
                        text: 'Thyroid Function Test'
                    },
                    {
                        icon: 'HC Icons-02',
                        text: 'Pancreas Profile'
                    },
                    {
                        icon: 'HC Icons-09',
                        text: 'Lipid Profile'
                    },
                    {
                        icon: 'HC Icons-07',
                        text: 'Iron Deficiency'
                    }
                ]
            },
            {
                id: 774,
                count: 0,
                price: 1199,
                name: 'Complete Body Profile + Vitamins',
                sub_name: 'Instant Health Check Plus',
                list: [
                    {
                        icon: 'HC Icons-03',
                        text: 'Kidney Profile'
                    },
                    {
                        icon: 'HC Icons-01',
                        text: 'Liver Profile'
                    },
                    {
                        icon: 'HC Icons-06',
                        text: 'Thyroid Function Test'
                    },
                    {
                        icon: 'HC Icons-02',
                        text: 'Pancreas Profile'
                    },
                    {
                        icon: 'HC Icons-09',
                        text: 'Lipid Profile'
                    },
                    {
                        icon: 'HC Icons-07',
                        text: 'Iron Deficiency'
                    },
                    {
                        icon: 'HC Icons-12',
                        text: 'Vitamin Profile'
                    }
                ]
            }];
private timeout;
private obj: any;
  constructor(private apiservice: ApiService) {
    this.timeout =  setTimeout(function () {
        this.date_options.minDate = new Date(this.stations.stsart_data);
        this.data_options.maxDate = new Date(this.stations.end_date);
        if (!document.querySelector<any>('.uib-right').onclick) {
          $('.uib-right').attr('onclick', 'updateSlots(1)');
      }
      if (!document.querySelector<any>('.uib-left').onclick) {
          $('.uib-left').attr('onclick', 'updateSlots(-1)');
      }
      }, 100);
   }
  ngOnInit() {
    this.Activate();
    
  }
 public Activate(){
  this.offer_dates = moment().isAfter('2018-06-08') && moment().isBefore('2018-06-14');
   this.apiservice.getCitiesBycompany().subscribe((res: any) =>{
    console.log(res);
    if(res.data.status){
      let arr = res.data.children.filter(function (item) {
        return (item.city_id == 1 || item.city_id == 2 || item.city_id == 6 || item.city_id == 5)
      });
      arr.forEach(element => {
        this.obj = this.cities.find(function (x: any) {return x.city_id == element.city_id});
        if (!this.obj) {
          this.cities.push(element);
        }
      });   
    }
  });
  this.prod_col_ht = '400px';
 }
 getVenues = function () {
   if (this.user_sesh.location === 'office') {
        this.apiservice.getBuildings(this.user_sesh.city.area, this.user_sesh.city.city_id).subscribe((data : any) =>{
          if(data.data.status){
            this.venues = data.data.children;
            if((this.offer_dates && this.user_sesh.city.city_id == 1 || this.user_sesh.city.city_id == 2 || this.user_sesh.city.city_id == 6 || this.user_sesh.city.city_id == 5) && (this.user_sesh.location == 'Office')){
              this.select_products[0].free = true;
            }else{
              this.select_products[0].free = false;
            }
              
          }
         
        });
      }
 }
 getStations = function (dt, resetKey) {
  let selected_date : string = '';
  let inactive_dates : string = '';
  let slots : string = '';
  console.log(this.user_sesh.fam_count);
  if (resetKey) {
      this.show_dates = false;
  }
  this.apiservice.getStationsFromBuildings(this.user_sesh.venue.building_id).subscribe((data : any) => {
      if(data.data.status){
        this.stations_list = data.data;
        if(!dt){
          //this.scrollTo('prod-sec');
        }
      }
  })
 this.last_slot_date = dt || moment().format('DD-MM-YYYY');
  this.apiservice.getSlotsForBuildings(this.last_slot_date , this.user_sesh.venue.building_id).subscribe((data : any) => {
    if(data.data.status){
      this.inactive_dates = data.data.inactive_dates;
      this.show_dates =true;
      this.timeout;
    }
  })
};


getFinalProduct = function () {
  if (this.user_sesh.location == 'Office' || this.user_sesh.test_for == 'Myself') {
      return [this.select_products.find(function (x) { return x.id == this.selected_product})];
  } else if (this.user_sesh.location == 'Home' && this.user_sesh.test_for != 'Myself') {
      return this.select_products.filter(function (x) {return x.count});
  } else {
      return this.select_products;
  }
};
totalPrice = function () {
  let x = 150;
  if (this.user_sesh.test_for == 'Myself') {
      const prod = this.select_products.find(function (j) { return j.id == this.selected_product});
      x += prod.price;
  } else {
      this.user_sesh.fam_products.forEach(function (y) {x += (y.price*y.count)});
  }
  return x;
};
setProdCount = function (obj, key) {
  if (key == '-') {
      if (obj.count) {
          obj.count --;
      }
  } else if (key == '+') {
      obj.count++;
  }
};
addFamilyProducts = function () {
  let cnt = 0;
  this.select_products.forEach(function (x) {cnt += x.count});
  this.select_products.forEach(function (x) { console.log(x.count)});
  if (cnt !== this.user_sesh.fam_count) {
    //   $rootScope.message = 'Please select health check type for all family members.';
    //   $uibModal.open({
    //       templateUrl: 'modules/modal.html',
    //       backdrop: 'static',
    //       size: 'md'
    //   });
    alert("choose checks for family people");
  } else {
      this.user_sesh.fam_products = this.select_products.filter(function (x) {return x.count});
      //bc.scrollTo('form-sec');                              
  }

};
getAvailableSlots = function () {
  //bc.loading = true;
  this.selected_slot = '';
  var date = moment(this.selected_date).format('YYYY-MM-DD');
  this.apiservice.getAvailableSlots(date, this.user_sesh.venue.building_id).then(function (response) {
      if (response.data.data.status) {
          this.slots = response.data.data.children[0].slot_list;
      }
      //bc.loading = false;
  }).catch(function (resopnse) {
      //bc.loading = false;
  });
};
setSlotAndProceed = function (slot) {
  this.selected_slot = slot.slot_id;
  //bc.scrollTo('form-sec');
  if (this.offer_dates && (this.user_sesh.city.city_id == 1 || this.user_sesh.city.city_id == 2 || this.user_sesh.city.city_id == 6 || this.user_sesh.city.city_id == 5) && (this.user_sesh.location == 'Office') && (this.selected_product == 767)) {
      this.offer_eligible = true;
  } else {
      this.offer_eligible = false;
  }
};
}
