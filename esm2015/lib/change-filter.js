/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of, empty } from 'rxjs';
export class ChangeFilter {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ChangeFilter.prototype._changes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1lY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NoYW5nZS1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBYyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE1BQU0sT0FBTyxZQUFZOzs7O0lBQ3ZCLFlBQW9CLFFBQXVCO1FBQXZCLGFBQVEsR0FBUixRQUFRLENBQWU7SUFBSSxDQUFDOzs7OztJQUVoRCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQXNCO1FBQzlCLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBRUQsUUFBUSxDQUFJLEdBQVc7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztrQkFDaEIsS0FBSyxHQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWTtZQUVoRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDekMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEI7U0FDRjtRQUNELE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsR0FBRyxDQUFJLEdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztrQkFDaEIsS0FBSyxHQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWTtZQUNoRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQjtRQUNELE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsUUFBUSxDQUFJLEdBQVc7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTs7a0JBQ3ZELEtBQUssR0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVk7WUFDaEQsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEI7UUFDRCxPQUFPLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVELGdCQUFnQixDQUFJLEdBQVc7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTs7a0JBQ3ZELEtBQUssR0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVk7WUFFaEQsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCO1NBQ0Y7UUFDRCxPQUFPLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDRjs7Ozs7O0lBM0NhLGdDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIGVtcHR5IH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlRmlsdGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7IH1cclxuXHJcbiAgc3RhdGljIG9mKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIHJldHVybiBuZXcgQ2hhbmdlRmlsdGVyKGNoYW5nZXMpO1xyXG4gIH1cclxuXHJcbiAgbm90RW1wdHk8VD4oa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGlmICh0aGlzLl9jaGFuZ2VzW2tleV0pIHtcclxuICAgICAgY29uc3QgdmFsdWU6IFQgPSB0aGlzLl9jaGFuZ2VzW2tleV0uY3VycmVudFZhbHVlO1xyXG5cclxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gb2YodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIGhhczxUPihrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgaWYgKHRoaXMuX2NoYW5nZXNba2V5XSkge1xyXG4gICAgICBjb25zdCB2YWx1ZTogVCA9IHRoaXMuX2NoYW5nZXNba2V5XS5jdXJyZW50VmFsdWU7XHJcbiAgICAgIHJldHVybiBvZih2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIG5vdEZpcnN0PFQ+KGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBpZiAodGhpcy5fY2hhbmdlc1trZXldICYmICF0aGlzLl9jaGFuZ2VzW2tleV0uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlOiBUID0gdGhpcy5fY2hhbmdlc1trZXldLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgcmV0dXJuIG9mKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgbm90Rmlyc3RBbmRFbXB0eTxUPihrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgaWYgKHRoaXMuX2NoYW5nZXNba2V5XSAmJiAhdGhpcy5fY2hhbmdlc1trZXldLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICBjb25zdCB2YWx1ZTogVCA9IHRoaXMuX2NoYW5nZXNba2V5XS5jdXJyZW50VmFsdWU7XHJcblxyXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBvZih2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbXB0eSgpO1xyXG4gIH1cclxufVxyXG4iXX0=