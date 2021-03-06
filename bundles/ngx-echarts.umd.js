(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('echarts'), require('rxjs/operators'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngx-echarts', ['exports', '@angular/core', 'echarts', 'rxjs/operators', 'rxjs'], factory) :
    (factory((global['ngx-echarts'] = {}),global.ng.core,global.echarts,global.rxjs.operators,global.rxjs));
}(this, (function (exports,core,echarts,operators,rxjs) { 'use strict';

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
                        return rxjs.of(value);
                    }
                }
                return rxjs.empty();
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
                    return rxjs.of(value);
                }
                return rxjs.empty();
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
                    return rxjs.of(value);
                }
                return rxjs.empty();
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
                        return rxjs.of(value);
                    }
                }
                return rxjs.empty();
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
            this.chartInit = new core.EventEmitter();
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
                filter.notFirstAndEmpty('options').subscribe(( /**
                 * @param {?} opt
                 * @return {?}
                 */function (opt) { return _this.onOptionsChange(opt); }));
                filter.notFirstAndEmpty('merge').subscribe(( /**
                 * @param {?} opt
                 * @return {?}
                 */function (opt) { return _this.setOption(opt); }));
                filter.has('loading').subscribe(( /**
                 * @param {?} v
                 * @return {?}
                 */function (v) { return _this.toggleLoading(!!v); }));
                filter.notFirst('theme').subscribe(( /**
                 * @return {?}
                 */function () { return _this.refreshChart(); }));
            };
        /**
         * @return {?}
         */
        NgxEchartsDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.resizeSub = rxjs.fromEvent(window, 'resize').pipe(operators.debounceTime(50)).subscribe(( /**
                 * @return {?}
                 */function () {
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
                setTimeout(( /**
                 * @return {?}
                 */function () { return _this.initChart(); }));
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
                return this.ngZone.runOutsideAngular(( /**
                 * @return {?}
                 */function () { return echarts.init(dom, _this.theme, _this.initOpts); }));
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
                return ( /** @type {?} */(this.chartInit.pipe(operators.switchMap(( /**
                 * @param {?} chart
                 * @return {?}
                 */function (chart) {
                    return new rxjs.Observable(( /**
                     * @param {?} observer
                     * @return {?}
                     */function (observer) {
                        chart.on(eventName, ( /**
                         * @param {?} data
                         * @return {?}
                         */function (data) {
                            return _this.ngZone.run(( /**
                             * @return {?}
                             */function () { return observer.next(data); }));
                        }));
                        return null; // no need to react on unsubscribe as long as the `dispose()` is called in ngOnDestroy
                    }));
                })))));
            };
        NgxEchartsDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'echarts, [echarts]',
                    },] }
        ];
        /** @nocollapse */
        NgxEchartsDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.NgZone }
            ];
        };
        NgxEchartsDirective.propDecorators = {
            options: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            loading: [{ type: core.Input }],
            initOpts: [{ type: core.Input }],
            merge: [{ type: core.Input }],
            autoResize: [{ type: core.Input }],
            loadingType: [{ type: core.Input }],
            loadingOpts: [{ type: core.Input }],
            detectEventChanges: [{ type: core.Input }],
            chartInit: [{ type: core.Output }],
            chartClick: [{ type: core.Output }],
            chartDblClick: [{ type: core.Output }],
            chartMouseDown: [{ type: core.Output }],
            chartMouseMove: [{ type: core.Output }],
            chartMouseUp: [{ type: core.Output }],
            chartMouseOver: [{ type: core.Output }],
            chartMouseOut: [{ type: core.Output }],
            chartGlobalOut: [{ type: core.Output }],
            chartContextMenu: [{ type: core.Output }],
            chartLegendSelectChanged: [{ type: core.Output }],
            chartLegendSelected: [{ type: core.Output }],
            chartLegendUnselected: [{ type: core.Output }],
            chartLegendScroll: [{ type: core.Output }],
            chartDataZoom: [{ type: core.Output }],
            chartDataRangeSelected: [{ type: core.Output }],
            chartTimelineChanged: [{ type: core.Output }],
            chartTimelinePlayChanged: [{ type: core.Output }],
            chartRestore: [{ type: core.Output }],
            chartDataViewChanged: [{ type: core.Output }],
            chartMagicTypeChanged: [{ type: core.Output }],
            chartPieSelectChanged: [{ type: core.Output }],
            chartPieSelected: [{ type: core.Output }],
            chartPieUnselected: [{ type: core.Output }],
            chartMapSelectChanged: [{ type: core.Output }],
            chartMapSelected: [{ type: core.Output }],
            chartMapUnselected: [{ type: core.Output }],
            chartAxisAreaSelected: [{ type: core.Output }],
            chartFocusNodeAdjacency: [{ type: core.Output }],
            chartUnfocusNodeAdjacency: [{ type: core.Output }],
            chartBrush: [{ type: core.Output }],
            chartBrushSelected: [{ type: core.Output }],
            chartRendered: [{ type: core.Output }],
            chartFinished: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
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

    exports.NgxEchartsModule = NgxEchartsModule;
    exports.ɵa = NgxEchartsDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-echarts.umd.js.map