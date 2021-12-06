/*!
 * Remark (http://getbootstrapadmin.com/remark)
 * Copyright 2017 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */

!(function (global, factory) {
  if ("function" == typeof define && define.amd)
    define("/App/Calendar", ["exports", "Site", "Config"], factory);
  else if ("undefined" != typeof exports)
    factory(exports, require("Site"), require("Config"));
  else {
    var mod = { exports: {} };
    factory(mod.exports, global.Site, global.Config),
      (global.AppCalendar = mod.exports);
  }
})(this, function (exports, _Site2, _Config) {
  "use strict";
  function getInstance() {
    return instance || (instance = new AppCalendar()), instance;
  }
  Object.defineProperty(exports, "__esModule", { value: !0 }),
    (exports.getInstance = exports.run = exports.AppCalendar = void 0);
  var _Site3 = babelHelpers.interopRequireDefault(_Site2),
    Config = babelHelpers.interopRequireWildcard(_Config),
    AppCalendar = (function (_Site) {
      function AppCalendar() {
        return (
          babelHelpers.classCallCheck(this, AppCalendar),
          babelHelpers.possibleConstructorReturn(
            this,
            (AppCalendar.__proto__ || Object.getPrototypeOf(AppCalendar)).apply(
              this,
              arguments
            )
          )
        );
      }
      return (
        babelHelpers.inherits(AppCalendar, _Site),
        babelHelpers.createClass(AppCalendar, [
          {
            key: "initialize",
            value: function () {
              babelHelpers
                .get(
                  AppCalendar.prototype.__proto__ ||
                    Object.getPrototypeOf(AppCalendar.prototype),
                  "initialize",
                  this
                )
                .call(this),
                (this.$actionToggleBtn = $(".site-action-toggle")),
                (this.$addNewCalendarForm = $("#addNewCalendar").modal({
                  show: !1,
                }));
            },
          },
          {
            key: "process",
            value: function () {
              babelHelpers
                .get(
                  AppCalendar.prototype.__proto__ ||
                    Object.getPrototypeOf(AppCalendar.prototype),
                  "process",
                  this
                )
                .call(this),
                this.handleFullcalendar(),
                this.handleSelective(),
                this.handleAction(),
                this.handleListItem(),
                this.handleEventList();
            },
          },
          {
            key: "handleFullcalendar",
            value: function () {
              var myOptions = {
                  header: {
                    left: null,
                    center: "prev,title,next",
                    right: "month,agendaWeek,agendaDay",
                  },
                  defaultDate: "2021-12-01",
                  selectable: !0,
                  selectHelper: !0,
                  select: function () {
                    $("#addNewEvent").modal("show");
                  },
                  editable: !0,
                  eventLimit: !0,
                  windowResize: function (view) {
                    var width = $(window).outerWidth(),
                      options = Object.assign({}, myOptions);
                    (options.events = view.calendar.clientEvents()),
                      (options.aspectRatio = width < 667 ? 0.5 : 1.35),
                      $("#calendar").fullCalendar("destroy"),
                      $("#calendar").fullCalendar(options);
                  },
                  eventClick: function (event) {
                    var color = event.backgroundColor
                      ? event.backgroundColor
                      : Config.colors("blue", 600);
                    $("#editEname").val(event.title),
                      event.start
                        ? $("#editStarts").datepicker("update", event.start._d)
                        : $("#editStarts").datepicker("update", ""),
                      event.end
                        ? $("#editEnds").datepicker("update", event.end._d)
                        : $("#editEnds").datepicker("update", ""),
                      $("#editColor [type=radio]").each(function () {
                        var $this = $(this),
                          _value = $this.data("color").split("|");
                        Config.colors(_value[0], _value[1]) === color
                          ? $this.prop("checked", !0)
                          : $this.prop("checked", !1);
                      }),
                      $("#editNewEvent")
                        .modal("show")
                        .one("hidden.bs.modal", function (e) {
                          event.title = $("#editEname").val();
                          var color = $("#editColor [type=radio]:checked")
                            .data("color")
                            .split("|");
                          (color = Config.colors(color[0], color[1])),
                            (event.backgroundColor = color),
                            (event.borderColor = color),
                            (event.start = new Date(
                              $("#editStarts").data("datepicker").getDate()
                            )),
                            (event.end = new Date(
                              $("#editEnds").data("datepicker").getDate()
                            )),
                            $("#calendar").fullCalendar("updateEvent", event);
                        });
                  },
                  eventDragStart: function () {
                    $(".site-action").data("actionBtn").show();
                  },
                  eventDragStop: function () {
                    $(".site-action").data("actionBtn").hide();
                  },
                  events: [
                    { title: "All Day Event", start: "2021-12-01" },
                    {
                      title: "Long Event",
                      start: "2021-12-1",
                      end: "2021-12-1",
                      backgroundColor: Config.colors("cyan", 600),
                      borderColor: Config.colors("cyan", 600),
                    },
                    {
                      id: 999,
                      title: "Repeating Event",
                      start: "2021-12-1T16:00:00",
                      backgroundColor: Config.colors("red", 600),
                      borderColor: Config.colors("red", 600),
                    },
                    {
                      title: "Conference",
                      start: "2021-12-1",
                      end: "2021-12-2",
                    },
                    {
                      title: "Meeting",
                      start: "2021-12-1T10:30:00",
                      end: "2021-12-1T12:30:00",
                    },
                    { title: "CRDT Presentation", start: "2021-12-1T9:00:00" },
                    { title: "", start: "2021-12-1T14:30:00" },
                    { title: "Happy Hour", start: "2021-12-1T17:30:00" },
                    { title: "Dinner", start: "2021-12-1T20:00:00" },
                    { title: "Birthday Party", start: "2021-10-13T07:00:00" },
                  ],
                  droppable: !0,
                },
                _options = void 0,
                myOptionsMobile = Object.assign({}, myOptions);
              (myOptionsMobile.aspectRatio = 0.5),
                (_options =
                  $(window).outerWidth() < 667 ? myOptionsMobile : myOptions),
                $("#editNewEvent").modal(),
                $("#calendar").fullCalendar(_options);
            },
          },
          {
            key: "handleSelective",
            value: function () {
              var member = [
                  {
                    id: "uid_1",
                    name: "Herman Beck",
                    avatar: "../../../global/portraits/1.jpg",
                  },
                  {
                    id: "uid_2",
                    name: "Mary Adams",
                    avatar: "../../../global/portraits/2.jpg",
                  },
                  {
                    id: "uid_3",
                    name: "Caleb Richards",
                    avatar: "../../../global/portraits/3.jpg",
                  },
                  {
                    id: "uid_4",
                    name: "June Lane",
                    avatar: "../../../global/portraits/4.jpg",
                  },
                ],
                items = [
                  {
                    id: "uid_1",
                    name: "Herman Beck",
                    avatar: "../../../global/portraits/1.jpg",
                  },
                  {
                    id: "uid_2",
                    name: "Caleb Richards",
                    avatar: "../../../global/portraits/2.jpg",
                  },
                ];
              $(".plugin-selective").selective({
                namespace: "addMember",
                local: member,
                selected: items,
                buildFromHtml: !1,
                tpl: {
                  optionValue: function (data) {
                    return data.id;
                  },
                  frame: function () {
                    return (
                      '<div class="' +
                      this.namespace +
                      '">\n          ' +
                      this.options.tpl.items.call(this) +
                      '\n          <div class="' +
                      this.namespace +
                      '-trigger">\n          ' +
                      this.options.tpl.triggerButton.call(this) +
                      '\n          <div class="' +
                      this.namespace +
                      '-trigger-dropdown">\n          ' +
                      this.options.tpl.list.call(this) +
                      "\n          </div>\n          </div>\n          </div>"
                    );
                  },
                  triggerButton: function () {
                    return (
                      '<div class="' +
                      this.namespace +
                      '-trigger-button"><i class="wb-plus"></i></div>'
                    );
                  },
                  listItem: function (data) {
                    return (
                      '<li class="' +
                      this.namespace +
                      '-list-item"><img class="avatar" src="' +
                      data.avatar +
                      '">' +
                      data.name +
                      "</li>"
                    );
                  },
                  item: function (data) {
                    return (
                      '<li class="' +
                      this.namespace +
                      '-item"><img class="avatar" src="' +
                      data.avatar +
                      '" title="' +
                      data.name +
                      '">' +
                      this.options.tpl.itemRemove.call(this) +
                      "</li>"
                    );
                  },
                  itemRemove: function () {
                    return (
                      '<span class="' +
                      this.namespace +
                      '-remove"><i class="wb-minus-circle"></i></span>'
                    );
                  },
                  option: function (data) {
                    return (
                      '<option value="' +
                      this.options.tpl.optionValue.call(this, data) +
                      '">' +
                      data.name +
                      "</option>"
                    );
                  },
                },
              });
            },
          },
          {
            key: "handleAction",
            value: function () {
              var _this2 = this;
              this.$actionToggleBtn.on("click", function (e) {
                _this2.$addNewCalendarForm.modal("show"), e.stopPropagation();
              });
            },
          },
          {
            key: "handleEventList",
            value: function () {
              $("#addNewEventBtn").on("click", function () {
                $("#addNewEvent").modal("show");
              }),
                $(".calendar-list .calendar-event").each(function () {
                  var $this = $(this),
                    color = $this.data("color").split("-");
                  $this.data("event", {
                    title: $this.data("title"),
                    stick: $this.data("stick"),
                    backgroundColor: Config.colors(color[0], color[1]),
                    borderColor: Config.colors(color[0], color[1]),
                  }),
                    $this.draggable({
                      zIndex: 999,
                      revert: !0,
                      revertDuration: 0,
                      appendTo: ".page",
                      helper: function () {
                        return (
                          '<a class="fc-day-grid-event fc-event fc-start fc-end" style="background-color:' +
                          Config.colors(color[0], color[1]) +
                          ";border-color:" +
                          Config.colors(color[0], color[1]) +
                          '">\n          <div class="fc-content">\n            <span class="fc-title">' +
                          $this.data("title") +
                          "</span>\n          </div>\n          </a>"
                        );
                      },
                    });
                });
            },
          },
          {
            key: "handleListItem",
            value: function () {
              this.$actionToggleBtn.on("click", function (e) {
                $("#addNewCalendar").modal("show"), e.stopPropagation();
              }),
                $(document).on("click", "[data-tag=list-delete]", function (e) {
                  bootbox.dialog({
                    message: "Do you want to delete the calendar?",
                    buttons: {
                      success: {
                        label: "Delete",
                        className: "btn-danger",
                        callback: function () {},
                      },
                    },
                  });
                });
            },
          },
        ]),
        AppCalendar
      );
    })(_Site3.default),
    instance = null;
  (exports.default = AppCalendar),
    (exports.AppCalendar = AppCalendar),
    (exports.run = function () {
      getInstance().run();
    }),
    (exports.getInstance = getInstance);
});
