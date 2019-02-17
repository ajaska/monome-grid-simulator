"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = monomeGrid;
exports.KeyState = void 0;

require("@babel/polyfill");

var _blessed = _interopRequireDefault(require("blessed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KeyState;
exports.KeyState = KeyState;

(function (KeyState) {
  KeyState[KeyState["Up"] = 0] = "Up";
  KeyState[KeyState["Down"] = 1] = "Down";
})(KeyState || (exports.KeyState = KeyState = {}));

var brightnessToColor = {
  0: "#000000",
  1: "#111111",
  2: "#222222",
  3: "#333333",
  4: "#444444",
  5: "#555555",
  6: "#666666",
  7: "#777777",
  8: "#888888",
  9: "#999999",
  10: "#aaaaaa",
  11: "#bbbbbb",
  12: "#cccccc",
  13: "#dddddd",
  14: "#eeeeee",
  15: "#ffffff"
};

var MonomeGridSimulator =
/*#__PURE__*/
function () {
  function MonomeGridSimulator() {
    _classCallCheck(this, MonomeGridSimulator);

    _defineProperty(this, "screen", void 0);

    _defineProperty(this, "boxes", void 0);

    _defineProperty(this, "keyHandler", void 0);

    this.screen = _blessed.default.screen({
      smartCSR: true
    });
    this.screen.title = "Monome Simulator"; // Quit on Escape, q, or Control-C.

    this.screen.key(["escape", "q", "C-c"], function (ch, key) {
      return process.exit(0);
    });
    var boxes = [];

    for (var row = 0; row < 8; row++) {
      var rowElems = [];

      for (var col = 0; col < 16; col++) {
        rowElems.push(this.addBoxAtGridPos(col, row));
      }

      boxes.push(rowElems);
    }

    this.boxes = boxes;
    this.screen.render();
  }

  _createClass(MonomeGridSimulator, [{
    key: "refresh",
    value: function refresh(led) {
      if (led.length != 8) {
        throw new Error("Invalid shape of argument to refresh");
      }

      for (var row = 0; row < 8; row++) {
        if (led[row].length != 16) {
          throw new Error("Invalid shape of argument to refresh");
        }

        for (var col = 0; col < 16; col++) {
          var _brightness = led[row][col];
          var color = brightnessToColor[_brightness];

          if (color == null) {
            throw new Error("Invalid brightness: ".concat(_brightness));
          }

          this.boxes[row][col].style.bg = color;
        }
      }

      this.screen.render();
    }
  }, {
    key: "key",
    value: function key(keyHandler) {
      this.keyHandler = keyHandler;
    }
  }, {
    key: "handleBoxMouseEvent",
    value: function handleBoxMouseEvent(i, j, s) {
      if (this.keyHandler) this.keyHandler(i, j, s);
    }
  }, {
    key: "addBoxAtGridPos",
    value: function addBoxAtGridPos(col, row) {
      var _this = this;

      var box = _blessed.default.box({
        width: 5,
        height: 4,
        left: 7 * col,
        bottom: 5 * row,
        border: {
          type: "line"
        },
        style: {
          bg: brightnessToColor[0],
          border: {
            fg: "white"
          }
        }
      });

      box.on("mousedown", function () {
        _this.handleBoxMouseEvent(col, row, KeyState.Down);
      });
      box.on("mouseup", function () {
        _this.handleBoxMouseEvent(col, row, KeyState.Up);
      });
      this.screen.append(box);
      return box;
    }
  }]);

  return MonomeGridSimulator;
}();

function monomeGrid() {
  return _monomeGrid.apply(this, arguments);
}

function _monomeGrid() {
  _monomeGrid = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new MonomeGridSimulator());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _monomeGrid.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXlTdGF0ZSIsImJyaWdodG5lc3NUb0NvbG9yIiwiTW9ub21lR3JpZFNpbXVsYXRvciIsInNjcmVlbiIsImJsZXNzZWQiLCJzbWFydENTUiIsInRpdGxlIiwia2V5IiwiY2giLCJwcm9jZXNzIiwiZXhpdCIsImJveGVzIiwicm93Iiwicm93RWxlbXMiLCJjb2wiLCJwdXNoIiwiYWRkQm94QXRHcmlkUG9zIiwicmVuZGVyIiwibGVkIiwibGVuZ3RoIiwiRXJyb3IiLCJicmlnaHRuZXNzIiwiY29sb3IiLCJzdHlsZSIsImJnIiwia2V5SGFuZGxlciIsImkiLCJqIiwicyIsImJveCIsIndpZHRoIiwiaGVpZ2h0IiwibGVmdCIsImJvdHRvbSIsImJvcmRlciIsInR5cGUiLCJmZyIsIm9uIiwiaGFuZGxlQm94TW91c2VFdmVudCIsIkRvd24iLCJVcCIsImFwcGVuZCIsIm1vbm9tZUdyaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFWUEsUTs7O1dBQUFBLFE7QUFBQUEsRUFBQUEsUSxDQUFBQSxRO0FBQUFBLEVBQUFBLFEsQ0FBQUEsUTtHQUFBQSxRLHdCQUFBQSxROztBQVlaLElBQU1DLGlCQUErRCxHQUFHO0FBQ3RFLEtBQUcsU0FEbUU7QUFFdEUsS0FBRyxTQUZtRTtBQUd0RSxLQUFHLFNBSG1FO0FBSXRFLEtBQUcsU0FKbUU7QUFLdEUsS0FBRyxTQUxtRTtBQU10RSxLQUFHLFNBTm1FO0FBT3RFLEtBQUcsU0FQbUU7QUFRdEUsS0FBRyxTQVJtRTtBQVN0RSxLQUFHLFNBVG1FO0FBVXRFLEtBQUcsU0FWbUU7QUFXdEUsTUFBSSxTQVhrRTtBQVl0RSxNQUFJLFNBWmtFO0FBYXRFLE1BQUksU0Fia0U7QUFjdEUsTUFBSSxTQWRrRTtBQWV0RSxNQUFJLFNBZmtFO0FBZ0J0RSxNQUFJO0FBaEJrRSxDQUF4RTs7SUFtQk1DLG1COzs7QUFLSixpQ0FBYztBQUFBOztB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QUFEQSxTQUxZO0FBUXBCWixRQUFBQSxLQUFLLEVBQUU7QUFDTEMsVUFBQUEsRUFBRSxFQUFFdkIsaUJBQWlCLENBQUMsQ0FBRCxDQURoQjtBQUVMaUMsVUFBQUEsTUFBTSxFQUFFO0FBQ05FLFlBQUFBLEVBQUUsRUFBRTtBQURFO0FBRkg7QUFSYSxPQUFaLENBQVY7O0FBZ0JBUCxNQUFBQSxHQUFHLENBQUNRLEVBQUosQ0FBTyxXQUFQLEVBQW9CLFlBQU07QUFDeEIsUUFBQSxLQUFJLENBQUNDLG1CQUFMLENBQXlCeEIsR0FBekIsRUFBOEJGLEdBQTlCLEVBQW1DWixRQUFRLENBQUN1QyxJQUE1QztBQUNELE9BRkQ7QUFJQVYsTUFBQUEsR0FBRyxDQUFDUSxFQUFKLENBQU8sU0FBUCxFQUFrQixZQUFNO0FBQ3RCLFFBQUEsS0FBSSxDQUFDQyxtQkFBTCxDQUF5QnhCLEdBQXpCLEVBQThCRixHQUE5QixFQUFtQ1osUUFBUSxDQUFDd0MsRUFBNUM7QUFDRCxPQUZEO0FBSUEsV0FBS3JDLE1BQUwsQ0FBWXNDLE1BQVosQ0FBbUJaLEdBQW5CO0FBQ0EsYUFBT0EsR0FBUDtBQUNEOzs7Ozs7U0FHMkJhLFU7Ozs7Ozs7MEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUNOLElBQUl4QyxtQkFBSixFQURNOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJAYmFiZWwvcG9seWZpbGxcIjtcblxuaW1wb3J0IGJsZXNzZWQgZnJvbSBcImJsZXNzZWRcIjtcblxuZXhwb3J0IGVudW0gS2V5U3RhdGUge1xuICBVcCA9IDAsXG4gIERvd24gPSAxXG59XG5cbnR5cGUgS2V5SGFuZGxlciA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgczogS2V5U3RhdGUpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9ub21lR3JpZCB7XG4gIHJlZnJlc2gobGVkczogbnVtYmVyW11bXSk6IHZvaWQ7XG4gIGtleShrZXlIYW5kbGVyOiBLZXlIYW5kbGVyKTogdm9pZDtcbn1cblxuY29uc3QgYnJpZ2h0bmVzc1RvQ29sb3I6IHsgW2JyaWdodG5lc3M6IG51bWJlcl06IHN0cmluZyB8IHVuZGVmaW5lZCB9ID0ge1xuICAwOiBcIiMwMDAwMDBcIixcbiAgMTogXCIjMTExMTExXCIsXG4gIDI6IFwiIzIyMjIyMlwiLFxuICAzOiBcIiMzMzMzMzNcIixcbiAgNDogXCIjNDQ0NDQ0XCIsXG4gIDU6IFwiIzU1NTU1NVwiLFxuICA2OiBcIiM2NjY2NjZcIixcbiAgNzogXCIjNzc3Nzc3XCIsXG4gIDg6IFwiIzg4ODg4OFwiLFxuICA5OiBcIiM5OTk5OTlcIixcbiAgMTA6IFwiI2FhYWFhYVwiLFxuICAxMTogXCIjYmJiYmJiXCIsXG4gIDEyOiBcIiNjY2NjY2NcIixcbiAgMTM6IFwiI2RkZGRkZFwiLFxuICAxNDogXCIjZWVlZWVlXCIsXG4gIDE1OiBcIiNmZmZmZmZcIlxufTtcblxuY2xhc3MgTW9ub21lR3JpZFNpbXVsYXRvciBpbXBsZW1lbnRzIE1vbm9tZUdyaWQge1xuICBzY3JlZW46IGJsZXNzZWQuV2lkZ2V0cy5TY3JlZW47XG4gIGJveGVzOiBibGVzc2VkLldpZGdldHMuQm94RWxlbWVudFtdW107XG4gIGtleUhhbmRsZXI/OiBLZXlIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NyZWVuID0gYmxlc3NlZC5zY3JlZW4oeyBzbWFydENTUjogdHJ1ZSB9KTtcbiAgICB0aGlzLnNjcmVlbi50aXRsZSA9IFwiTW9ub21lIFNpbXVsYXRvclwiO1xuXG4gICAgLy8gUXVpdCBvbiBFc2NhcGUsIHEsIG9yIENvbnRyb2wtQy5cbiAgICB0aGlzLnNjcmVlbi5rZXkoW1wiZXNjYXBlXCIsIFwicVwiLCBcIkMtY1wiXSwgZnVuY3Rpb24oY2gsIGtleSkge1xuICAgICAgcmV0dXJuIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGJveGVzID0gW107XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgODsgcm93KyspIHtcbiAgICAgIGNvbnN0IHJvd0VsZW1zOiBibGVzc2VkLldpZGdldHMuQm94RWxlbWVudFtdID0gW107XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxNjsgY29sKyspIHtcbiAgICAgICAgcm93RWxlbXMucHVzaCh0aGlzLmFkZEJveEF0R3JpZFBvcyhjb2wsIHJvdykpO1xuICAgICAgfVxuICAgICAgYm94ZXMucHVzaChyb3dFbGVtcyk7XG4gICAgfVxuICAgIHRoaXMuYm94ZXMgPSBib3hlcztcblxuICAgIHRoaXMuc2NyZWVuLnJlbmRlcigpO1xuICB9XG5cbiAgcmVmcmVzaChsZWQ6IG51bWJlcltdW10pIHtcbiAgICBpZiAobGVkLmxlbmd0aCAhPSA4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNoYXBlIG9mIGFyZ3VtZW50IHRvIHJlZnJlc2hcIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgODsgcm93KyspIHtcbiAgICAgIGlmIChsZWRbcm93XS5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaGFwZSBvZiBhcmd1bWVudCB0byByZWZyZXNoXCIpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxNjsgY29sKyspIHtcbiAgICAgICAgbGV0IGJyaWdodG5lc3MgPSBsZWRbcm93XVtjb2xdO1xuICAgICAgICBsZXQgY29sb3IgPSBicmlnaHRuZXNzVG9Db2xvclticmlnaHRuZXNzXTtcbiAgICAgICAgaWYgKGNvbG9yID09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYnJpZ2h0bmVzczogJHticmlnaHRuZXNzfWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm94ZXNbcm93XVtjb2xdLnN0eWxlLmJnID0gY29sb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zY3JlZW4ucmVuZGVyKCk7XG4gIH1cblxuICBrZXkoa2V5SGFuZGxlcjogS2V5SGFuZGxlcikge1xuICAgIHRoaXMua2V5SGFuZGxlciA9IGtleUhhbmRsZXI7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUJveE1vdXNlRXZlbnQoaTogbnVtYmVyLCBqOiBudW1iZXIsIHM6IEtleVN0YXRlKSB7XG4gICAgaWYgKHRoaXMua2V5SGFuZGxlcikgdGhpcy5rZXlIYW5kbGVyKGksIGosIHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRCb3hBdEdyaWRQb3MoY29sOiBudW1iZXIsIHJvdzogbnVtYmVyKSB7XG4gICAgbGV0IGJveCA9IGJsZXNzZWQuYm94KHtcbiAgICAgIHdpZHRoOiA1LFxuICAgICAgaGVpZ2h0OiA0LFxuICAgICAgbGVmdDogNyAqIGNvbCxcbiAgICAgIGJvdHRvbTogNSAqIHJvdyxcbiAgICAgIGJvcmRlcjoge1xuICAgICAgICB0eXBlOiBcImxpbmVcIlxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGJnOiBicmlnaHRuZXNzVG9Db2xvclswXSxcbiAgICAgICAgYm9yZGVyOiB7XG4gICAgICAgICAgZmc6IFwid2hpdGVcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBib3gub24oXCJtb3VzZWRvd25cIiwgKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVCb3hNb3VzZUV2ZW50KGNvbCwgcm93LCBLZXlTdGF0ZS5Eb3duKTtcbiAgICB9KTtcblxuICAgIGJveC5vbihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVCb3hNb3VzZUV2ZW50KGNvbCwgcm93LCBLZXlTdGF0ZS5VcCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNjcmVlbi5hcHBlbmQoYm94KTtcbiAgICByZXR1cm4gYm94O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIG1vbm9tZUdyaWQoKSB7XG4gIHJldHVybiBuZXcgTW9ub21lR3JpZFNpbXVsYXRvcigpO1xufVxuIl19