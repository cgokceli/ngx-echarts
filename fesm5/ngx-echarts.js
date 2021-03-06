import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, NgModule } from '@angular/core';
import { init } from 'echarts';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of, empty, fromEvent, Observable } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ChangeFilter = /** @class */ (function () {
    function ChangeFilter(_changes) {
        this._changes = _changes;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ChangeFilter.of = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        return new ChangeFilter(changes);
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.notEmpty = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this._changes[key]) {
            /** @type {?} */
            var value = this._changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return empty();
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.has = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this._changes[key]) {
            /** @type {?} */
            var value = this._changes[key].currentValue;
            return of(value);
        }
        return empty();
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.notFirst = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this._changes[key] && !this._changes[key].isFirstChange()) {
            /** @type {?} */
            var value = this._changes[key].currentValue;
            return of(value);
        }
        return empty();
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.notFirstAndEmpty = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this._changes[key] && !this._changes[key].isFirstChange()) {
            /** @type {?} */
            var value = this._changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return empty();
    };
    return ChangeFilter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxEchartsModule = /** @class */ (function () {
    function NgxEchartsModule() {
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
    return NgxEchartsModule;
}());

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