/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { init } from 'echarts';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChangeFilter } from './change-filter';
export class NgxEchartsDirective {
    /**
     * @param {?} el
     * @param {?} ngZone
     */
    constructor(el, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.autoResize = true;
        this.loadingType = 'default';
        this.detectEventChanges = true; // deprecated, left for compatibility reasons to avoid triggering major version
        // deprecated, left for compatibility reasons to avoid triggering major version
        // ngx-echarts events
        this.chartInit = new EventEmitter();
        // echarts mouse events
        this.chartClick = this.createLazyEvent('click');
        this.chartDblClick = this.createLazyEvent('dblclick');
        this.chartMouseDown = this.createLazyEvent('mousedown');
        this.chartMouseMove = this.createLazyEvent('mousemove');
        this.chartMouseUp = this.createLazyEvent('mouseup');
        this.chartMouseOver = this.createLazyEvent('mouseover');
        this.chartMouseOut = this.createLazyEvent('mouseout');
        this.chartGlobalOut = this.createLazyEvent('globalout');
        this.chartContextMenu = this.createLazyEvent('contextmenu');
        // echarts mouse events
        this.chartLegendSelectChanged = this.createLazyEvent('legendselectchanged');
        this.chartLegendSelected = this.createLazyEvent('legendselected');
        this.chartLegendUnselected = this.createLazyEvent('legendunselected');
        this.chartLegendScroll = this.createLazyEvent('legendscroll');
        this.chartDataZoom = this.createLazyEvent('datazoom');
        this.chartDataRangeSelected = this.createLazyEvent('datarangeselected');
        this.chartTimelineChanged = this.createLazyEvent('timelinechanged');
        this.chartTimelinePlayChanged = this.createLazyEvent('timelineplaychanged');
        this.chartRestore = this.createLazyEvent('restore');
        this.chartDataViewChanged = this.createLazyEvent('dataviewchanged');
        this.chartMagicTypeChanged = this.createLazyEvent('magictypechanged');
        this.chartPieSelectChanged = this.createLazyEvent('pieselectchanged');
        this.chartPieSelected = this.createLazyEvent('pieselected');
        this.chartPieUnselected = this.createLazyEvent('pieunselected');
        this.chartMapSelectChanged = this.createLazyEvent('mapselectchanged');
        this.chartMapSelected = this.createLazyEvent('mapselected');
        this.chartMapUnselected = this.createLazyEvent('mapunselected');
        this.chartAxisAreaSelected = this.createLazyEvent('axisareaselected');
        this.chartFocusNodeAdjacency = this.createLazyEvent('focusnodeadjacency');
        this.chartUnfocusNodeAdjacency = this.createLazyEvent('unfocusnodeadjacency');
        this.chartBrush = this.createLazyEvent('brush');
        this.chartBrushSelected = this.createLazyEvent('brushselected');
        this.chartRendered = this.createLazyEvent('rendered');
        this.chartFinished = this.createLazyEvent('finished');
        this.currentOffsetWidth = 0;
        this.currentOffsetHeight = 0;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const filter = ChangeFilter.of(changes);
        filter.notFirstAndEmpty('options').subscribe((/**
         * @param {?} opt
         * @return {?}
         */
        opt => this.onOptionsChange(opt)));
        filter.notFirstAndEmpty('merge').subscribe((/**
         * @param {?} opt
         * @return {?}
         */
        opt => this.setOption(opt)));
        filter.has('loading').subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => this.toggleLoading(!!v)));
        filter.notFirst('theme').subscribe((/**
         * @return {?}
         */
        () => this.refreshChart()));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(50)).subscribe((/**
         * @return {?}
         */
        () => {
            if (this.autoResize && window.innerWidth !== this.currentWindowWidth) {
                this.currentWindowWidth = window.innerWidth;
                this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
                this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
                this.resize();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resizeSub && this.resizeSub.unsubscribe();
        this.dispose();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        // No heavy work in DoCheck!
        if (this.chart && this.autoResize) {
            /** @type {?} */
            const offsetWidth = this.el.nativeElement.offsetWidth;
            /** @type {?} */
            const offsetHeight = this.el.nativeElement.offsetHeight;
            if (this.currentOffsetWidth !== offsetWidth || this.currentOffsetHeight !== offsetHeight) {
                this.currentOffsetWidth = offsetWidth;
                this.currentOffsetHeight = offsetHeight;
                this.resize();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => this.initChart()));
    }
    /**
     * @private
     * @return {?}
     */
    dispose() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    resize() {
        if (this.chart) {
            this.chart.resize();
        }
    }
    /**
     * @private
     * @param {?} loading
     * @return {?}
     */
    toggleLoading(loading) {
        if (this.chart) {
            loading ? this.chart.showLoading(this.loadingType, this.loadingOpts) : this.chart.hideLoading();
        }
    }
    /**
     * @private
     * @param {?} option
     * @param {?=} opts
     * @return {?}
     */
    setOption(option, opts) {
        if (this.chart) {
            this.chart.setOption(option, opts);
        }
    }
    /**
     * @private
     * @return {?}
     */
    refreshChart() {
        this.dispose();
        this.initChart();
    }
    /**
     * @private
     * @return {?}
     */
    createChart() {
        this.currentWindowWidth = window.innerWidth;
        this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
        this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
        /** @type {?} */
        const dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            /** @type {?} */
            const prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if ((!prop || prop === '0px') &&
                (!dom.style.height || dom.style.height === '0px')) {
                dom.style.height = '400px';
            }
        }
        return this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => init(dom, this.theme, this.initOpts)));
    }
    /**
     * @private
     * @return {?}
     */
    initChart() {
        this.onOptionsChange(this.options);
        if (this.merge && this.chart) {
            this.setOption(this.merge);
        }
    }
    /**
     * @private
     * @param {?} opt
     * @return {?}
     */
    onOptionsChange(opt) {
        if (opt) {
            if (!this.chart) {
                this.chart = this.createChart();
                this.chartInit.emit(this.chart);
            }
            this.chart.setOption(this.options, true);
        }
    }
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    /**
     * @private
     * @template T
     * @param {?} eventName
     * @return {?}
     */
    createLazyEvent(eventName) {
        return (/** @type {?} */ (this.chartInit.pipe(switchMap((/**
         * @param {?} chart
         * @return {?}
         */
        (chart) => new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => {
            chart.on(eventName, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => this.ngZone.run((/**
             * @return {?}
             */
            () => observer.next(data)))));
            return null; // no need to react on unsubscribe as long as the `dispose()` is called in ngOnDestroy
        })))))));
    }
}
NgxEchartsDirective.decorators = [
    { type: Directive, args: [{
                selector: 'echarts, [echarts]',
            },] }
];
/** @nocollapse */
NgxEchartsDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
NgxEchartsDirective.propDecorators = {
    options: [{ type: Input }],
    theme: [{ type: Input }],
    loading: [{ type: Input }],
    initOpts: [{ type: Input }],
    merge: [{ type: Input }],
    autoResize: [{ type: Input }],
    loadingType: [{ type: Input }],
    loadingOpts: [{ type: Input }],
    detectEventChanges: [{ type: Input }],
    chartInit: [{ type: Output }],
    chartClick: [{ type: Output }],
    chartDblClick: [{ type: Output }],
    chartMouseDown: [{ type: Output }],
    chartMouseMove: [{ type: Output }],
    chartMouseUp: [{ type: Output }],
    chartMouseOver: [{ type: Output }],
    chartMouseOut: [{ type: Output }],
    chartGlobalOut: [{ type: Output }],
    chartContextMenu: [{ type: Output }],
    chartLegendSelectChanged: [{ type: Output }],
    chartLegendSelected: [{ type: Output }],
    chartLegendUnselected: [{ type: Output }],
    chartLegendScroll: [{ type: Output }],
    chartDataZoom: [{ type: Output }],
    chartDataRangeSelected: [{ type: Output }],
    chartTimelineChanged: [{ type: Output }],
    chartTimelinePlayChanged: [{ type: Output }],
    chartRestore: [{ type: Output }],
    chartDataViewChanged: [{ type: Output }],
    chartMagicTypeChanged: [{ type: Output }],
    chartPieSelectChanged: [{ type: Output }],
    chartPieSelected: [{ type: Output }],
    chartPieUnselected: [{ type: Output }],
    chartMapSelectChanged: [{ type: Output }],
    chartMapSelected: [{ type: Output }],
    chartMapUnselected: [{ type: Output }],
    chartAxisAreaSelected: [{ type: Output }],
    chartFocusNodeAdjacency: [{ type: Output }],
    chartUnfocusNodeAdjacency: [{ type: Output }],
    chartBrush: [{ type: Output }],
    chartBrushSelected: [{ type: Output }],
    chartRendered: [{ type: Output }],
    chartFinished: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgxEchartsDirective.prototype.options;
    /** @type {?} */
    NgxEchartsDirective.prototype.theme;
    /** @type {?} */
    NgxEchartsDirective.prototype.loading;
    /** @type {?} */
    NgxEchartsDirective.prototype.initOpts;
    /** @type {?} */
    NgxEchartsDirective.prototype.merge;
    /** @type {?} */
    NgxEchartsDirective.prototype.autoResize;
    /** @type {?} */
    NgxEchartsDirective.prototype.loadingType;
    /** @type {?} */
    NgxEchartsDirective.prototype.loadingOpts;
    /** @type {?} */
    NgxEchartsDirective.prototype.detectEventChanges;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartInit;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartClick;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartDblClick;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMouseDown;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMouseMove;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMouseUp;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMouseOver;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMouseOut;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartGlobalOut;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartContextMenu;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartLegendSelectChanged;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartLegendSelected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartLegendUnselected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartLegendScroll;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartDataZoom;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartDataRangeSelected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartTimelineChanged;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartTimelinePlayChanged;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartRestore;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartDataViewChanged;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMagicTypeChanged;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartPieSelectChanged;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartPieSelected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartPieUnselected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMapSelectChanged;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMapSelected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartMapUnselected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartAxisAreaSelected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartFocusNodeAdjacency;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartUnfocusNodeAdjacency;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartBrush;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartBrushSelected;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartRendered;
    /** @type {?} */
    NgxEchartsDirective.prototype.chartFinished;
    /**
     * @type {?}
     * @private
     */
    NgxEchartsDirective.prototype.chart;
    /**
     * @type {?}
     * @private
     */
    NgxEchartsDirective.prototype.currentOffsetWidth;
    /**
     * @type {?}
     * @private
     */
    NgxEchartsDirective.prototype.currentOffsetHeight;
    /**
     * @type {?}
     * @private
     */
    NgxEchartsDirective.prototype.currentWindowWidth;
    /**
     * @type {?}
     * @private
     */
    NgxEchartsDirective.prototype.resizeSub;
    /**
     * @type {?}
     * @private
     */
    NgxEchartsDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    NgxEchartsDirective.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWVjaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWVjaGFydHMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWdDLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUF5QixJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSy9DLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBOEQ5QixZQUFvQixFQUFjLEVBQVUsTUFBYztRQUF0QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQW5EakQsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUV4Qix1QkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBQywrRUFBK0U7OztRQUd6RyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7UUFHeEMsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0Msa0JBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxtQkFBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkQsaUJBQVksR0FBRyxJQUFJ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REFBbUU7O0lBQ25FLDRDQUEyRDs7SUFDM0QscURBQTZFOztJQUM3RSxtREFBeUU7O0lBQ3pFLHVEQUFpRjs7SUFDakYsMkNBQXlEOztJQUN6RCxtREFBeUU7O0lBQ3pFLG9EQUEyRTs7SUFDM0Usb0RBQTJFOztJQUMzRSwrQ0FBaUU7O0lBQ2pFLGlEQUFxRTs7SUFDckUsb0RBQTJFOztJQUMzRSwrQ0FBaUU7O0lBQ2pFLGlEQUFxRTs7SUFDckUsb0RBQTJFOztJQUMzRSxzREFBK0U7O0lBQy9FLHdEQUFtRjs7SUFDbkYseUNBQXFEOztJQUNyRCxpREFBcUU7O0lBQ3JFLDRDQUEyRDs7SUFDM0QsNENBQTJEOzs7OztJQUUzRCxvQ0FBdUI7Ozs7O0lBQ3ZCLGlEQUErQjs7Ozs7SUFDL0Isa0RBQWdDOzs7OztJQUNoQyxpREFBbUM7Ozs7O0lBQ25DLHdDQUFnQzs7Ozs7SUFFcEIsaUNBQXNCOzs7OztJQUFFLHFDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRG9DaGVjaywgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRUNoYXJ0T3B0aW9uLCBFQ2hhcnRzLCBpbml0IH0gZnJvbSAnZWNoYXJ0cyc7XHJcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDaGFuZ2VGaWx0ZXIgfSBmcm9tICcuL2NoYW5nZS1maWx0ZXInO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdlY2hhcnRzLCBbZWNoYXJ0c10nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RWNoYXJ0c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEVDaGFydE9wdGlvbjtcclxuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaW5pdE9wdHM6IHtcclxuICAgIGRldmljZVBpeGVsUmF0aW8/OiBudW1iZXJcclxuICAgIHJlbmRlcmVyPzogc3RyaW5nXHJcbiAgICB3aWR0aD86IG51bWJlciB8IHN0cmluZ1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyIHwgc3RyaW5nXHJcbiAgfTtcclxuICBASW5wdXQoKSBtZXJnZTogRUNoYXJ0T3B0aW9uO1xyXG4gIEBJbnB1dCgpIGF1dG9SZXNpemUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGxvYWRpbmdUeXBlID0gJ2RlZmF1bHQnO1xyXG4gIEBJbnB1dCgpIGxvYWRpbmdPcHRzOiBvYmplY3Q7XHJcbiAgQElucHV0KCkgZGV0ZWN0RXZlbnRDaGFuZ2VzID0gdHJ1ZTsgLy8gZGVwcmVjYXRlZCwgbGVmdCBmb3IgY29tcGF0aWJpbGl0eSByZWFzb25zIHRvIGF2b2lkIHRyaWdnZXJpbmcgbWFqb3IgdmVyc2lvblxyXG5cclxuICAvLyBuZ3gtZWNoYXJ0cyBldmVudHNcclxuICBAT3V0cHV0KCkgY2hhcnRJbml0ID0gbmV3IEV2ZW50RW1pdHRlcjxFQ2hhcnRzPigpO1xyXG5cclxuICAvLyBlY2hhcnRzIG1vdXNlIGV2ZW50c1xyXG4gIEBPdXRwdXQoKSBjaGFydENsaWNrID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NsaWNrJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0RGJsQ2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGJsY2xpY2snKTtcclxuICBAT3V0cHV0KCkgY2hhcnRNb3VzZURvd24gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2Vkb3duJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VNb3ZlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlbW92ZScpO1xyXG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlVXAgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2V1cCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlT3ZlciA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZW92ZXInKTtcclxuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU91dCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZW91dCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydEdsb2JhbE91dCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdnbG9iYWxvdXQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRDb250ZXh0TWVudSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjb250ZXh0bWVudScpO1xyXG5cclxuICAvLyBlY2hhcnRzIG1vdXNlIGV2ZW50c1xyXG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFNlbGVjdENoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2VsZWN0Y2hhbmdlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHNlbGVjdGVkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kVW5zZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmR1bnNlbGVjdGVkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2Nyb2xsID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHNjcm9sbCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydERhdGFab29tID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RhdGF6b29tJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVJhbmdlU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXJhbmdlc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRUaW1lbGluZUNoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgndGltZWxpbmVjaGFuZ2VkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0VGltZWxpbmVQbGF5Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1lbGluZXBsYXljaGFuZ2VkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0UmVzdG9yZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdyZXN0b3JlJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVZpZXdDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RhdGF2aWV3Y2hhbmdlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydE1hZ2ljVHlwZUNoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFnaWN0eXBlY2hhbmdlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydFBpZVNlbGVjdENoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGllc2VsZWN0Y2hhbmdlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydFBpZVNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BpZXNlbGVjdGVkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0UGllVW5zZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwaWV1bnNlbGVjdGVkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TWFwU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYXBzZWxlY3RjaGFuZ2VkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TWFwU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFwc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRNYXBVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21hcHVuc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRBeGlzQXJlYVNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2F4aXNhcmVhc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRGb2N1c05vZGVBZGphY2VuY3kgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZm9jdXNub2RlYWRqYWNlbmN5Jyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0VW5mb2N1c05vZGVBZGphY2VuY3kgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgndW5mb2N1c25vZGVhZGphY2VuY3knKTtcclxuICBAT3V0cHV0KCkgY2hhcnRCcnVzaCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydEJydXNoU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnYnJ1c2hzZWxlY3RlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydFJlbmRlcmVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3JlbmRlcmVkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0RmluaXNoZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZmluaXNoZWQnKTtcclxuXHJcbiAgcHJpdmF0ZSBjaGFydDogRUNoYXJ0cztcclxuICBwcml2YXRlIGN1cnJlbnRPZmZzZXRXaWR0aCA9IDA7XHJcbiAgcHJpdmF0ZSBjdXJyZW50T2Zmc2V0SGVpZ2h0ID0gMDtcclxuICBwcml2YXRlIGN1cnJlbnRXaW5kb3dXaWR0aDogbnVtYmVyO1xyXG4gIHByaXZhdGUgcmVzaXplU3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBmaWx0ZXIgPSBDaGFuZ2VGaWx0ZXIub2YoY2hhbmdlcyk7XHJcbiAgICBmaWx0ZXIubm90Rmlyc3RBbmRFbXB0eTxhbnk+KCdvcHRpb25zJykuc3Vic2NyaWJlKG9wdCA9PiB0aGlzLm9uT3B0aW9uc0NoYW5nZShvcHQpKTtcclxuICAgIGZpbHRlci5ub3RGaXJzdEFuZEVtcHR5PGFueT4oJ21lcmdlJykuc3Vic2NyaWJlKG9wdCA9PiB0aGlzLnNldE9wdGlvbihvcHQpKTtcclxuICAgIGZpbHRlci5oYXM8Ym9vbGVhbj4oJ2xvYWRpbmcnKS5zdWJzY3JpYmUodiA9PiB0aGlzLnRvZ2dsZUxvYWRpbmcoISF2KSk7XHJcbiAgICBmaWx0ZXIubm90Rmlyc3Q8c3RyaW5nPigndGhlbWUnKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoQ2hhcnQoKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucmVzaXplU3ViID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLnBpcGUoZGVib3VuY2VUaW1lKDUwKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSAmJiB3aW5kb3cuaW5uZXJXaWR0aCAhPT0gdGhpcy5jdXJyZW50V2luZG93V2lkdGgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVzaXplU3ViICYmIHRoaXMucmVzaXplU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIC8vIE5vIGhlYXZ5IHdvcmsgaW4gRG9DaGVjayFcclxuICAgIGlmICh0aGlzLmNoYXJ0ICYmIHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICBjb25zdCBvZmZzZXRXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgY29uc3Qgb2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPZmZzZXRXaWR0aCAhPT0gb2Zmc2V0V2lkdGggfHwgdGhpcy5jdXJyZW50T2Zmc2V0SGVpZ2h0ICE9PSBvZmZzZXRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRPZmZzZXRXaWR0aCA9IG9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IG9mZnNldEhlaWdodDtcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW5pdENoYXJ0KCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcclxuICAgICAgdGhpcy5jaGFydC5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuY2hhcnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXNpemUoKSB7XHJcbiAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICB0aGlzLmNoYXJ0LnJlc2l6ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVMb2FkaW5nKGxvYWRpbmc6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgIGxvYWRpbmcgPyB0aGlzLmNoYXJ0LnNob3dMb2FkaW5nKHRoaXMubG9hZGluZ1R5cGUsIHRoaXMubG9hZGluZ09wdHMpIDogdGhpcy5jaGFydC5oaWRlTG9hZGluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRPcHRpb24ob3B0aW9uOiBhbnksIG9wdHM/OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgIHRoaXMuY2hhcnQuc2V0T3B0aW9uKG9wdGlvbiwgb3B0cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hDaGFydCgpIHtcclxuICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5pbml0Q2hhcnQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2hhcnQoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgdGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICB0aGlzLmN1cnJlbnRPZmZzZXRIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3QgZG9tID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgY29uc3QgcHJvcCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0Jyk7XHJcbiAgICAgIGlmICgoIXByb3AgfHwgcHJvcCA9PT0gJzBweCcpICYmXHJcbiAgICAgICAgKCFkb20uc3R5bGUuaGVpZ2h0IHx8IGRvbS5zdHlsZS5oZWlnaHQgPT09ICcwcHgnKSkge1xyXG4gICAgICAgIGRvbS5zdHlsZS5oZWlnaHQgPSAnNDAwcHgnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGluaXQoZG9tLCB0aGlzLnRoZW1lLCB0aGlzLmluaXRPcHRzKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRDaGFydCgpIHtcclxuICAgIHRoaXMub25PcHRpb25zQ2hhbmdlKHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKHRoaXMubWVyZ2UgJiYgdGhpcy5jaGFydCkge1xyXG4gICAgICB0aGlzLnNldE9wdGlvbih0aGlzLm1lcmdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25PcHRpb25zQ2hhbmdlKG9wdDogRUNoYXJ0T3B0aW9uKSB7XHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgIGlmICghdGhpcy5jaGFydCkge1xyXG4gICAgICAgIHRoaXMuY2hhcnQgPSB0aGlzLmNyZWF0ZUNoYXJ0KCk7XHJcbiAgICAgICAgdGhpcy5jaGFydEluaXQuZW1pdCh0aGlzLmNoYXJ0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jaGFydC5zZXRPcHRpb24odGhpcy5vcHRpb25zLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGFsbG93cyB0byBsYXppbHkgYmluZCB0byBvbmx5IHRob3NlIGV2ZW50cyB0aGF0IGFyZSByZXF1ZXN0ZWQgdGhyb3VnaCB0aGUgYEBPdXRwdXRgIGJ5IHBhcmVudCBjb21wb25lbnRzXHJcbiAgLy8gc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUxNzg3OTcyL29wdGltYWwtcmVlbnRlcmluZy10aGUtbmd6b25lLWZyb20tZXZlbnRlbWl0dGVyLWV2ZW50IGZvciBtb3JlIGluZm9cclxuICBwcml2YXRlIGNyZWF0ZUxhenlFdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGFydEluaXQucGlwZShcclxuICAgICAgc3dpdGNoTWFwKChjaGFydDogRUNoYXJ0cykgPT4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgIGNoYXJ0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IFQpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGRhdGEpKSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIG5vIG5lZWQgdG8gcmVhY3Qgb24gdW5zdWJzY3JpYmUgYXMgbG9uZyBhcyB0aGUgYGRpc3Bvc2UoKWAgaXMgY2FsbGVkIGluIG5nT25EZXN0cm95XHJcbiAgICAgIH0pKVxyXG4gICAgKSBhcyBFdmVudEVtaXR0ZXI8VD47XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=