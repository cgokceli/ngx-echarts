import { AfterViewInit, DoCheck, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
export declare class NgxEchartsDirective implements OnChanges, OnDestroy, OnInit, DoCheck, AfterViewInit {
    private el;
    private ngZone;
    options: EChartOption;
    theme: string;
    loading: boolean;
    initOpts: {
        devicePixelRatio?: number;
        renderer?: string;
        width?: number | string;
        height?: number | string;
    };
    merge: EChartOption;
    autoResize: boolean;
    loadingType: string;
    loadingOpts: object;
    detectEventChanges: boolean;
    chartInit: EventEmitter<ECharts>;
    chartClick: EventEmitter<{}>;
    chartDblClick: EventEmitter<{}>;
    chartMouseDown: EventEmitter<{}>;
    chartMouseMove: EventEmitter<{}>;
    chartMouseUp: EventEmitter<{}>;
    chartMouseOver: EventEmitter<{}>;
    chartMouseOut: EventEmitter<{}>;
    chartGlobalOut: EventEmitter<{}>;
    chartContextMenu: EventEmitter<{}>;
    chartLegendSelectChanged: EventEmitter<{}>;
    chartLegendSelected: EventEmitter<{}>;
    chartLegendUnselected: EventEmitter<{}>;
    chartLegendScroll: EventEmitter<{}>;
    chartDataZoom: EventEmitter<{}>;
    chartDataRangeSelected: EventEmitter<{}>;
    chartTimelineChanged: EventEmitter<{}>;
    chartTimelinePlayChanged: EventEmitter<{}>;
    chartRestore: EventEmitter<{}>;
    chartDataViewChanged: EventEmitter<{}>;
    chartMagicTypeChanged: EventEmitter<{}>;
    chartPieSelectChanged: EventEmitter<{}>;
    chartPieSelected: EventEmitter<{}>;
    chartPieUnselected: EventEmitter<{}>;
    chartMapSelectChanged: EventEmitter<{}>;
    chartMapSelected: EventEmitter<{}>;
    chartMapUnselected: EventEmitter<{}>;
    chartAxisAreaSelected: EventEmitter<{}>;
    chartFocusNodeAdjacency: EventEmitter<{}>;
    chartUnfocusNodeAdjacency: EventEmitter<{}>;
    chartBrush: EventEmitter<{}>;
    chartBrushSelected: EventEmitter<{}>;
    chartRendered: EventEmitter<{}>;
    chartFinished: EventEmitter<{}>;
    private chart;
    private currentOffsetWidth;
    private currentOffsetHeight;
    private currentWindowWidth;
    private resizeSub;
    constructor(el: ElementRef, ngZone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    private dispose;
    private resize;
    private toggleLoading;
    private setOption;
    private refreshChart;
    private createChart;
    private initChart;
    private onOptionsChange;
    private createLazyEvent;
}
