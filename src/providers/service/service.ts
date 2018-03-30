import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Http, Jsonp } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppGlobal {
    // 缓存key的配置
    static cache: any = {
        slides: "_dress_slides",
        categories: "_dress_categories",
        products: "_dress_products"
    };

    //接口基地址
    static domain = "http://i.qingting.fm";
    static dosubmain = "http://recpage.c.qingting.fm";

    //接口地址
    static API: any = {
        // 精选页面
        getNeoRecommendBanner: '/capi/neo-recommend/banner',
        getNeoRecommendAttrs: '/capi/neo-recommend/attrs',
        getNeoChannelFilter: '/capi/neo-channel-filter',
        getHotPageCategory: '/v2/hotpage/category',
    };
}

@Injectable()
export class AppService {
    constructor(
        public http: Http,
        public jsonp: Jsonp,
        public loadingCtrl: LoadingController,
        public alertController: AlertController,
        public toastController: ToastController,
    ) {}

    // 对参数进行编码
    encode(params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length -1);
        }
        return str;
    }

    httpGetJsonp(domain, url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create({});
        if (loader) {
            loading.present();
        }
        this.http.get(domain + url + this.encode(params))
            .toPromise()
            .then(res => {
                var d = res.json();
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            })
            .catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }

    httpPost(url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        this.http.post(AppGlobal.domain + url, params)
            .toPromise()
            .then(res => {
                var d = res.json();
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            })
            .catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }

    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '请求无效(code: 400)';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在(code: 404)';
            console.log(msg + ',请检查路径是否正确');
        }
        if (error.status == 500) {
            msg = '服务器发生错误(code: 500)';
            console.log(msg + ',请检查路径是否正确');
        }
        console.log(error);
        if (msg != '') {
            this.toast(msg);
        }
    }

    alert(message, callback?) {
        if (callback) {
            let alert = this.alertController.create({
                title: '提示',
                message: message,
                buttons: [{
                    text: '确定',
                    handler: data => {
                        callback();
                    }
                }]
            });
            alert.present();
        } else {
            let alert = this.alertController.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert.present();
        }
    }

    toast(message, callback?) {
        let toast = this.toastController.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    }

    setItem(key: string, obj: any) {
        try {
            var json = JSON.stringify(obj);
            window.localStorage[key] = json;
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    }

    getItem(key: string, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    }
}
