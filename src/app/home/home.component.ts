import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ListViewScrollEventData, RadListView} from "nativescript-ui-listview";
import {EventData, Page, View} from "tns-core-modules/ui/page";
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

    animation: Animation = undefined;
    dock: View
    bar: View
    listView: RadListView
    pageLoaded = false;
    scrolledEvent;
    lastScroll;
    stopEvent = false;
    dockedLabelOpacity: number = 0;
    listViewMargin = -80;
    items: any[] = [];

    constructor(private page: Page) {
    }

    onLoaded(args: EventData) {
        // if ( args.object) {
        //     layout = args.object as View;
        //     dock = layout.page.getViewById('dock') as View
        //     bar = layout.page.getViewById('bar') as View;
        //     listView = layout.page.getViewById('listView') as View;
        // }
    }

    upAnimation() {

        // if (!this.animation) return;
        if (this.animation && this.animation.isPlaying && !this.stopEvent) {
           //  this.animation.cancel();
          //  return;
        }
        // if (this.listView) {
        //    this.listView.marginTop = {unit: "dip", value: this.listViewMargin};
        // } else {
        //     console.log('No List View...')
        // }

        const def1: AnimationDefinition = {
            target: this.bar,
            duration: 250,
            translate: {
                y: 0,
                x: 0
            },
          //  height: this.listViewMargin * -1 + '',
            opacity: 0,
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        }
        const def2: AnimationDefinition = {
            target: this.dock,
            duration: 150,
            translate: {
                y: 0,
                x: 0
            },
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        };
        this.animation = new Animation([def1, def2]);
        this.animation.play().then(() => {
            this.stopEvent = true;
            this.dockedLabelOpacity = 1
        }, (err) => { console.log('canceled...') }).catch(() => {
            console.log('canceleds...')
        });
    }

    downAnimation() {
        if (!this.animation || !this.pageLoaded) return;
        if (this.animation && this.animation.isPlaying && !this.stopEvent) {
            // console.log(this.animation)
            // return;
            this.animation.cancel();
        }
     //  this.listView.marginTop = {unit: "dip", value: 0};

        const def1: AnimationDefinition = {
            target: this.bar,
            duration: 250,
            translate: {
                y: -50,
                x: 0
            },
            opacity: 1,
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        }
        const def2: AnimationDefinition = {
            target: this.dock,
            duration: 150,
            translate: {
                y: 0,
                x: 0
            },
            opacity: 0,
            curve: new CubicBezierAnimationCurve(0, .76, 0, .94)
        };
        this.animation = new Animation([def1, def2])

        this.animation.play().then(() => {
            this.stopEvent = true;
            this.dockedLabelOpacity = 0
        }, (err) => { console.log('canceled...') }).catch(() => {
            console.log('canceled...')
        });
    }

    onScroll(args: ListViewScrollEventData) {
        // if (!this.listView) {
        //     this.listView = this.page.getViewById<View>('listView')
        // }

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

         //   this.animation = undefined;
        }
    }

    ngOnInit(): void {
        this.items = this.createItems();
    }

    ngAfterViewInit(): void {
        this.dock = this.page.getViewById<View>('dock')
        this.bar = this.page.getViewById<View>('bar')
        this.listView = this.page.getViewById<RadListView>('listView')

        this.pageLoaded = true;
        console.log('*****')
        console.log(this.dock)
        console.log(this.bar)
        console.log(this.listView)
        console.log('**2***')
    }

    createItems() {
        const items = [];
        for (let i = 0; i <= 100; i++) {
            items.push({
                name: 'name ' + i,
                id: 'id'+i,
            })
        }
        return items;
    }

}
