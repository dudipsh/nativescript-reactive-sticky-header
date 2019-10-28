import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ListViewScrollEventData, RadListView} from "nativescript-ui-listview";
import {EventData, Page, View} from "tns-core-modules/ui/page";
import {screen} from "tns-core-modules/platform/platform"
import {
    Animation, AnimationDefinition,
    CubicBezierAnimationCurve
} from 'tns-core-modules/ui/animation'

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild('titleTpl', {static: false}) titleTpl: TemplateRef<any>;

    animation: Animation = undefined;
    dock: View;
    bar: View;
    listView: View;
    pageLoaded = false;
    _screenHeight;
    lastScroll;
    stopEvent = false;
    dockedLabelOpacity: number = 0;
    listViewMargin = 80;
    items: any[] = [];

    constructor(private page: Page) {
    }

    upAnimation() {
        if (this.animation && this.animation.isPlaying && !this.stopEvent) {
            //   this.animation.cancel();
               return;
        }
        const def1: AnimationDefinition = {
            target: this.bar,
            duration: 100,
            translate: {
                y: -80,
                x: 0
            },
            opacity: 0,
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        };
        const def2: AnimationDefinition = {
            target: this.dock,
            duration: 150,
            translate: {
                y: 0,
                x: 0
            },
            opacity: 1,
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        };
        this.animation = new Animation([def1, def2]);
        this.listView.marginTop = -40;
        this.animation.play().then(() => {
            this.stopEvent = true;
            this.dockedLabelOpacity = 1;
            return;
        }, (err) => {
        }).catch(() => {
        });
    }

    downAnimation() {
        if (!this.animation || !this.pageLoaded) return;
        if (this.animation && this.animation.isPlaying && !this.stopEvent) {
              return;
            //this.animation.cancel();
        }
          this.listView.marginTop = 0 ;

        const def1: AnimationDefinition = {
            target: this.bar,
            duration: 100,
            translate: {
                y: 0,
                x: 0
            },
            opacity: 1,
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        }
        const def2: AnimationDefinition = {
            target: this.dock,
            duration: 150,
            translate: {
                y: -80,
                x: 0
            },
            opacity: 0,
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        };
        this.animation = new Animation([def2, def1]);

        this.animation.play().then(() => {
            this.stopEvent = true;
            this.dockedLabelOpacity = 0;
            return;
        }, (err) => {
        }).catch(() => {
        });
    }

    onScroll(args: ListViewScrollEventData) {
        if (!this.lastScroll) {
            this.lastScroll = args.scrollOffset;
        }
        if (args && args.scrollOffset && args.scrollOffset > 1) {
            if (this.lastScroll < args.scrollOffset) {
                this.upAnimation();
            } else {
                this.downAnimation();
            }
        }
        this.lastScroll = args.scrollOffset;
        setTimeout(() => {
            this.stopEvent = false;
        }, 500)
    }


    onScrollEnded(args: ListViewScrollEventData) {
        if (args && args.scrollOffset && args.scrollOffset >= 0) {
            this.lastScroll = args.scrollOffset;
        }
    }

    ngOnInit(): void {
        this.screenHeight = 0;
        this.items = this.createItems();
    }

    ngAfterViewInit(): void {
        this.dock = this.page.getViewById<View>('dock');
        this.bar = this.page.getViewById<View>('bar');
        this.listView = this.page.getViewById<View>('listView');
        this.listView.marginTop = 0;
        this.pageLoaded = true;
    }

    get screenHeight() {
        return this._screenHeight;
    }

    set screenHeight(height: number) {
        this._screenHeight = screen.mainScreen.heightPixels - height;
    }

    createItems() {
        const items = [];
        for (let i = 0; i <= 100; i++) {
            items.push({
                name: 'name ' + i,
                id: 'id' + i,
            })
        }
        return items;
    }
    //
    // get listContext() {
    //     return {
    //         item: this.items
    //     }
    // }

}
