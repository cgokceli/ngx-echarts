import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, NgModule } from '@angular/core';
import { init } from 'echarts';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of, empty, fromEvent, Observable } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ChangeFilter {
    /**
     * @param {?} _changes
     */
    constructor(_changes) {
        this._changes = _changes;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    static of(changes) {
        return new ChangeFilter(changes);
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    notEmpty(key) {
        if (this._changes[key]) {
            /** @type {?} */
            const value = this._changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return empty();
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    has(key) {
        if (this._changes[key]) {
            /** @type {?} */
            const value = this._changes[key].currentValue;
            return of(value);
        }
        return empty();
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    notFirst(key) {
        if (this._changes[key] && !this._changes[key].isFirstChange()) {
            /** @type {?} */
            const value = this._changes[key].currentValue;
            return of(value);
        }
        return empty();
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    notFirstAndEmpty(key) {
        if (this._changes[key] && !this._changes[key].isFirstChange()) {
            /** @type {?} */
            const value = this._changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxEchartsDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxEchartsModule {
}
NgxEchartsModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    NgxEchartsDirective
                ],
                exports: [
                    NgxEchartsDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxEchartsModule, NgxEchartsDirective as ɵa };

//# sourceMappingURL=ngx-echarts.js.map