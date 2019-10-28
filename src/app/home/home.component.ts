import {Component, OnInit} from "@angular/core";
import {ListViewScrollEventData} from "nativescript-ui-listview";
import {EventData, Page, View} from "tns-core-modules/ui/page";
import {Animation, AnimationDefinition, CubicBezierAnimationCurve} from 'tns-core-modules/ui/animation'

let layout: View = undefined;
let dock: View = undefined;
let bar: View = undefined;
let listView: View = undefined;

let animation: Animation = undefined;
let MAX = 50;
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    scrolledEvent;
    lastScroll;
    stopEvent = false;
    dockedLabelOpacity: number = 0;
    listViewMargin = -80;
    items;

    constructor() {

    }

    onLoaded(args: EventData) {
        if ( args.object) {
            layout = args.object as View;
            dock = layout.page.getViewById('dock') as View
            bar = layout.page.getViewById('bar') as View;
            listView = layout.page.getViewById('listView') as View;
        }


    }
    upAnimation() {
        if (animation && animation.isPlaying && !this.stopEvent) {
         //   animation.cancel();
            return;
        }
        listView.marginTop = {unit: "dip", value: this.listViewMargin};

        const def1: AnimationDefinition = {
            target: bar,
            duration: 250,
            translate: {
                y: 0,
                x: 0
            },
            height: this.listViewMargin * -1,
            opacity: 0,
            curve: new CubicBezierAnimationCurve(0,.76,0,.94)
        }
        const def2: AnimationDefinition = {
            target: dock,
            duration: 150,
            translate: {
                y: 0,
                x: 0
            },
            curve: new CubicBezierAnimationCurve(0,.76,0,.94)
        };
        animation = new Animation([def1, def2])
        animation.play().then(() => {
            this.stopEvent = true;
            this.dockedLabelOpacity = 1
        });
    }
    downAnimation() {
        if (animation && animation.isPlaying && !this.stopEvent) {
            return;
        }
        listView.marginTop = {unit: "dip", value: 0};

        const def1: AnimationDefinition = {
            target: bar,
            duration: 250,
            translate: {
                y: 0,
                x: 0
            },
            opacity: 1,
            curve: new CubicBezierAnimationCurve(0,.76,0,.94)
        }
        const def2: AnimationDefinition = {
            target: dock,
            duration: 150,
            translate: {
                y: 0,
                x: 0
            },
            opacity: 0,
            curve: new CubicBezierAnimationCurve(0,.76,0,.94)
        };
        animation = new Animation([def1, def2])

        animation.play().then(() => {
            this.stopEvent = true;
            this.dockedLabelOpacity = 0
        })
    }
    onScroll(args: ListViewScrollEventData) {
        if (args && args.scrollOffset &&  args.scrollOffset > 1) {
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
        if (args && args.scrollOffset &&  args.scrollOffset >= 0) {
            this.lastScroll = args.scrollOffset;
        }
    }
    ngOnInit(): void {
        this.items = this.createItems();
    }

    createItems() {
        const items = [];
        for (let i = 0; i < 2000; i++) {
            items.push({
                name: 'name ' + i,
                id: i,
            })
        }
        return items;
    }

}
