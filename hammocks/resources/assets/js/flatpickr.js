/*! flatpickr v2.3.5, @license MIT */
function Flatpickr(e, t) {
 function n() {
  e._flatpickr && M(e._flatpickr), e._flatpickr = oe, oe.element = e, oe.instanceConfig = t || {}, J(), F(), j(), z(), U(), B(), oe.isOpen = oe.config.inline, oe.changeMonth = y, oe.clear = w, oe.close = C, oe.destroy = M, oe.formatDate = x, oe.jumpToDate = d, oe.open = S, oe.redraw = _, oe.set = A, oe.setDate = W, oe.toggle = V, oe.isMobile = !oe.config.disableMobile && !oe.config.inline && "single" === oe.config.mode && !oe.config.disable.length && !oe.config.enable.length && !oe.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), oe.isMobile || p(), s(), oe.isMobile || Object.defineProperty(oe, "dateIsPicked", {
   set: function (e) {
    ne(oe.calendarContainer, "dateIsPicked", e)
   }
  }), oe.dateIsPicked = oe.selectedDates.length > 0 || oe.config.noCalendar, oe.selectedDates.length && (oe.config.enableTime && r(), X()), oe.config.weekNumbers && (oe.calendarContainer.style.width = oe.days.clientWidth + oe.weekWrapper.clientWidth + "px"), q("Ready")
 }

 function a(e) {
  oe.config.noCalendar && !oe.selectedDates.length && (oe.selectedDates = [oe.now]), re(e), oe.selectedDates.length && (!oe.minDateHasTime || "input" !== e.type || e.target.value.length >= 2 ? (i(), X()) : setTimeout(function () {
   i(), X()
  }, 1e3))
 }

 function i() {
  if (oe.config.enableTime) {
   var e = parseInt(oe.hourElement.value, 10) || 0,
    t = parseInt(oe.minuteElement.value, 10) || 0,
    n = oe.config.enableSeconds ? parseInt(oe.secondElement.value, 10) || 0 : 0;
   oe.amPM && (e = e % 12 + 12 * ("PM" === oe.amPM.textContent)), oe.minDateHasTime && 0 === ie(oe.latestSelectedDateObj, oe.config.minDate) ? (e = Math.max(e, oe.config.minDate.getHours()), e === oe.config.minDate.getHours() && (t = Math.max(t, oe.config.minDate.getMinutes()))) : oe.maxDateHasTime && 0 === ie(oe.latestSelectedDateObj, oe.config.maxDate) && (e = Math.min(e, oe.config.maxDate.getHours()), e === oe.config.maxDate.getHours() && (t = Math.min(t, oe.config.maxDate.getMinutes()))), o(e, t, n)
  }
 }

 function r(e) {
  var t = e || oe.latestSelectedDateObj;
  t && o(t.getHours(), t.getMinutes(), t.getSeconds())
 }

 function o(e, t, n) {
  oe.selectedDates.length && oe.latestSelectedDateObj.setHours(e % 24, t, n || 0, 0), oe.config.enableTime && !oe.isMobile && (oe.hourElement.value = oe.pad(oe.config.time_24hr ? e : (12 + e) % 12 + 12 * (e % 12 === 0)), oe.minuteElement.value = oe.pad(t), !oe.config.time_24hr && oe.selectedDates.length && (oe.amPM.textContent = oe.latestSelectedDateObj.getHours() >= 12 ? "PM" : "AM"), oe.config.enableSeconds && (oe.secondElement.value = oe.pad(n)))
 }

 function l(e) {
  4 === e.target.value.length && (oe.currentYearElement.blur(), T(e.target.value), e.target.value = oe.currentYear)
 }

 function c(e) {
  e.preventDefault(), oe.changeMonth(Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)))
 }

 function s() {
  return oe.config.wrap && ["open", "close", "toggle", "clear"].forEach(function (e) {
   try {
    oe.element.querySelector("[data-" + e + "]").addEventListener("click", oe[e])
   } catch (e) {}
  }), void 0 !== window.document.createEvent && (oe.changeEvent = window.document.createEvent("HTMLEvents"), oe.changeEvent.initEvent("change", !1, !0)), oe.isMobile ? K() : (oe.debouncedResize = ae(N, 50), oe.triggerChange = function () {
   q("Change")
  }, oe.debouncedChange = ae(oe.triggerChange, 300), "range" === oe.config.mode && oe.days && oe.days.addEventListener("mouseover", Y), window.document.addEventListener("keydown", L), oe.config.inline || oe.config.static || window.addEventListener("resize", oe.debouncedResize), window.ontouchstart && window.document.addEventListener("touchstart", E), window.document.addEventListener("click", E), window.document.addEventListener("blur", E), oe.config.clickOpens && (oe.altInput || oe.input).addEventListener("focus", S), oe.config.noCalendar || (oe.prevMonthNav.addEventListener("click", function () {
   return y(-1)
  }), oe.nextMonthNav.addEventListener("click", function () {
   return y(1)
  }), oe.currentMonthElement.addEventListener("wheel", function (e) {
   return ae(c(e), 50)
  }), oe.currentYearElement.addEventListener("wheel", function (e) {
   return ae(Z(e), 50)
  }), oe.currentYearElement.addEventListener("focus", function () {
   oe.currentYearElement.select()
  }), oe.currentYearElement.addEventListener("input", l), oe.currentYearElement.addEventListener("increment", l), oe.days.addEventListener("click", P)), void(oe.config.enableTime && (oe.timeContainer.addEventListener("transitionend", H), oe.timeContainer.addEventListener("wheel", function (e) {
   return ae(a(e), 5)
  }), oe.timeContainer.addEventListener("input", a), oe.timeContainer.addEventListener("increment", a), oe.timeContainer.addEventListener("increment", oe.debouncedChange), oe.timeContainer.addEventListener("wheel", oe.debouncedChange), oe.timeContainer.addEventListener("input", oe.triggerChange), oe.hourElement.addEventListener("focus", function () {
   oe.hourElement.select()
  }), oe.minuteElement.addEventListener("focus", function () {
   oe.minuteElement.select()
  }), oe.secondElement && oe.secondElement.addEventListener("focus", function () {
   oe.secondElement.select()
  }), oe.amPM && oe.amPM.addEventListener("click", function (e) {
   a(e), oe.triggerChange(e)
  }))))
 }

 function d(e) {
  e = e ? oe.parseDate(e) : oe.latestSelectedDateObj || (oe.config.minDate > oe.now ? oe.config.minDate : oe.config.maxDate && oe.config.maxDate < oe.now ? oe.config.maxDate : oe.now);
  try {
   oe.currentYear = e.getFullYear(), oe.currentMonth = e.getMonth()
  } catch (t) {
   console.error(t.stack), console.warn("Invalid date supplied: " + e)
  }
  oe.redraw()
 }

 function u(e, t) {
  var n = e.target.parentNode.childNodes[0];
  n.value = parseInt(n.value, 10) + t * (n.step || 1);
  try {
   n.dispatchEvent(new Event("increment", {
    bubbles: !0
   }))
  } catch (e) {
   var a = window.document.createEvent("CustomEvent");
   a.initCustomEvent("increment", !0, !0, {}), n.dispatchEvent(a)
  }
 }

 function f(e) {
  var t = ee("div", "numInputWrapper"),
   n = ee("input", "numInput " + e),
   a = ee("span", "arrowUp"),
   i = ee("span", "arrowDown");
  return n.type = "text", t.appendChild(n), t.appendChild(a), t.appendChild(i), a.addEventListener("click", function (e) {
   return u(e, 1)
  }), i.addEventListener("click", function (e) {
   return u(e, -1)
  }), t
 }

 function p() {
  var e = window.document.createDocumentFragment();
  oe.calendarContainer = ee("div", "flatpickr-calendar"), oe.numInputType = navigator.userAgent.indexOf("MSIE 9.0") > 0 ? "text" : "number", oe.config.noCalendar || (e.appendChild(h()), oe.innerContainer = ee("div", "flatpickr-innerContainer"), oe.config.weekNumbers && oe.innerContainer.appendChild(b()), oe.rContainer = ee("div", "flatpickr-rContainer"), oe.rContainer.appendChild(v()), oe.rContainer.appendChild(m()), oe.innerContainer.appendChild(oe.rContainer), e.appendChild(oe.innerContainer)), oe.config.enableTime && e.appendChild(D()), "range" === oe.config.mode && oe.calendarContainer.classList.add("rangeMode"), oe.calendarContainer.appendChild(e);
  var t = oe.config.appendTo && oe.config.appendTo.nodeType;
  if (oe.config.inline || oe.config.static) {
   if (oe.calendarContainer.classList.add(oe.config.inline ? "inline" : "static"), H(), oe.config.inline && !t) return oe.element.parentNode.insertBefore(oe.calendarContainer, (oe.altInput || oe.input).nextSibling);
   if (oe.config.static) {
    var n = ee("div", "flatpickr-wrapper");
    return oe.element.parentNode.insertBefore(n, oe.element), n.appendChild(oe.element), void n.appendChild(oe.calendarContainer)
   }
  }(t ? oe.config.appendTo : window.document.body).appendChild(oe.calendarContainer)
 }

 function g(e, t, n) {
  var a = I(t, !0),
   i = ee("span", "flatpickr-day " + e, t.getDate());
  return i.dateObj = t, 0 === ie(t, oe.now) && i.classList.add("today"), a ? (i.tabIndex = 0, $(t) && (i.classList.add("selected"), "range" === oe.config.mode ? i.classList.add(0 === ie(t, oe.selectedDates[0]) ? "startRange" : "endRange") : oe.selectedDateElem = i)) : (i.classList.add("disabled"), oe.selectedDates[0] && t > oe.minRangeDate && t < oe.selectedDates[0] ? oe.minRangeDate = t : oe.selectedDates[0] && t < oe.maxRangeDate && t > oe.selectedDates[0] && (oe.maxRangeDate = t)), "range" === oe.config.mode && (Q(t) && !$(t) && i.classList.add("inRange"), 1 === oe.selectedDates.length && (t < oe.minRangeDate || t > oe.maxRangeDate) && i.classList.add("notAllowed")), oe.config.weekNumbers && "prevMonthDay" !== e && n % 7 === 1 && oe.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" + oe.config.getWeek(t) + "</span>"), q("DayCreate", i), i
 }

 function m() {
  oe.days || (oe.days = ee("div", "flatpickr-days"), oe.days.tabIndex = -1), oe.firstOfMonth = (new Date(oe.currentYear, oe.currentMonth, 1).getDay() - oe.l10n.firstDayOfWeek + 7) % 7, oe.prevMonthDays = oe.utils.getDaysinMonth((oe.currentMonth - 1 + 12) % 12);
  var e = oe.utils.getDaysinMonth(),
   t = window.document.createDocumentFragment(),
   n = oe.prevMonthDays + 1 - oe.firstOfMonth;
  oe.config.weekNumbers && oe.weekNumbers.firstChild && (oe.weekNumbers.textContent = ""), "range" === oe.config.mode && (oe.minRangeDate = new Date(oe.currentYear, oe.currentMonth - 1, n), oe.maxRangeDate = new Date(oe.currentYear, oe.currentMonth + 1, (42 - oe.firstOfMonth) % e)), oe.days.firstChild && (oe.days.textContent = "");
  for (var a = 0; n <= oe.prevMonthDays; a++, n++) t.appendChild(g("prevMonthDay", new Date(oe.currentYear, oe.currentMonth - 1, n), n));
  for (n = 1; n <= e; n++) t.appendChild(g("", new Date(oe.currentYear, oe.currentMonth, n), n));
  for (var i = e + 1; i <= 42 - oe.firstOfMonth; i++) t.appendChild(g("nextMonthDay", new Date(oe.currentYear, oe.currentMonth + 1, i % e), i));
  return oe.days.appendChild(t), oe.days
 }

 function h() {
  var e = window.document.createDocumentFragment();
  oe.monthNav = ee("div", "flatpickr-month"), oe.prevMonthNav = ee("span", "flatpickr-prev-month"), oe.prevMonthNav.innerHTML = oe.config.prevArrow, oe.currentMonthElement = ee("span", "cur-month"), oe.currentMonthElement.title = oe.l10n.scrollTitle;
  var t = f("cur-year");
  return oe.currentYearElement = t.childNodes[0], oe.currentYearElement.title = oe.l10n.scrollTitle, oe.config.minDate && (oe.currentYearElement.min = oe.config.minDate.getFullYear()), oe.config.maxDate && (oe.currentYearElement.max = oe.config.maxDate.getFullYear(), oe.currentYearElement.disabled = oe.config.minDate && oe.config.minDate.getFullYear() === oe.config.maxDate.getFullYear()), oe.nextMonthNav = ee("span", "flatpickr-next-month"), oe.nextMonthNav.innerHTML = oe.config.nextArrow, oe.navigationCurrentMonth = ee("span", "flatpickr-current-month"), oe.navigationCurrentMonth.appendChild(oe.currentMonthElement), oe.navigationCurrentMonth.appendChild(t), e.appendChild(oe.prevMonthNav), e.appendChild(oe.navigationCurrentMonth), e.appendChild(oe.nextMonthNav), oe.monthNav.appendChild(e), G(), oe.monthNav
 }

 function D() {
  oe.calendarContainer.classList.add("hasTime"), oe.config.noCalendar && oe.calendarContainer.classList.add("noCalendar"), oe.timeContainer = ee("div", "flatpickr-time"), oe.timeContainer.tabIndex = -1;
  var e = ee("span", "flatpickr-time-separator", ":"),
   t = f("flatpickr-hour");
  oe.hourElement = t.childNodes[0];
  var n = f("flatpickr-minute");
  if (oe.minuteElement = n.childNodes[0], oe.hourElement.tabIndex = oe.minuteElement.tabIndex = 0, oe.hourElement.pattern = oe.minuteElement.pattern = "\\d*", oe.hourElement.value = oe.pad(oe.latestSelectedDateObj ? oe.latestSelectedDateObj.getHours() : oe.config.defaultHour), oe.minuteElement.value = oe.pad(oe.latestSelectedDateObj ? oe.latestSelectedDateObj.getMinutes() : oe.config.defaultMinute), oe.hourElement.step = oe.config.hourIncrement, oe.minuteElement.step = oe.config.minuteIncrement, oe.hourElement.min = oe.config.time_24hr ? 0 : 1, oe.hourElement.max = oe.config.time_24hr ? 23 : 12, oe.minuteElement.min = 0, oe.minuteElement.max = 59, oe.hourElement.title = oe.minuteElement.title = oe.l10n.scrollTitle, oe.timeContainer.appendChild(t), oe.timeContainer.appendChild(e), oe.timeContainer.appendChild(n), oe.config.time_24hr && oe.timeContainer.classList.add("time24hr"), oe.config.enableSeconds) {
   oe.timeContainer.classList.add("hasSeconds");
   var a = f("flatpickr-second");
   oe.secondElement = a.childNodes[0], oe.secondElement.pattern = oe.hourElement.pattern, oe.secondElement.value = oe.latestSelectedDateObj ? oe.pad(oe.latestSelectedDateObj.getSeconds()) : "00", oe.secondElement.step = oe.minuteElement.step, oe.secondElement.min = oe.minuteElement.min, oe.secondElement.max = oe.minuteElement.max, oe.timeContainer.appendChild(ee("span", "flatpickr-time-separator", ":")), oe.timeContainer.appendChild(a)
  }
  return oe.config.time_24hr || (oe.amPM = ee("span", "flatpickr-am-pm", ["AM", "PM"][oe.hourElement.value > 11 | 0]), oe.amPM.title = oe.l10n.toggleTitle, oe.amPM.tabIndex = 0, oe.timeContainer.appendChild(oe.amPM)), oe.timeContainer
 }

 function v() {
  oe.weekdayContainer || (oe.weekdayContainer = ee("div", "flatpickr-weekdays"));
  var e = oe.l10n.firstDayOfWeek,
   t = oe.l10n.weekdays.shorthand.slice();
  return e > 0 && e < t.length && (t = [].concat(t.splice(e, t.length), t.splice(0, e))), oe.weekdayContainer.innerHTML = "\n\t\t<span class=flatpickr-weekday>\n\t\t\t" + t.join("</span><span class=flatpickr-weekday>") + "\n\t\t</span>\n\t\t", oe.weekdayContainer
 }

 function b() {
  return oe.calendarContainer.classList.add("hasWeeks"), oe.weekWrapper = ee("div", "flatpickr-weekwrapper"), oe.weekWrapper.appendChild(ee("span", "flatpickr-weekday", oe.l10n.weekAbbreviation)), oe.weekNumbers = ee("div", "flatpickr-weeks"), oe.weekWrapper.appendChild(oe.weekNumbers), oe.weekWrapper
 }

 function y(e, t) {
  oe.currentMonth = "undefined" == typeof t || t ? oe.currentMonth + e : e, T(), G(), m(), oe.config.noCalendar || oe.days.focus(), q("MonthChange")
 }

 function w(e) {
  oe.input.value = "", oe.altInput && (oe.altInput.value = ""), oe.mobileInput && (oe.mobileInput.value = ""), oe.selectedDates = [], oe.latestSelectedDateObj = null, oe.dateIsPicked = !1, oe.redraw(), e !== !1 && q("Change")
 }

 function C() {
  oe.isOpen = !1, oe.isMobile || (oe.calendarContainer.classList.remove("open"), (oe.altInput || oe.input).classList.remove("active")), q("Close")
 }

 function M(e) {
  e = e || oe, e.clear(!1), window.document.removeEventListener("keydown", L), window.removeEventListener("resize", e.debouncedResize), window.document.removeEventListener("click", E), window.document.removeEventListener("touchstart", E), window.document.removeEventListener("blur", E), e.timeContainer && e.timeContainer.removeEventListener("transitionend", H), e.mobileInput && e.mobileInput.parentNode ? e.mobileInput.parentNode.removeChild(e.mobileInput) : e.calendarContainer && e.calendarContainer.parentNode && e.calendarContainer.parentNode.removeChild(e.calendarContainer), e.altInput && (e.input.type = "text", e.altInput.parentNode && e.altInput.parentNode.removeChild(e.altInput)), e.input.type = e.input._type, e.input.classList.remove("flatpickr-input"), e.input.removeEventListener("focus", S), e.input.removeAttribute("readonly"), delete e.input._flatpickr
 }

 function k(e) {
  for (var t = e; t;) {
   if (/flatpickr-day|flatpickr-calendar/.test(t.className)) return !0;
   t = t.parentNode
  }
  return !1
 }

 function E(e) {
  var t = oe.element.contains(e.target) || e.target === oe.input || e.target === oe.altInput || e.path && e.path.indexOf && (~e.path.indexOf(oe.input) || ~e.path.indexOf(oe.altInput));
  !oe.isOpen || oe.config.inline || k(e.target) || t || (e.preventDefault(), oe.close(), "range" === oe.config.mode && 1 === oe.selectedDates.length && (oe.clear(), oe.redraw()))
 }

 function x(e, t) {
  if (oe.config.formatDate) return oe.config.formatDate(e, t);
  var n = e.split("");
  return n.map(function (e, a) {
   return oe.formats[e] && "\\" !== n[a - 1] ? oe.formats[e](t) : "\\" !== e ? e : ""
  }).join("")
 }

 function T(e) {
  oe.currentMonth < 0 || oe.currentMonth > 11 ? (oe.currentYear += oe.currentMonth > 11 ? 1 : -1, oe.currentMonth = (oe.currentMonth + 12) % 12, q("YearChange")) : e && (!oe.currentYearElement.min || e >= oe.currentYearElement.min) && (!oe.currentYearElement.max || e <= oe.currentYearElement.max) && (oe.currentYear = parseInt(e, 10) || oe.currentYear, oe.config.maxDate && oe.currentYear === oe.config.maxDate.getFullYear() ? oe.currentMonth = Math.min(oe.config.maxDate.getMonth(), oe.currentMonth) : oe.config.minDate && oe.currentYear === oe.config.minDate.getFullYear() && (oe.currentMonth = Math.max(oe.config.minDate.getMonth(), oe.currentMonth)), oe.redraw(), q("YearChange"))
 }

 function I(e, t) {
  var n = ie(e, oe.config.minDate, "undefined" != typeof t ? t : !oe.minDateHasTime) < 0,
   a = ie(e, oe.config.maxDate, "undefined" != typeof t ? t : !oe.maxDateHasTime) > 0;
  if (n || a) return !1;
  if (!oe.config.enable.length && !oe.config.disable.length) return !0;
  for (var i, r = oe.parseDate(e, !0), o = oe.config.enable.length > 0, l = o ? oe.config.enable : oe.config.disable, c = 0; c < l.length; c++) {
   if (i = l[c], i instanceof Function && i(r)) return o;
   if (i instanceof Date && i.getTime() === r.getTime()) return o;
   if ("string" == typeof i && oe.parseDate(i, !0).getTime() === r.getTime()) return o;
   if ("object" === ("undefined" == typeof i ? "undefined" : _typeof(i)) && i.from && i.to && r >= i.from && r <= i.to) return o
  }
  return !o
 }

 function L(e) {
  if (oe.isOpen) switch (e.which) {
   case 13:
    oe.timeContainer && oe.timeContainer.contains(e.target) ? X() : P(e);
    break;
   case 27:
    oe.close();
    break;
   case 37:
    e.target !== oe.input & e.target !== oe.altInput && y(-1);
    break;
   case 38:
    e.preventDefault(), oe.currentYear++, oe.redraw();
    break;
   case 39:
    e.target !== oe.input & e.target !== oe.altInput && y(1);
    break;
   case 40:
    e.preventDefault(), oe.currentYear--, oe.redraw()
  }
 }

 function Y(e) {
  if (1 === oe.selectedDates.length && e.target.classList.contains("flatpickr-day")) {
   for (var t = e.target.dateObj, n = oe.parseDate(oe.selectedDates[0], !0), a = Math.min(t.getTime(), oe.selectedDates[0].getTime()), i = Math.max(t.getTime(), oe.selectedDates[0].getTime()), r = !1, o = a; o < i; o += oe.utils.duration.DAY)
    if (!I(new Date(o))) {
     r = !0;
     break
    }
   for (var l = function (o, l) {
     var c = o < oe.minRangeDate.getTime() || o > oe.maxRangeDate.getTime();
     if (c) return oe.days.childNodes[l].classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function (e) {
      oe.days.childNodes[l].classList.remove(e)
     }), "continue";
     if (r && !c) return "continue";
     ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (e) {
      oe.days.childNodes[l].classList.remove(e)
     });
     var s = Math.max(oe.minRangeDate.getTime(), a),
      d = Math.min(oe.maxRangeDate.getTime(), i);
     e.target.classList.add(t < oe.selectedDates[0] ? "startRange" : "endRange"), n > t && o === n.getTime() ? oe.days.childNodes[l].classList.add("endRange") : n < t && o === n.getTime() ? oe.days.childNodes[l].classList.add("startRange") : o > s && o < d && oe.days.childNodes[l].classList.add("inRange")
    }, c = oe.days.childNodes[0].dateObj.getTime(), s = 0; s < 42; s++, c += oe.utils.duration.DAY) {
    l(c, s)
   }
  }
 }

 function N() {
  !oe.isOpen || oe.config.static || oe.config.inline || H()
 }

 function S(e) {
  return oe.isMobile ? (e && (e.preventDefault(), e.target.blur()), setTimeout(function () {
   oe.mobileInput.click()
  }, 0), void q("Open")) : void(oe.isOpen || (oe.altInput || oe.input).disabled || oe.config.inline || (oe.calendarContainer.classList.add("open"), oe.config.static || oe.config.inline || H(), oe.isOpen = !0, oe.config.allowInput || ((oe.altInput || oe.input).blur(), (oe.config.noCalendar ? oe.timeContainer : oe.selectedDateElem ? oe.selectedDateElem : oe.days).focus()), (oe.altInput || oe.input).classList.add("active"), q("Open")))
 }

 function O(e) {
  return function (t) {
   var n = oe.config["_" + e + "Date"] = oe.parseDate(t),
    a = oe.config["_" + ("min" === e ? "max" : "min") + "Date"];
   oe.selectedDates && (oe.selectedDates = oe.selectedDates.filter(I), X()), oe.days && _(), oe.currentYearElement && (t && n instanceof Date ? (oe[e + "DateHasTime"] = n.getHours() || n.getMinutes() || n.getSeconds(), oe.currentYearElement[e] = n.getFullYear()) : oe.currentYearElement.removeAttribute(e), oe.currentYearElement.disabled = a && n && a.getFullYear() === n.getFullYear())
  }
 }

 function F() {
  var e = ["utc", "wrap", "weekNumbers", "allowInput", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"],
   t = ["onChange", "onClose", "onDayCreate", "onOpen", "onReady", "onValueUpdate"];
  oe.config = Object.create(Flatpickr.defaultConfig), Object.defineProperty(oe.config, "minDate", {
   get: function () {
    return this._minDate
   },
   set: O("min")
  }), Object.defineProperty(oe.config, "maxDate", {
   get: function () {
    return this._maxDate
   },
   set: O("max")
  });
  var n = _extends({}, oe.instanceConfig, JSON.parse(JSON.stringify(oe.element.dataset || {})));
  _extends(oe.config, n);
  for (var a = 0; a < e.length; a++) oe.config[e[a]] = oe.config[e[a]] === !0 || "true" === oe.config[e[a]];
  for (var i = 0; i < t.length; i++) oe.config[t[i]] = te(oe.config[t[i]]);
  !n.dateFormat && n.enableTime && (oe.config.dateFormat = oe.config.noCalendar ? "H:i" + (oe.config.enableSeconds ? ":S" : "") : Flatpickr.defaultConfig.dateFormat + " H:i" + (oe.config.enableSeconds ? ":S" : "")), n.altInput && n.enableTime && !n.altFormat && (oe.config.altFormat = oe.config.noCalendar ? "h:i" + (oe.config.enableSeconds ? ":S K" : " K") : Flatpickr.defaultConfig.altFormat + (" h:i" + (oe.config.enableSeconds ? ":S" : "") + " K"));
  for (var r = 0; r < oe.config.plugins.length; r++) {
   var o = oe.config.plugins[r](oe) || {};
   for (var l in o) Array.isArray(oe.config[l]) ? oe.config[l] = te(o[l]).concat(oe.config[l]) : void 0 !== n[l] && (oe.config[l] = o[l])
  }
 }

 function j() {
  "object" !== _typeof(oe.config.locale) && "undefined" == typeof Flatpickr.l10ns[oe.config.locale] && console.warn("flatpickr: invalid locale " + oe.config.locale), oe.l10n = _extends(Object.create(Flatpickr.l10ns.default), "object" === _typeof(oe.config.locale) ? oe.config.locale : "default" !== oe.config.locale ? Flatpickr.l10ns[oe.config.locale] || {} : {})
 }

 function H(e) {
  if (!e || e.target === oe.timeContainer) {
   var t = oe.calendarContainer.offsetHeight,
    n = oe.calendarContainer.offsetWidth,
    a = oe.altInput || oe.input,
    i = a.getBoundingClientRect(),
    r = window.innerHeight - i.bottom + a.offsetHeight,
    o = r < t + 60,
    l = window.pageYOffset + i.top + (o ? -t - 2 : a.offsetHeight + 2);
   if (ne(oe.calendarContainer, "arrowTop", !o), ne(oe.calendarContainer, "arrowBottom", o), !oe.config.inline) {
    var c = window.pageXOffset + i.left,
     s = window.document.body.offsetWidth - i.right,
     d = c + n > window.document.body.offsetWidth;
    ne(oe.calendarContainer, "rightMost", d), oe.config.static || (oe.calendarContainer.style.top = l + "px", d ? (oe.calendarContainer.style.left = "auto", oe.calendarContainer.style.right = s + "px") : (oe.calendarContainer.style.left = c + "px", oe.calendarContainer.style.right = "auto"))
   }
  }
 }

 function _() {
  oe.config.noCalendar || oe.isMobile || (v(), G(), m())
 }

 function P(e) {
  if (e.preventDefault(), oe.config.allowInput && 13 === e.which && e.target === (oe.altInput || oe.input)) return oe.setDate((oe.altInput || oe.input).value), e.target.blur();
  if (e.target.classList.contains("flatpickr-day") && !e.target.classList.contains("disabled") && !e.target.classList.contains("notAllowed")) {
   var t = oe.latestSelectedDateObj = new Date(e.target.dateObj.getTime());
   if (oe.selectedDateElem = e.target, "single" === oe.config.mode) oe.selectedDates = [t];
   else if ("multiple" === oe.config.mode) {
    var n = $(t);
    n ? oe.selectedDates.splice(n, 1) : oe.selectedDates.push(t)
   } else "range" === oe.config.mode && (2 === oe.selectedDates.length && oe.clear(), oe.selectedDates.push(t), oe.selectedDates.sort(function (e, t) {
    return e.getTime() - t.getTime()
   }));
   i(), t.getMonth() !== oe.currentMonth && "range" !== oe.config.mode && (oe.currentYear = t.getFullYear(), oe.currentMonth = t.getMonth(), G()), m(), oe.minDateHasTime && oe.config.enableTime && 0 === ie(t, oe.config.minDate) && r(oe.config.minDate), X(), setTimeout(function () {
    return oe.dateIsPicked = !0
   }, 50), "range" === oe.config.mode && (1 === oe.selectedDates.length ? (Y(e), oe.maxRangeDate < oe.days.childNodes[41].dateObj && (oe.nextMonthNav.style.display = "none"), oe.minRangeDate > oe.days.childNodes[0].dateObj && (oe.prevMonthNav.style.display = "none")) : (oe.nextMonthNav.style.display = "block", oe.prevMonthNav.style.display = "block", G())), "single" !== oe.config.mode || oe.config.enableTime || oe.close(), q("Change")
  }
 }

 function A(e, t) {
  oe.config[e] = t, oe.redraw(), d()
 }

 function R(e) {
  if (Array.isArray(e)) oe.selectedDates = e.map(oe.parseDate);
  else if (e instanceof Date || !isNaN(e)) oe.selectedDates = [oe.parseDate(e)];
  else if (e && e.substring) switch (oe.config.mode) {
   case "single":
    oe.selectedDates = [oe.parseDate(e)];
    break;
   case "multiple":
    oe.selectedDates = e.split("; ").map(oe.parseDate);
    break;
   case "range":
    oe.selectedDates = e.split(oe.l10n.rangeSeparator).map(oe.parseDate)
  }
  oe.selectedDates = oe.selectedDates.filter(function (e) {
   return e instanceof Date && e.getTime() && I(e, !1)
  }), oe.selectedDates.sort(function (e, t) {
   return e.getTime() - t.getTime()
  })
 }

 function W(e, t) {
  return e ? (R(e), oe.selectedDates.length > 0 ? (oe.dateIsPicked = !0, oe.latestSelectedDateObj = oe.selectedDates[0]) : oe.latestSelectedDateObj = null, oe.redraw(), d(), r(), X(), void(t === !0 && q("Change"))) : oe.clear()
 }

 function U() {
  function e(e) {
   for (var t = e.length; t--;) "string" == typeof e[t] || +e[t] ? e[t] = oe.parseDate(e[t], !0) : e[t] && e[t].from && e[t].to && (e[t].from = oe.parseDate(e[t].from), e[t].to = oe.parseDate(e[t].to));
   return e.filter(function (e) {
    return e
   })
  }
  oe.selectedDates = [], oe.now = new Date, R(oe.config.defaultDate || oe.input.value), oe.config.disable.length && (oe.config.disable = e(oe.config.disable)), oe.config.enable.length && (oe.config.enable = e(oe.config.enable));
  var t = oe.selectedDates.length ? oe.selectedDates[0] : oe.config.minDate && oe.config.minDate.getTime() > oe.now ? oe.config.minDate : oe.config.maxDate && oe.config.maxDate.getTime() < oe.now ? oe.config.maxDate : oe.now;
  oe.currentYear = t.getFullYear(), oe.currentMonth = t.getMonth(), oe.selectedDates.length && (oe.latestSelectedDateObj = oe.selectedDates[0]), oe.minDateHasTime = oe.config.minDate && (oe.config.minDate.getHours() || oe.config.minDate.getMinutes() || oe.config.minDate.getSeconds()), oe.maxDateHasTime = oe.config.maxDate && (oe.config.maxDate.getHours() || oe.config.maxDate.getMinutes() || oe.config.maxDate.getSeconds()), Object.defineProperty(oe, "latestSelectedDateObj", {
   get: function () {
    return oe._selectedDateObj || oe.selectedDates[oe.selectedDates.length - 1] || null
   },
   set: function (e) {
    oe._selectedDateObj = e
   }
  })
 }

 function B() {
  oe.utils = {
   duration: {
    DAY: 864e5
   },
   getDaysinMonth: function (e, t) {
    return e = "undefined" == typeof e ? oe.currentMonth : e, t = "undefined" == typeof t ? oe.currentYear : t, 1 === e && (t % 4 === 0 && t % 100 !== 0 || t % 400 === 0) ? 29 : oe.l10n.daysInMonth[e]
   },
   monthToStr: function (e, t) {
    return t = "undefined" == typeof t ? oe.config.shorthandCurrentMonth : t, oe.l10n.months[(t ? "short" : "long") + "hand"][e]
   }
  }
 }

 function J() {
  oe.formats = {
   D: function (e) {
    return oe.l10n.weekdays.shorthand[oe.formats.w(e)]
   },
   F: function (e) {
    return oe.utils.monthToStr(oe.formats.n(e) - 1, !1)
   },
   H: function (e) {
    return Flatpickr.prototype.pad(e.getHours())
   },
   J: function (e) {
    return e.getDate() + oe.l10n.ordinal(e.getDate())
   },
   K: function (e) {
    return e.getHours() > 11 ? "PM" : "AM"
   },
   M: function (e) {
    return oe.utils.monthToStr(e.getMonth(), !0)
   },
   S: function (e) {
    return Flatpickr.prototype.pad(e.getSeconds())
   },
   U: function (e) {
    return e.getTime() / 1e3
   },
   Y: function (e) {
    return e.getFullYear()
   },
   d: function (e) {
    return Flatpickr.prototype.pad(oe.formats.j(e))
   },
   h: function (e) {
    return e.getHours() % 12 ? e.getHours() % 12 : 12
   },
   i: function (e) {
    return Flatpickr.prototype.pad(e.getMinutes())
   },
   j: function (e) {
    return e.getDate()
   },
   l: function (e) {
    return oe.l10n.weekdays.longhand[oe.formats.w(e)]
   },
   m: function (e) {
    return Flatpickr.prototype.pad(oe.formats.n(e))
   },
   n: function (e) {
    return e.getMonth() + 1
   },
   s: function (e) {
    return e.getSeconds()
   },
   w: function (e) {
    return e.getDay()
   },
   y: function (e) {
    return String(oe.formats.Y(e)).substring(2)
   }
  }
 }

 function z() {
  return oe.input = oe.config.wrap ? oe.element.querySelector("[data-input]") : oe.element, oe.input ? (oe.input._type = oe.input.type, oe.input.type = "text", oe.input.classList.add("flatpickr-input"), oe.config.altInput && (oe.altInput = ee(oe.input.nodeName, oe.input.className + " " + oe.config.altInputClass), oe.altInput.placeholder = oe.input.placeholder, oe.altInput.type = "text", oe.input.type = "hidden", oe.input.parentNode && oe.input.parentNode.insertBefore(oe.altInput, oe.input.nextSibling)), void(oe.config.allowInput || (oe.altInput || oe.input).setAttribute("readonly", "readonly"))) : console.warn("Error: invalid input element specified", oe.input)
 }

 function K() {
  var e = oe.config.enableTime ? oe.config.noCalendar ? "time" : "datetime-local" : "date";
  oe.mobileInput = ee("input", oe.input.className + " flatpickr-mobile"), oe.mobileInput.step = "any", oe.mobileInput.tabIndex = 1, oe.mobileInput.type = e, oe.mobileInput.disabled = oe.input.disabled, oe.mobileFormatStr = "datetime-local" === e ? "Y-m-d\\TH:i:S" : "date" === e ? "Y-m-d" : "H:i:S", oe.selectedDates.length && (oe.mobileInput.defaultValue = oe.mobileInput.value = x(oe.mobileFormatStr, oe.selectedDates[0])), oe.config.minDate && (oe.mobileInput.min = x("Y-m-d", oe.config.minDate)), oe.config.maxDate && (oe.mobileInput.max = x("Y-m-d", oe.config.maxDate)), oe.input.type = "hidden", oe.config.altInput && (oe.altInput.type = "hidden");
  try {
   oe.input.parentNode.insertBefore(oe.mobileInput, oe.input.nextSibling)
  } catch (e) {}
  oe.mobileInput.addEventListener("change", function (e) {
   oe.latestSelectedDateObj = oe.parseDate(e.target.value), oe.setDate(oe.latestSelectedDateObj), q("Change"), q("Close")
  })
 }

 function V() {
  oe.isOpen ? oe.close() : oe.open()
 }

 function q(e, t) {
  var n = oe.config["on" + e];
  if (n)
   for (var a = 0; a < n.length; a++) n[a](oe.selectedDates, oe.input.value, oe, t);
  if ("Change" === e)
   if ("function" == typeof Event && Event.constructor) oe.input.dispatchEvent(new Event("change", {
    bubbles: !0
   })), oe.input.dispatchEvent(new Event("input", {
    bubbles: !0
   }));
   else {
    if (void 0 !== window.document.createEvent) return oe.input.dispatchEvent(oe.changeEvent);
    oe.input.fireEvent("onchange")
   }
 }

 function $(e) {
  for (var t = 0; t < oe.selectedDates.length; t++)
   if (0 === ie(oe.selectedDates[t], e)) return "" + t;
  return !1
 }

 function Q(e) {
  return !("range" !== oe.config.mode || oe.selectedDates.length < 2) && (ie(e, oe.selectedDates[0]) >= 0 && ie(e, oe.selectedDates[1]) <= 0)
 }

 function G() {
  if (!oe.config.noCalendar && !oe.isMobile && oe.monthNav) {
   if (oe.currentMonthElement.textContent = oe.utils.monthToStr(oe.currentMonth) + " ", oe.currentYearElement.value = oe.currentYear, oe.config.minDate) {
    var e = oe.currentYear === oe.config.minDate.getFullYear() ? oe.currentMonth <= oe.config.minDate.getMonth() : oe.currentYear < oe.config.minDate.getFullYear();
    oe.prevMonthNav.style.display = e ? "none" : "block"
   } else oe.prevMonthNav.style.display = "block";
   if (oe.config.maxDate) {
    var t = oe.currentYear === oe.config.maxDate.getFullYear() ? oe.currentMonth + 1 > oe.config.maxDate.getMonth() : oe.currentYear > oe.config.maxDate.getFullYear();
    oe.nextMonthNav.style.display = t ? "none" : "block"
   } else oe.nextMonthNav.style.display = "block"
  }
 }

 function X() {
  if (!oe.selectedDates.length) return oe.clear();
  oe.isMobile && (oe.mobileInput.value = oe.selectedDates.length ? x(oe.mobileFormatStr, oe.latestSelectedDateObj) : "");
  var e = "range" !== oe.config.mode ? "; " : oe.l10n.rangeSeparator;
  oe.input.value = oe.selectedDates.map(function (e) {
   return x(oe.config.dateFormat, e)
  }).join(e), oe.config.altInput && (oe.altInput.value = oe.selectedDates.map(function (e) {
   return x(oe.config.altFormat, e)
  }).join(e)), q("ValueUpdate")
 }

 function Z(e) {
  e.preventDefault();
  var t = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)),
   n = parseInt(e.target.value, 10) + t;
  T(n), e.target.value = oe.currentYear
 }

 function ee(e, t, n) {
  var a = window.document.createElement(e);
  return t = t || "", n = n || "", a.className = t, n && (a.textContent = n), a
 }

 function te(e) {
  return Array.isArray(e) ? e : [e]
 }

 function ne(e, t, n) {
  return n ? e.classList.add(t) : void e.classList.remove(t)
 }

 function ae(e, t, n) {
  var a = void 0;
  return function () {
   for (var i = arguments.length, r = Array(i), o = 0; o < i; o++) r[o] = arguments[o];
   var l = this,
    c = function () {
     a = null, n || e.apply(l, r)
    };
   clearTimeout(a), a = setTimeout(c, t), n && !a && e.apply(l, r)
  }
 }

 function ie(e, t, n) {
  return e instanceof Date && t instanceof Date && (n !== !1 ? new Date(e.getTime()).setHours(0, 0, 0, 0) - new Date(t.getTime()).setHours(0, 0, 0, 0) : e.getTime() - t.getTime())
 }

 function re(e) {
  if (e.preventDefault(), e && ((e.target.value || e.target.textContent).length >= 2 || "keydown" !== e.type && "input" !== e.type) && e.target.blur(), oe.amPM && e.target === oe.amPM) return e.target.textContent = ["AM", "PM"]["AM" === e.target.textContent | 0];
  var t = Number(e.target.min),
   n = Number(e.target.max),
   a = Number(e.target.step),
   i = parseInt(e.target.value, 10),
   r = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)),
   o = Number(i);
  "wheel" === e.type && (o = i + a * r), "input" !== e.type || 2 === e.target.value.length ? (o < t ? o = n + o + (e.target !== oe.hourElement) + (e.target === oe.hourElement && !oe.amPM) : o > n && (o = e.target === oe.hourElement ? o - n - !oe.amPM : t), oe.amPM && e.target === oe.hourElement && (1 === a ? o + i === 23 : Math.abs(o - i) > a) && (oe.amPM.textContent = "PM" === oe.amPM.textContent ? "AM" : "PM"), e.target.value = oe.pad(o)) : e.target.value = o
 }
 var oe = this;
 return n(), oe
}

function _flatpickr(e, t) {
 for (var n = Array.prototype.slice.call(e), a = [], i = 0; i < n.length; i++) try {
  n[i]._flatpickr = new Flatpickr(n[i], t || {}), a.push(n[i]._flatpickr)
 } catch (e) {
  console.warn(e, e.stack)
 }
 return 1 === a.length ? a[0] : a
}

function flatpickr(e, t) {
 return _flatpickr(window.document.querySelectorAll(e), t)
}
var _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
   var n = arguments[t];
   for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
  }
  return e
 },
 _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
  return typeof e
 } : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
 };
Flatpickr.defaultConfig = {
 mode: "single",
 utc: !1,
 wrap: !1,
 weekNumbers: !1,
 allowInput: !1,
 clickOpens: !0,
 time_24hr: !1,
 enableTime: !1,
 noCalendar: !1,
 dateFormat: "Y-m-d",
 altInput: !1,
 altInputClass: "flatpickr-input form-control input",
 altFormat: "F j, Y",
 defaultDate: null,
 minDate: null,
 maxDate: null,
 parseDate: null,
 formatDate: null,
 getWeek: function (e) {
  var t = new Date(e.getTime());
  t.setHours(0, 0, 0, 0), t.setDate(t.getDate() + 3 - (t.getDay() + 6) % 7);
  var n = new Date(t.getFullYear(), 0, 4);
  return 1 + Math.round(((t.getTime() - n.getTime()) / 864e5 - 3 + (n.getDay() + 6) % 7) / 7)
 },
 enable: [],
 disable: [],
 shorthandCurrentMonth: !1,
 inline: !1,
 static: !1,
 appendTo: null,
 prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
 nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
 enableSeconds: !1,
 hourIncrement: 1,
 minuteIncrement: 5,
 defaultHour: 12,
 defaultMinute: 0,
 disableMobile: !1,
 locale: "default",
 plugins: [],
 onChange: [],
 onOpen: [],
 onClose: [],
 onReady: [],
 onValueUpdate: [],
 onDayCreate: []
}, Flatpickr.l10ns = {
 en: {
  weekdays: {
   shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
   longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  months: {
   shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
   longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: function (e) {
   var t = e % 100;
   if (t > 3 && t < 21) return "th";
   switch (t % 10) {
    case 1:
     return "st";
    case 2:
     return "nd";
    case 3:
     return "rd";
    default:
     return "th"
   }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle"
 }
}, Flatpickr.l10ns.default = Object.create(Flatpickr.l10ns.en), Flatpickr.localize = function (e) {
 return _extends(Flatpickr.l10ns.default, e || {})
}, Flatpickr.setDefaults = function (e) {
 return _extends(Flatpickr.defaultConfig, e || {})
}, Flatpickr.prototype = {
 pad: function (e) {
  return ("0" + e).slice(-2)
 },
 parseDate: function (e, t) {
  if (!e) return null;
  var n = /(\d+)/g,
   a = /^(\d{1,2})[:\s](\d\d)?[:\s]?(\d\d)?\s?(a|p)?/i,
   i = /^(\d+)$/g,
   r = e;
  if (e.toFixed || i.test(e)) e = new Date(e);
  else if ("string" == typeof e)
   if (e = e.trim(), "today" === e) e = new Date, t = !0;
   else if (this.config && this.config.parseDate) e = this.config.parseDate(e);
  else if (a.test(e)) {
   var o = e.match(a),
    l = o[4] ? o[1] % 12 + ("p" === o[4].toLowerCase() ? 12 : 0) : o[1];
   e = new Date, e.setHours(l, o[2] || 0, o[3] || 0)
  } else if (/Z$/.test(e) || /GMT$/.test(e)) e = new Date(e);
  else if (n.test(e) && /^[0-9]/.test(e)) {
   var c = e.match(n);
   e = new Date(c[0] + "/" + (c[1] || 1) + "/" + (c[2] || 1) + " " + (c[3] || 0) + ":" + (c[4] || 0) + ":" + (c[5] || 0))
  } else e = new Date(e);
  else e instanceof Date && (e = new Date(e.getTime()));
  return e instanceof Date ? (this.config && this.config.utc && !e.fp_isUTC && (e = e.fp_toUTC()), t === !0 && e.setHours(0, 0, 0, 0), e) : (console.warn("flatpickr: invalid date " + r), console.info(this.element), null)
 }
}, "undefined" != typeof HTMLElement && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (e) {
 return _flatpickr(this, e)
}, HTMLElement.prototype.flatpickr = function (e) {
 return _flatpickr([this], e)
}), "undefined" != typeof jQuery && (jQuery.fn.flatpickr = function (e) {
 return _flatpickr(this, e)
}), Date.prototype.fp_incr = function (e) {
 return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(e, 10))
}, Date.prototype.fp_isUTC = !1, Date.prototype.fp_toUTC = function () {
 var e = new Date(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds());
 return e.fp_isUTC = !0, e
}, !window.document.documentElement.classList && Object.defineProperty && "undefined" != typeof HTMLElement && Object.defineProperty(HTMLElement.prototype, "classList", {
 get: function () {
  function e(e) {
   return function (n) {
    var a = t.className.split(/\s+/),
     i = a.indexOf(n);
    e(a, i, n), t.className = a.join(" ")
   }
  }
  var t = this,
   n = {
    add: e(function (e, t, n) {
     ~t || e.push(n)
    }),
    remove: e(function (e, t) {
     ~t && e.splice(t, 1)
    }),
    toggle: e(function (e, t, n) {
     ~t ? e.splice(t, 1) : e.push(n)
    }),
    contains: function (e) {
     return !!~t.className.split(/\s+/).indexOf(e)
    },
    item: function (e) {
     return t.className.split(/\s+/)[e] || null
    }
   };
  return Object.defineProperty(n, "length", {
   get: function () {
    return t.className.split(/\s+/).length
   }
  }), n
 }
}), "undefined" != typeof module && (module.exports = Flatpickr);
