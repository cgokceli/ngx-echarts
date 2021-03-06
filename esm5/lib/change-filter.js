/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of, empty } from 'rxjs';
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
export { ChangeFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ChangeFilter.prototype._changes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1lY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NoYW5nZS1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBYyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDO0lBQ0Usc0JBQW9CLFFBQXVCO1FBQXZCLGFBQVEsR0FBUixRQUFRLENBQWU7SUFBSSxDQUFDOzs7OztJQUV6QyxlQUFFOzs7O0lBQVQsVUFBVSxPQUFzQjtRQUM5QixPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUVELCtCQUFROzs7OztJQUFSLFVBQVksR0FBVztRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7O2dCQUNoQixLQUFLLEdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZO1lBRWhELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUN6QyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQjtTQUNGO1FBQ0QsT0FBTyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCwwQkFBRzs7Ozs7SUFBSCxVQUFPLEdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztnQkFDaEIsS0FBSyxHQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWTtZQUNoRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQjtRQUNELE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsK0JBQVE7Ozs7O0lBQVIsVUFBWSxHQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7O2dCQUN2RCxLQUFLLEdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZO1lBQ2hELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCx1Q0FBZ0I7Ozs7O0lBQWhCLFVBQW9CLEdBQVc7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTs7Z0JBQ3ZELEtBQUssR0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVk7WUFFaEQsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCO1NBQ0Y7UUFDRCxPQUFPLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7Ozs7Ozs7SUEzQ2EsZ0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgZW1wdHkgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VGaWx0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHsgfVxyXG5cclxuICBzdGF0aWMgb2YoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VGaWx0ZXIoY2hhbmdlcyk7XHJcbiAgfVxyXG5cclxuICBub3RFbXB0eTxUPihrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgaWYgKHRoaXMuX2NoYW5nZXNba2V5XSkge1xyXG4gICAgICBjb25zdCB2YWx1ZTogVCA9IHRoaXMuX2NoYW5nZXNba2V5XS5jdXJyZW50VmFsdWU7XHJcblxyXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBvZih2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgaGFzPFQ+KGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBpZiAodGhpcy5fY2hhbmdlc1trZXldKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlOiBUID0gdGhpcy5fY2hhbmdlc1trZXldLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgcmV0dXJuIG9mKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgbm90Rmlyc3Q8VD4oa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGlmICh0aGlzLl9jaGFuZ2VzW2tleV0gJiYgIXRoaXMuX2NoYW5nZXNba2V5XS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgY29uc3QgdmFsdWU6IFQgPSB0aGlzLl9jaGFuZ2VzW2tleV0uY3VycmVudFZhbHVlO1xyXG4gICAgICByZXR1cm4gb2YodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICBub3RGaXJzdEFuZEVtcHR5PFQ+KGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBpZiAodGhpcy5fY2hhbmdlc1trZXldICYmICF0aGlzLl9jaGFuZ2VzW2tleV0uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlOiBUID0gdGhpcy5fY2hhbmdlc1trZXldLmN1cnJlbnRWYWx1ZTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG9mKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVtcHR5KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==