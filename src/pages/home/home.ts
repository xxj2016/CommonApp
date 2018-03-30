import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { AppGlobal, AppService } from './../../providers/service/service'
import _ from 'lodash';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;
  selectedTheme: String;

  slides = [
    {
      title: 'Dream\'s Adventure',
      imageUrl: 'assets/imgs/lists/wishlist-1.jpg',
      songs: 2,
      private: false
    },
    {
      title: 'For the Weekend',
      imageUrl: 'assets/imgs/lists/wishlist-2.jpg',
      songs: 4,
      private: false
    },
    {
      title: 'Family Time',
      imageUrl: 'assets/imgs/lists/wishlist-3.jpg',
      songs: 5,
      private: true
    },
    {
      title: 'My Trip',
      imageUrl: 'assets/imgs/lists/wishlist-4.jpg',
      songs: 12,
      private: true
    }
  ];
  cards = [
    {
      imageUrl: 'assets/imgs/card/nin-live.png',
      title: 'Nine Inch Nails Live',
      description: 'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.'
    },
    {
      imageUrl: 'assets/imgs/card/badu-live.png',
      title: 'Erykah Badu',
      description: 'American singer-songwriter, record producer, activist, and actress, Badu\'s style is a prime example of neo-soul.'
    },
    {
      imageUrl: 'assets/imgs/card/queen-live.png',
      title: 'Queen',
      description: 'The British rock band formed in London in 1970, and is considered one of the biggest stadium rock bands in the world.'
    },
    {
      imageUrl: 'assets/imgs/card/bjork-live.jpg',
      title: 'Björk',
      description: 'Björk is an Icelandic singer, songwriter and actress.'
    },
    {
      imageUrl: 'assets/imgs/card/rundmc-live.png',
      title: 'Run-D.M.C.',
      description: 'The American hip hop group widely acknowledged as one of the most influential acts in the history of hip hop.'
    },];

  banners: Array<any> = []; // 轮播图
  categories: Array<any> = []; // 首页分类内容
  attrs: Array<any> = []; // 属性列表
  channels: Array<any> = []; // 分类的频道列表
  filters: Array<any> = []; // 某个分类的分类列表
  currentIndex: number; // 属性选中项
  currentActive = 0; // 分类属性选中项
  categoryParams = { // 获取对应分类的API参数
    category: 3617,
    attrs: 0,
    curpage: 1
  }
  noMore = false;
  constructor(
    public navCtrl: NavController,
    public nanParams: NavParams,
    public appService: AppService
  ) {
    for (let i = 0; i < 20; i++) {
      this.slides.push(this.slides[i % 4]);
    }
  }

  ionViewDidLoad() {
    this.getBanners();
    this.getHotPageCategory();
    this.getNeoRecommendAttrs();
    // this.getNeoChannelFilter();
  }

  ionViewWillEnter() {
    console.log(this.slider.getActiveIndex());
    this.currentIndex = this.slider.getActiveIndex();
  }
  
  cardTapped(card) {
    alert(card.title + ' was tapped.');
  }

  share(card) {
    alert(card.title + ' was shared.');
  }

  listen(card) {
    alert('Listening to ' + card.title);
  }

  favorite(card) {
    alert(card.title + ' was favorited.');
  }

  slideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    let currentAttrs = this.attrs[this.currentIndex];
    console.log('Current Attrs is', currentAttrs);
    this.categoryParams.category = currentAttrs.id;
    this.categoryParams.attrs = 0;
    this.categoryParams.curpage = 1;
    this.channels = [];
    this.currentActive = 0;
    if (this.currentIndex === 0) {

    } else {
      this.getNeoChannelFilter();
    }
  }

  tap() {
    console.log(this.slider.getActiveIndex());
  }

  // 获取分类
  getNeoRecommendAttrs() {
    this.appService.httpGetJsonp(AppGlobal.domain, AppGlobal.API.getNeoRecommendAttrs, {}, rs => {
      this.attrs = rs.data;
      this.attrs.unshift({
        id: 0,
        name: '推荐'
      })
      console.log(this.attrs);
    })
  }

  // 获取轮播图
  getBanners() {
    this.appService.httpGetJsonp(AppGlobal.domain, AppGlobal.API.getNeoRecommendBanner, {}, rs => {
      console.log(rs);
      this.banners = rs.data;
    })
  }

  // 获取精选页面内容
  getHotPageCategory() {
    let categories = [3617, 3629, 521, 3636, 545, 527, 529, 3251, 523, 531, 533];
    this.appService.httpGetJsonp(
      AppGlobal.dosubmain, AppGlobal.API.getHotPageCategory + `/${categories.join('_')}`, null, rs => {
      console.log(rs);
      this.categories = _.valuesIn(rs['data']);
      console.log(this.categories);
    })
  }

  // 获取精选页面内容
  getNeoChannelFilter() {
    this.appService.httpGetJsonp(
      AppGlobal.domain, AppGlobal.API.getNeoChannelFilter, this.categoryParams, rs => {
      console.log(rs);
      if (rs.data.channels.length === 0) {
        this.noMore = true;
      } else {
        this.noMore = false;
        this.channels = this.channels.concat(rs.data.channels);
        this.filters = rs.data.filters[0].values;
        this.filters.unshift({
          id: 0,
          name: '全部'
        })
      }
      console.log(this.channels);
      console.log(this.filters);
    })
  }

  selectFilter(filter, index) {
    this.currentActive = index;
    this.categoryParams.attrs = filter.id;
    this.channels = [];
    this.categoryParams.curpage = 1;
    this.getNeoChannelFilter();
    console.log(filter.id + ': ' + filter.name);
  }

  loadMore() {
    console.log(this.categoryParams);
    this.categoryParams.curpage += 1;
    this.getNeoChannelFilter();
  }
}
