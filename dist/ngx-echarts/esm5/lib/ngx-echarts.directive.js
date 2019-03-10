/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { init } from 'echarts';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChangeFilter } from './change-filter';
var NgxEchartsDirective = /** @class */ (function () {
    function NgxEchartsDirective(el, ngZone) {
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
    NgxEchartsDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var filter = ChangeFilter.of(changes);
        filter.notFirstAndEmpty('options').subscribe((/**
         * @param {?} opt
         * @return {?}
         */
        function (opt) { return _this.onOptionsChange(opt); }));
        filter.notFirstAndEmpty('merge').subscribe((/**
         * @param {?} opt
         * @return {?}
         */
        function (opt) { return _this.setOption(opt); }));
        filter.has('loading').subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return _this.toggleLoading(!!v); }));
        filter.notFirst('theme').subscribe((/**
         * @return {?}
         */
        function () { return _this.refreshChart(); }));
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(50)).subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.autoResize && window.innerWidth !== _this.currentWindowWidth) {
                _this.currentWindowWidth = window.innerWidth;
                _this.currentOffsetWidth = _this.el.nativeElement.offsetWidth;
                _this.currentOffsetHeight = _this.el.nativeElement.offsetHeight;
                _this.resize();
            }
        }));
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resizeSub && this.resizeSub.unsubscribe();
        this.dispose();
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        // No heavy work in DoCheck!
        if (this.chart && this.autoResize) {
            /** @type {?} */
            var offsetWidth = this.el.nativeElement.offsetWidth;
            /** @type {?} */
            var offsetHeight = this.el.nativeElement.offsetHeight;
            if (this.currentOffsetWidth !== offsetWidth || this.currentOffsetHeight !== offsetHeight) {
                this.currentOffsetWidth = offsetWidth;
                this.currentOffsetHeight = offsetHeight;
                this.resize();
            }
        }
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.initChart(); }));
    };
    /**
     * @private
     * @return {?}
     */
    NgxEchartsDirective.prototype.dispose = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxEchartsDirective.prototype.resize = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.chart) {
            this.chart.resize();
        }
    };
    /**
     * @private
     * @param {?} loading
     * @return {?}
     */
    NgxEchartsDirective.prototype.toggleLoading = /**
     * @private
     * @param {?} loading
     * @return {?}
     */
    function (loading) {
        if (this.chart) {
            loading ? this.chart.showLoading(this.loadingType, this.loadingOpts) : this.chart.hideLoading();
        }
    };
    /**
     * @private
     * @param {?} option
     * @param {?=} opts
     * @return {?}
     */
    NgxEchartsDirective.prototype.setOption = /**
     * @private
     * @param {?} option
     * @param {?=} opts
     * @return {?}
     */
    function (option, opts) {
        if (this.chart) {
            this.chart.setOption(option, opts);
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxEchartsDirective.prototype.refreshChart = /**
     * @private
     * @return {?}
     */
    function () {
        this.dispose();
        this.initChart();
    };
    /**
     * @private
     * @return {?}
     */
    NgxEchartsDirective.prototype.createChart = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.currentWindowWidth = window.innerWidth;
        this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
        this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
        /** @type {?} */
        var dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            /** @type {?} */
            var prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if ((!prop || prop === '0px') &&
                (!dom.style.height || dom.style.height === '0px')) {
                dom.style.height = '400px';
            }
        }
        return this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return init(dom, _this.theme, _this.initOpts); }));
    };
    /**
     * @private
     * @return {?}
     */
    NgxEchartsDirective.prototype.initChart = /**
     * @private
     * @return {?}
     */
    function () {
        this.onOptionsChange(this.options);
        if (this.merge && this.chart) {
            this.setOption(this.merge);
        }
    };
    /**
     * @private
     * @param {?} opt
     * @return {?}
     */
    NgxEchartsDirective.prototype.onOptionsChange = /**
     * @private
     * @param {?} opt
     * @return {?}
     */
    function (opt) {
        if (opt) {
            if (!this.chart) {
                this.chart = this.createChart();
                this.chartInit.emit(this.chart);
            }
            this.chart.setOption(this.options, true);
        }
    };
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    /**
     * @private
     * @template T
     * @param {?} eventName
     * @return {?}
     */
    NgxEchartsDirective.prototype.createLazyEvent = 
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    /**
     * @private
     * @template T
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) {
        var _this = this;
        return (/** @type {?} */ (this.chartInit.pipe(switchMap((/**
         * @param {?} chart
         * @return {?}
         */
        function (chart) { return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            chart.on(eventName, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return observer.next(data); })); }));
            return null; // no need to react on unsubscribe as long as the `dispose()` is called in ngOnDestroy
        })); })))));
    };
    NgxEchartsDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'echarts, [echarts]',
                },] }
    ];
    /** @nocollapse */
    NgxEchartsDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
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
    return NgxEchartsDirective;
}());
export { NgxEchartsDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWVjaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWVjaGFydHMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWdDLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUF5QixJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DO0lBaUVFLDZCQUFvQixFQUFjLEVBQVUsTUFBYztRQUF0QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQW5EakQsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUV4Qix1QkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBQywrRUFBK0U7OztRQUd6RyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7UUFHeEMsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0Msa0JBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxtQkFBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkQsaUJBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMs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LHNDQUErQjs7SUFDL0Isb0NBQXVCOztJQUN2QixzQ0FBMEI7O0lBQzFCLHVDQUtFOztJQUNGLG9DQUE2Qjs7SUFDN0IseUNBQTJCOztJQUMzQiwwQ0FBaUM7O0lBQ2pDLDBDQUE2Qjs7SUFDN0IsaURBQW1DOztJQUduQyx3Q0FBa0Q7O0lBR2xELHlDQUFxRDs7SUFDckQsNENBQTJEOztJQUMzRCw2Q0FBNkQ7O0lBQzdELDZDQUE2RDs7SUFDN0QsMkNBQXlEOztJQUN6RCw2Q0FBNkQ7O0lBQzdELDRDQUEyRDs7SUFDM0QsNkNBQTZEOztJQUM3RCwrQ0FBaUU7O0lBR2pFLHVEQUFpRjs7SUFDakYsa0RBQXVFOztJQUN2RSxvREFBMkU7O0lBQzNFLGdEQUFtRTs7SUFDbkUsNENBQTJEOztJQUMzRCxxREFBNkU7O0lBQzdFLG1EQUF5RTs7SUFDekUsdURBQWlGOztJQUNqRiwyQ0FBeUQ7O0lBQ3pELG1EQUF5RTs7SUFDekUsb0RBQTJFOztJQUMzRSxvREFBMkU7O0lBQzNFLCtDQUFpRTs7SUFDakUsaURBQXFFOztJQUNyRSxvREFBMkU7O0lBQzNFLCtDQUFpRTs7SUFDakUsaURBQXFFOztJQUNyRSxvREFBMkU7O0lBQzNFLHNEQUErRTs7SUFDL0Usd0RBQW1GOztJQUNuRix5Q0FBcUQ7O0lBQ3JELGlEQUFxRTs7SUFDckUsNENBQTJEOztJQUMzRCw0Q0FBMkQ7Ozs7O0lBRTNELG9DQUF1Qjs7Ozs7SUFDdkIsaURBQStCOzs7OztJQUMvQixrREFBZ0M7Ozs7O0lBQ2hDLGlEQUFtQzs7Ozs7SUFDbkMsd0NBQWdDOzs7OztJQUVwQixpQ0FBc0I7Ozs7O0lBQUUscUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBEb0NoZWNrLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ1pvbmUsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFQ2hhcnRPcHRpb24sIEVDaGFydHMsIGluaXQgfSBmcm9tICdlY2hhcnRzJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENoYW5nZUZpbHRlciB9IGZyb20gJy4vY2hhbmdlLWZpbHRlcic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2VjaGFydHMsIFtlY2hhcnRzXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hFY2hhcnRzRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkgb3B0aW9uczogRUNoYXJ0T3B0aW9uO1xyXG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBpbml0T3B0czoge1xyXG4gICAgZGV2aWNlUGl4ZWxSYXRpbz86IG51bWJlclxyXG4gICAgcmVuZGVyZXI/OiBzdHJpbmdcclxuICAgIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nXHJcbiAgICBoZWlnaHQ/OiBudW1iZXIgfCBzdHJpbmdcclxuICB9O1xyXG4gIEBJbnB1dCgpIG1lcmdlOiBFQ2hhcnRPcHRpb247XHJcbiAgQElucHV0KCkgYXV0b1Jlc2l6ZSA9IHRydWU7XHJcbiAgQElucHV0KCkgbG9hZGluZ1R5cGUgPSAnZGVmYXVsdCc7XHJcbiAgQElucHV0KCkgbG9hZGluZ09wdHM6IG9iamVjdDtcclxuICBASW5wdXQoKSBkZXRlY3RFdmVudENoYW5nZXMgPSB0cnVlOyAvLyBkZXByZWNhdGVkLCBsZWZ0IGZvciBjb21wYXRpYmlsaXR5IHJlYXNvbnMgdG8gYXZvaWQgdHJpZ2dlcmluZyBtYWpvciB2ZXJzaW9uXHJcblxyXG4gIC8vIG5neC1lY2hhcnRzIGV2ZW50c1xyXG4gIEBPdXRwdXQoKSBjaGFydEluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPEVDaGFydHM+KCk7XHJcblxyXG4gIC8vIGVjaGFydHMgbW91c2UgZXZlbnRzXHJcbiAgQE91dHB1dCgpIGNoYXJ0Q2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2xpY2snKTtcclxuICBAT3V0cHV0KCkgY2hhcnREYmxDbGljayA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdkYmxjbGljaycpO1xyXG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlRG93biA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZWRvd24nKTtcclxuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU1vdmUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2Vtb3ZlJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VVcCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZXVwJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VPdmVyID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlb3ZlcicpO1xyXG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlT3V0ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlb3V0Jyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0R2xvYmFsT3V0ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2dsb2JhbG91dCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydENvbnRleHRNZW51ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRleHRtZW51Jyk7XHJcblxyXG4gIC8vIGVjaGFydHMgbW91c2UgZXZlbnRzXHJcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmRzZWxlY3RjaGFuZ2VkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRMZWdlbmRVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHVuc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRMZWdlbmRTY3JvbGwgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2Nyb2xsJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVpvb20gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXpvb20nKTtcclxuICBAT3V0cHV0KCkgY2hhcnREYXRhUmFuZ2VTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdkYXRhcmFuZ2VzZWxlY3RlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydFRpbWVsaW5lQ2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1lbGluZWNoYW5nZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRUaW1lbGluZVBsYXlDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWVsaW5lcGxheWNoYW5nZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRSZXN0b3JlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3Jlc3RvcmUnKTtcclxuICBAT3V0cHV0KCkgY2hhcnREYXRhVmlld0NoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXZpZXdjaGFuZ2VkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0TWFnaWNUeXBlQ2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYWdpY3R5cGVjaGFuZ2VkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0UGllU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwaWVzZWxlY3RjaGFuZ2VkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0UGllU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGllc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRQaWVVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BpZXVuc2VsZWN0ZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRNYXBTZWxlY3RDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21hcHNlbGVjdGNoYW5nZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRNYXBTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYXBzZWxlY3RlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydE1hcFVuc2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFwdW5zZWxlY3RlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydEF4aXNBcmVhU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnYXhpc2FyZWFzZWxlY3RlZCcpO1xyXG4gIEBPdXRwdXQoKSBjaGFydEZvY3VzTm9kZUFkamFjZW5jeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdmb2N1c25vZGVhZGphY2VuY3knKTtcclxuICBAT3V0cHV0KCkgY2hhcnRVbmZvY3VzTm9kZUFkamFjZW5jeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd1bmZvY3Vzbm9kZWFkamFjZW5jeScpO1xyXG4gIEBPdXRwdXQoKSBjaGFydEJydXNoID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2JydXNoJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0QnJ1c2hTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaHNlbGVjdGVkJyk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0UmVuZGVyZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVuZGVyZWQnKTtcclxuICBAT3V0cHV0KCkgY2hhcnRGaW5pc2hlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdmaW5pc2hlZCcpO1xyXG5cclxuICBwcml2YXRlIGNoYXJ0OiBFQ2hhcnRzO1xyXG4gIHByaXZhdGUgY3VycmVudE9mZnNldFdpZHRoID0gMDtcclxuICBwcml2YXRlIGN1cnJlbnRPZmZzZXRIZWlnaHQgPSAwO1xyXG4gIHByaXZhdGUgY3VycmVudFdpbmRvd1dpZHRoOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSByZXNpemVTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IGZpbHRlciA9IENoYW5nZUZpbHRlci5vZihjaGFuZ2VzKTtcclxuICAgIGZpbHRlci5ub3RGaXJzdEFuZEVtcHR5PGFueT4oJ29wdGlvbnMnKS5zdWJzY3JpYmUob3B0ID0+IHRoaXMub25PcHRpb25zQ2hhbmdlKG9wdCkpO1xyXG4gICAgZmlsdGVyLm5vdEZpcnN0QW5kRW1wdHk8YW55PignbWVyZ2UnKS5zdWJzY3JpYmUob3B0ID0+IHRoaXMuc2V0T3B0aW9uKG9wdCkpO1xyXG4gICAgZmlsdGVyLmhhczxib29sZWFuPignbG9hZGluZycpLnN1YnNjcmliZSh2ID0+IHRoaXMudG9nZ2xlTG9hZGluZyghIXYpKTtcclxuICAgIGZpbHRlci5ub3RGaXJzdDxzdHJpbmc+KCd0aGVtZScpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlZnJlc2hDaGFydCgpKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yZXNpemVTdWIgPSBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJykucGlwZShkZWJvdW5jZVRpbWUoNTApKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5hdXRvUmVzaXplICYmIHdpbmRvdy5pbm5lcldpZHRoICE9PSB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5yZXNpemVTdWIgJiYgdGhpcy5yZXNpemVTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgLy8gTm8gaGVhdnkgd29yayBpbiBEb0NoZWNrIVxyXG4gICAgaWYgKHRoaXMuY2hhcnQgJiYgdGhpcy5hdXRvUmVzaXplKSB7XHJcbiAgICAgIGNvbnN0IG9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICBjb25zdCBvZmZzZXRIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgaWYgKHRoaXMuY3VycmVudE9mZnNldFdpZHRoICE9PSBvZmZzZXRXaWR0aCB8fCB0aGlzLmN1cnJlbnRPZmZzZXRIZWlnaHQgIT09IG9mZnNldEhlaWdodCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gb2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbml0Q2hhcnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc3Bvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICB0aGlzLmNoYXJ0LmRpc3Bvc2UoKTtcclxuICAgICAgdGhpcy5jaGFydCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2l6ZSgpIHtcclxuICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgIHRoaXMuY2hhcnQucmVzaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZUxvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcclxuICAgICAgbG9hZGluZyA/IHRoaXMuY2hhcnQuc2hvd0xvYWRpbmcodGhpcy5sb2FkaW5nVHlwZSwgdGhpcy5sb2FkaW5nT3B0cykgOiB0aGlzLmNoYXJ0LmhpZGVMb2FkaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldE9wdGlvbihvcHRpb246IGFueSwgb3B0cz86IGFueSkge1xyXG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcclxuICAgICAgdGhpcy5jaGFydC5zZXRPcHRpb24ob3B0aW9uLCBvcHRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaENoYXJ0KCkge1xyXG4gICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmluaXRDaGFydCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDaGFydCgpIHtcclxuICAgIHRoaXMuY3VycmVudFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLmN1cnJlbnRPZmZzZXRXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBkb20gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG4gICAgICBjb25zdCBwcm9wID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKTtcclxuICAgICAgaWYgKCghcHJvcCB8fCBwcm9wID09PSAnMHB4JykgJiZcclxuICAgICAgICAoIWRvbS5zdHlsZS5oZWlnaHQgfHwgZG9tLnN0eWxlLmhlaWdodCA9PT0gJzBweCcpKSB7XHJcbiAgICAgICAgZG9tLnN0eWxlLmhlaWdodCA9ICc0MDBweCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gaW5pdChkb20sIHRoaXMudGhlbWUsIHRoaXMuaW5pdE9wdHMpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdENoYXJ0KCkge1xyXG4gICAgdGhpcy5vbk9wdGlvbnNDaGFuZ2UodGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICBpZiAodGhpcy5tZXJnZSAmJiB0aGlzLmNoYXJ0KSB7XHJcbiAgICAgIHRoaXMuc2V0T3B0aW9uKHRoaXMubWVyZ2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk9wdGlvbnNDaGFuZ2Uob3B0OiBFQ2hhcnRPcHRpb24pIHtcclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgaWYgKCF0aGlzLmNoYXJ0KSB7XHJcbiAgICAgICAgdGhpcy5jaGFydCA9IHRoaXMuY3JlYXRlQ2hhcnQoKTtcclxuICAgICAgICB0aGlzLmNoYXJ0SW5pdC5lbWl0KHRoaXMuY2hhcnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNoYXJ0LnNldE9wdGlvbih0aGlzLm9wdGlvbnMsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYWxsb3dzIHRvIGxhemlseSBiaW5kIHRvIG9ubHkgdGhvc2UgZXZlbnRzIHRoYXQgYXJlIHJlcXVlc3RlZCB0aHJvdWdoIHRoZSBgQE91dHB1dGAgYnkgcGFyZW50IGNvbXBvbmVudHNcclxuICAvLyBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTE3ODc5NzIvb3B0aW1hbC1yZWVudGVyaW5nLXRoZS1uZ3pvbmUtZnJvbS1ldmVudGVtaXR0ZXItZXZlbnQgZm9yIG1vcmUgaW5mb1xyXG4gIHByaXZhdGUgY3JlYXRlTGF6eUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogRXZlbnRFbWl0dGVyPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmNoYXJ0SW5pdC5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKGNoYXJ0OiBFQ2hhcnRzKSA9PiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgY2hhcnQub24oZXZlbnROYW1lLCAoZGF0YTogVCkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZGF0YSkpKTtcclxuICAgICAgICByZXR1cm4gbnVsbDsgLy8gbm8gbmVlZCB0byByZWFjdCBvbiB1bnN1YnNjcmliZSBhcyBsb25nIGFzIHRoZSBgZGlzcG9zZSgpYCBpcyBjYWxsZWQgaW4gbmdPbkRlc3Ryb3lcclxuICAgICAgfSkpXHJcbiAgICApIGFzIEV2ZW50RW1pdHRlcjxUPjtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==